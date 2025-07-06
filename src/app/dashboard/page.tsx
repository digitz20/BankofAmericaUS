
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Landmark, DollarSign, Loader2, AlertCircle, RefreshCw, Eye, EyeOff, LogOut, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format, subDays } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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

const transactionFormSchema = z.object({
  amount: z.coerce.number().positive({ message: "Please enter a positive amount." }),
  bankName: z.string().min(2, { message: "Bank name must be at least 2 characters." }),
  accountNumber: z.string().min(5, { message: "Account number seems too short." }),
});

export default function DashboardPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardApiResponse | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balancesVisible, setBalancesVisible] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'Withdraw' | 'Transfer' | null>(null);

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: undefined,
      bankName: '',
      accountNumber: '',
    },
  });

  function openTransactionDialog(type: 'Withdraw' | 'Transfer') {
    setTransactionType(type);
    setIsTransactionDialogOpen(true);
    form.reset();
  }

  function onTransactionSubmit(values: z.infer<typeof transactionFormSchema>) {
    setIsTransactionDialogOpen(false);
    toast({
        title: "Action Not Available",
        description: "sorry your account cannot perform this action now you have to wait for five working days before you can perform a transaction",
    });
  }

  const handleLogout = async () => {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            throw new Error("User ID not found. Cannot log out.");
        }

        const response = await fetch('/api/v1/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userID: userId }),
        });

        if (response.ok) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userId');
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            // Force a hard refresh to clear all client-side state
            window.location.href = '/';
        } else {
             const errorData = await response.json().catch(() => ({ message: 'Logout failed. Please try again.' }));
             throw new Error(errorData.message || 'Logout failed.');
        }
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Logout Error",
            description: error.message || "An unexpected error occurred during logout.",
        });
    }
  };

  const loadDashboardData = useCallback(async (isRefresh: boolean = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsDataLoading(true);
    }
    setError(null);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.replace('/');
        return;
      }

      const response = await fetch(`/api/v1/getDashboard/${userId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `An error occurred: ${response.statusText}`);
      }
      
      const apiData = await response.json();
      const dashboardPayload = apiData.dashboard;

      if (!dashboardPayload || typeof dashboardPayload.fullName === 'undefined' || typeof dashboardPayload.balance === 'undefined' || typeof dashboardPayload.totalDeposit === 'undefined') {
        throw new Error("Dashboard data from the server is in an unexpected format.");
      }

      const today = new Date();
      const dummyTransactions = {
          transactionHistory: [
            { id: 'txn_1', date: format(subDays(today, 15), 'yyyy-MM-dd'), description: 'Netflix Subscription', amount: -15.99 },
            { id: 'txn_2', date: format(subDays(today, 12), 'yyyy-MM-dd'), description: 'Amazon Purchase', amount: -112.50 },
            { id: 'txn_3', date: format(subDays(today, 9), 'yyyy-MM-dd'), description: 'Shell Gas Station', amount: -55.20 },
            { id: 'txn_4', date: format(subDays(today, 7), 'yyyy-MM-dd'), description: 'Starbucks Coffee', amount: -5.75 },
          ],
          deposits: [
            { id: 'dep_1', date: format(subDays(today, 21), 'yyyy-MM-dd'), description: 'Mobile Check Deposit', amount: 300.00 },
            { id: 'dep_2', date: format(subDays(today, 8), 'yyyy-MM-dd'), description: 'Paycheck Deposit', amount: 2200.00 },
          ]
      };

      setDashboardData({
        fullName: dashboardPayload.fullName,
        balance: dashboardPayload.balance,
        totalDeposit: dashboardPayload.totalDeposit,
        transactionHistory: dummyTransactions.transactionHistory,
        deposits: dummyTransactions.deposits,
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      if (isRefresh) {
        setIsRefreshing(false);
      } else {
        setIsDataLoading(false);
      }
    }
  }, [router, toast]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData(false);
    }
  }, [isAuthenticated, loadDashboardData]);

  if (isAuthLoading || isDataLoading) {
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
        <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-8">
          <Button onClick={() => openTransactionDialog('Transfer')}>
              <ArrowUpRight className="mr-2 h-4 w-4" /> Transfer
          </Button>
          <Button variant="outline" onClick={() => openTransactionDialog('Withdraw')}>
              <ArrowDownLeft className="mr-2 h-4 w-4" /> Withdraw
          </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                    <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => loadDashboardData(true)} disabled={isRefreshing}>
                        <span className="sr-only">Refresh balance</span>
                        {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => setBalancesVisible(v => !v)}>
                        <span className="sr-only">{balancesVisible ? 'Hide' : 'Show'} balance</span>
                        {balancesVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
                <Landmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-headline">
                    {balancesVisible ? dashboardData.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '******'}
                </div>
                <p className="text-xs text-muted-foreground">Across all accounts</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                    <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
                     <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => loadDashboardData(true)} disabled={isRefreshing}>
                        <span className="sr-only">Refresh deposits</span>
                        {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => setBalancesVisible(v => !v)}>
                        <span className="sr-only">{balancesVisible ? 'Hide' : 'Show'} deposits</span>
                        {balancesVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-headline">
                     {balancesVisible ? dashboardData.totalDeposit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '******'}
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
      
      <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{transactionType}</DialogTitle>
            <DialogDescription>
                Please enter the transaction details below.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onTransactionSubmit)} className="space-y-4 py-4">
                  <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Amount</FormLabel>
                              <FormControl>
                                  <Input type="number" placeholder="0.00" {...field} value={field.value ?? ''} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="bankName"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Bank Name</FormLabel>
                              <FormControl>
                                  <Input placeholder="Recipient's bank name" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Recipient Account Number</FormLabel>
                              <FormControl>
                                  <Input placeholder="Recipient's account number" {...field} />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <DialogFooter>
                      <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {transactionType}
                      </Button>
                  </DialogFooter>
              </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
