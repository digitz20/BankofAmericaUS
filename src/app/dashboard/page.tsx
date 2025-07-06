'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, CreditCard, Landmark, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Account = {
  id: string;
  name: string;
  balance: number;
  type: string;
};

type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    account: string;
};

type DashboardData = {
    accounts: Account[];
    transactions: Transaction[];
};

const getAccountIcon = (type: string) => {
    switch (type) {
        case 'Checking':
            return Landmark;
        case 'Savings':
            return DollarSign;
        case 'Credit Card':
            return CreditCard;
        default:
            return Landmark;
    }
};

export default function DashboardPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchDashboardData = async () => {
        setIsDataLoading(true);
        setError(null);
        try {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            throw new Error('User ID not found. Please log in again.');
          }
          const response = await fetch(`/api/v1/getDashboard/${userId}`);

          if (response.ok) {
            const data = await response.json();
            const dashboardInfo = data.data || data; // Handle potentially nested data
            if (!dashboardInfo.accounts || !dashboardInfo.transactions) {
                throw new Error('Dashboard data from the server is in an unexpected format.');
            }
            setDashboardData(dashboardInfo);
          } else {
             let errorMessage = "Failed to fetch dashboard data.";
             try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
             } catch (e) {
                // The error response wasn't valid JSON.
                console.error("Could not parse error response:", e);
             }
            throw new Error(errorMessage);
          }
        } catch (err: any) {
          setError(err.message);
          toast({
            variant: "destructive",
            title: "Error",
            description: err.message || "Could not load dashboard information.",
          });
        } finally {
          setIsDataLoading(false);
        }
      };

      fetchDashboardData();
    }
  }, [isAuthenticated, toast, router]);

  if (isAuthLoading || (isAuthenticated && isDataLoading)) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }
  
  if (error) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Loading Dashboard</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    )
  }

  if (!dashboardData || !dashboardData.accounts || !dashboardData.transactions) {
      return (
        <div className="flex flex-grow items-center justify-center">
            <p>No dashboard data available.</p>
        </div>
      );
  }

  const { accounts, transactions } = dashboardData;
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">Welcome Back!</h1>
        <Button asChild>
          <Link href="/accounts">
            <PlusCircle className="mr-2 h-4 w-4" />
            Open Account
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {accounts.map(acc => {
            const Icon = getAccountIcon(acc.type);
            return (
                 <Card key={acc.id}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{acc.name}</CardTitle>
                        <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold font-headline">
                            {acc.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </div>
                        <p className="text-xs text-muted-foreground">Account ending in {String(acc.id).slice(-4)}</p>
                    </CardContent>
                 </Card>
            )
        })}
      </div>

      <h2 className="font-headline text-2xl font-bold mb-4">Recent Transactions</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="hidden md:table-cell">Account</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {recentTransactions.map(t => (
                    <TableRow key={t.id}>
                        <TableCell className="hidden sm:table-cell">{new Date(t.date).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}</TableCell>
                        <TableCell>
                            <div className="font-medium">{t.description}</div>
                            <div className="text-sm text-muted-foreground md:hidden">{new Date(t.date).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{t.account}</TableCell>
                        <TableCell className="text-right font-mono">
                            <span className={t.amount > 0 ? 'text-primary' : 'text-destructive'}>
                                {t.amount < 0 ? '—' : ''}${Math.abs(t.amount).toFixed(2)}
                            </span>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </CardContent>
      </Card>
    </div>
  );
}
