
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Landmark, DollarSign, Loader2, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
};

type DashboardApiResponse = {
    fullName: string;
    balance: number;
    totalDeposit: number;
    transactionHistory: Transaction[] | null;
    deposits: Transaction[] | null;
};

// Dummy data for transactions and deposits
const dummyTransactions = {
    transactionHistory: [
      { id: 'txn_1', date: '2024-07-28', description: 'Netflix Subscription', amount: -15.99 },
      { id: 'txn_2', date: '2024-07-27', description: 'Starbucks Coffee', amount: -5.75 },
      { id: 'txn_3', date: '2024-07-26', description: 'Shell Gas Station', amount: -55.20 },
      { id: 'txn_4', date: '2024-07-24', description: 'Amazon Purchase', amount: -112.50 },
    ],
    deposits: [
      { id: 'dep_1', date: '2024-07-25', description: 'Paycheck Deposit', amount: 2200.00 },
      { id: 'dep_2', date: '2024-07-15', description: 'Mobile Check Deposit', amount: 300.00 },
    ]
};


export default function DashboardPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardApiResponse | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const loadDashboardData = async () => {
        setIsDataLoading(true);
        setError(null);
        try {
          const userId = localStorage.getItem('userId');
          if (!userId) {
            // This should ideally not happen if useAuth is working, but as a safeguard:
            router.replace('/');
            return;
          }

          const response = await fetch(`/api/v1/getDashboard/${userId}`);
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `An error occurred: ${response.statusText}`);
          }
          
          const apiData = await response.json();
          
          // The actual data might be nested under a 'data' property. Let's check for that.
          const dashboardPayload = apiData.data || apiData;

          if (!dashboardPayload || typeof dashboardPayload.fullName === 'undefined' || typeof dashboardPayload.balance === 'undefined' || typeof dashboardPayload.totalDeposit === 'undefined') {
            throw new Error("Dashboard data from the server is in an unexpected format.");
          }

          setDashboardData({
            fullName: dashboardPayload.fullName,
            balance: dashboardPayload.balance,
            totalDeposit: dashboardPayload.totalDeposit,
            // Use dummy data for transactions
            transactionHistory: dummyTransactions.transactionHistory,
            deposits: dummyTransactions.deposits,
          });

        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsDataLoading(false);
        }
      };

      loadDashboardData();
    }
  }, [isAuthenticated, router]);

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

  if (!dashboardData) {
      return (
        <div className="flex flex-grow items-center justify-center">
            <p>No dashboard data available.</p>
        </div>
      );
  }

  const allTransactions = [
      ...(dashboardData.transactionHistory || []),
      ...(dashboardData.deposits || [])
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const recentTransactions = allTransactions.slice(0, 7);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">Welcome Back, {dashboardData.fullName}!</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <Landmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-headline">
                    {dashboardData.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
                <p className="text-xs text-muted-foreground">Across all accounts</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-headline">
                    {dashboardData.totalDeposit.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </div>
                <p className="text-xs text-muted-foreground">Recent deposits summary</p>
            </CardContent>
        </Card>
      </div>

      <h2 className="font-headline text-2xl font-bold mb-4">Recent Activity</h2>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
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
                        <TableCell className="text-right font-mono">
                            <span className={t.amount > 0 ? 'text-primary' : 'text-foreground'}>
                                {t.amount < 0 ? '-' : ''}${Math.abs(t.amount).toFixed(2)}
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
