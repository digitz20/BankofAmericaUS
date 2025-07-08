
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Landmark, DollarSign, Loader2, AlertCircle, RefreshCw, Eye, EyeOff, LogOut, ArrowUpRight, ArrowDownLeft, Trash2, ArrowLeft } from 'lucide-react';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import Image from 'next/image';
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
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { TransactionReceipt } from '@/components/transaction-receipt';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  recipientAccountNumber?: string;
  recipientName?: string;
  bankName?: string;
};

type DashboardApiResponse = {
    fullName: string;
    balance: number;
    totalDeposit: number;
    transactionHistory: Transaction[] | null;
    deposits: Transaction[] | null;
};

const staticRecipients = [
  { bankName: 'Chase Bank', accountNumber: '123456789012', accountName: 'John Doe' },
  { bankName: 'Wells Fargo Bank', accountNumber: '563936529937', accountName: 'Olivia Martha Jane' },
  { bankName: 'U.S. Bank', accountNumber: '456789012345', accountName: 'Mary Williams' },
  { bankName: 'PNC Bank', accountNumber: '567890123456', accountName: 'David Brown' },
  { bankName: 'Citibank USA', accountNumber: '637765289365', accountName: 'James Crawford' },
  { bankName: 'Capital One Bank', accountNumber: '462936589925', accountName: 'Davis Brown Goldman' },
  { bankName: 'Bank of America', accountNumber: '876543210987', accountName: 'Emily Davis' },
  { bankName: 'Bank of America', accountNumber: '735421529993', accountName: 'Alexis Wilson' },
  { bankName: 'Truist Bank', accountNumber: '765432109876', accountName: 'Robert Wilson' },
  { bankName: 'Truist Bank', accountNumber: '242783228221', accountName: 'Scarlett Arbney' },
];

const transactionFormSchema = z.object({
  amount: z.coerce.number().positive({ message: "Please enter a positive amount." }),
  bankName: z.string().min(1, { message: "Please select a bank." }),
  accountNumber: z.string().regex(/^\d{12}$/, { message: "Recipient account number must be 12 digits." }),
  recipientName: z.string().min(1, { message: "Recipient name is required." }),
});

export default function DashboardPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardApiResponse | null>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [depositsVisible, setDepositsVisible] = useState(false);
  const [isActivityDetailsVisible, setIsActivityDetailsVisible] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'Withdraw' | 'Transfer' | null>(null);
  const bankNames = [...new Set(staticRecipients.map((r) => r.bankName))];
  
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [codeInputValue, setCodeInputValue] = useState('');
  const [newTransactions, setNewTransactions] = useState<Transaction[]>([]);
  const [isTransferring, setIsTransferring] = useState(false);
  const [isHoldDialogOpen, setIsHoldDialogOpen] = useState(false);
  const [isStaticRecipient, setIsStaticRecipient] = useState(false);

  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);


  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    mode: 'onBlur',
    defaultValues: {
      amount: undefined,
      bankName: '',
      accountNumber: '',
      recipientName: '',
    },
  });

  const watchedBankName = form.watch('bankName');
  const watchedAccountNumber = form.watch('accountNumber');

  useEffect(() => {
    if (watchedBankName && watchedAccountNumber && watchedAccountNumber.length === 12) {
        const recipient = staticRecipients.find(
            (r) => r.accountNumber === watchedAccountNumber && r.bankName === watchedBankName
        );
        if (recipient) {
            form.setValue('recipientName', recipient.accountName, { shouldValidate: true });
            setIsStaticRecipient(true);
        } else {
            if (isStaticRecipient) {
                form.resetField('recipientName');
            }
            setIsStaticRecipient(false);
        }
    } else {
        if (isStaticRecipient) {
            form.resetField('recipientName');
        }
        setIsStaticRecipient(false);
    }
  }, [watchedBankName, watchedAccountNumber, form, isStaticRecipient]);

  function openTransactionDialog(type: 'Withdraw' | 'Transfer') {
    setTransactionType(type);
    setIsTransactionDialogOpen(true);
    form.reset();
  }

  async function onTransactionSubmit(values: z.infer<typeof transactionFormSchema>) {
    const isStatic = staticRecipients.some(
      (r) => r.accountNumber === values.accountNumber && r.bankName === values.bankName && r.accountName === values.recipientName
    );

    if (!isStatic) {
        setIsTransactionDialogOpen(false);
        form.reset();
        setIsHoldDialogOpen(true);
        return;
    }

    const hasExistingTransaction = newTransactions.some(
      (t) => t.recipientAccountNumber === values.accountNumber
    );

    if (hasExistingTransaction) {
      setIsTransactionDialogOpen(false);
      form.reset();
      setIsHoldDialogOpen(true);
      return;
    }

    setIsTransactionDialogOpen(false);
    setIsTransferring(true);

    setTimeout(() => {
        setIsTransferring(false);
        if (dashboardData) {
            const newTransaction: Transaction = {
                id: `txn_${new Date().getTime()}`,
                date: new Date().toISOString(),
                description: `${transactionType} to ${values.recipientName}`,
                amount: -Math.abs(values.amount),
                recipientAccountNumber: values.accountNumber,
                recipientName: values.recipientName,
                bankName: values.bankName,
            };

            const updatedTransactions = [newTransaction, ...newTransactions];
            setNewTransactions(updatedTransactions);
            
            const newBalance = dashboardData.balance - values.amount;

            const userId = localStorage.getItem('userId');
            if (userId) {
              localStorage.setItem(`newTransactions_${userId}`, JSON.stringify(updatedTransactions));
              localStorage.setItem(`balance_${userId}`, JSON.stringify(newBalance));
            }

            setDashboardData({
                ...dashboardData,
                balance: newBalance,
            });

            setLastTransaction(newTransaction);
            setIsReceiptDialogOpen(true);

            toast({
                title: `${transactionType} Successful`,
                description: `${values.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} has been sent to ${values.recipientName}.`,
            });
        }
        form.reset();
    }, 3000);
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
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
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
      
      const storedTransactionsJSON = localStorage.getItem(`newTransactions_${userId}`);
      const storedTransactions: Transaction[] = storedTransactionsJSON ? JSON.parse(storedTransactionsJSON) : [];
      setNewTransactions(storedTransactions);
      
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
      
      const storedBalanceJSON = localStorage.getItem(`balance_${userId}`);
      let currentBalance = storedBalanceJSON ? JSON.parse(storedBalanceJSON) : dashboardPayload.balance;

      if (storedBalanceJSON === null) {
          localStorage.setItem(`balance_${userId}`, JSON.stringify(dashboardPayload.balance));
      }

      const createPastDate = (days: number, hours: number, minutes: number) => {
        const date = new Date();
        date.setDate(date.getDate() - days);
        date.setHours(hours, minutes, 0, 0);
        return date.toISOString();
      };

      const dummyTransactions = {
          transactionHistory: [
            { id: 'txn_1', date: createPastDate(13, 18, 32), description: 'Netflix Subscription', amount: -15.99 },
            { id: 'txn_2', date: createPastDate(12, 9, 15), description: 'Amazon Purchase', amount: -112.50 },
            { id: 'txn_3', date: createPastDate(10, 14, 5), description: 'Shell Gas Station', amount: -55.20 },
            { id: 'txn_4', date: createPastDate(9, 8, 45), description: 'Starbucks Coffee', amount: -5.75 },
            { id: 'txn_5', date: createPastDate(7, 20, 0), description: 'Last week transaction', amount: -25.00 },
          ],
          deposits: [
            { id: 'dep_1', date: createPastDate(14, 7, 0), description: 'Mobile Check Deposit', amount: 300.00 },
            { id: 'dep_2', date: createPastDate(8, 5, 30), description: 'Paycheck Deposit', amount: 2200.00 },
          ]
      };

      setDashboardData({
        fullName: dashboardPayload.fullName,
        balance: currentBalance,
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
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData(false);
    }
  }, [isAuthenticated, loadDashboardData]);

  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId: NodeJS.Timeout;

    const logoutUser = () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        fetch('/api/v1/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userID: userId }),
        }).catch((err) => console.error("Server logout failed on inactivity:", err));
      }
      localStorage.removeItem('isLoggedIn');
      
      toast({
        title: "Session Expired",
        description: "You have been logged out due to 20 minutes of inactivity.",
      });
      window.location.href = '/';
    };

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(logoutUser, 20 * 60 * 1000); // 20 minutes
    };

    const activityEvents: (keyof WindowEventMap)[] = [
      'mousemove',
      'mousedown',
      'keypress',
      'touchstart',
      'scroll',
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isAuthenticated, toast]);
  
  const handleVerifyCode = () => {
    if (codeInputValue === '2014') {
        setIsCodeVerified(true);
        toast({ title: "Verification Successful", description: "Previous transaction history is now visible." });
    } else {
        toast({ variant: "destructive", title: "Verification Failed", description: "The code you entered is incorrect." });
    }
    setCodeInputValue('');
  };

  const handleDeleteTransaction = (transactionId: string) => {
    const transactionToDelete = newTransactions.find((t) => t.id === transactionId);
    if (!transactionToDelete || !dashboardData) {
        return;
    }

    const updatedBalance = dashboardData.balance - transactionToDelete.amount;

    const updatedTransactions = newTransactions.filter((t) => t.id !== transactionId);
    setNewTransactions(updatedTransactions);
    
    const userId = localStorage.getItem('userId');
    if (userId) {
        localStorage.setItem(`newTransactions_${userId}`, JSON.stringify(updatedTransactions));
        localStorage.setItem(`balance_${userId}`, JSON.stringify(updatedBalance));
    }

    setDashboardData({
        ...dashboardData,
        balance: updatedBalance,
    });

    toast({
        title: "Transaction Deleted",
        description: `The transaction "${transactionToDelete.description}" has been removed.`,
    });
  };

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

  const previousTransactions = [
      ...(dashboardData.transactionHistory || []),
      ...(dashboardData.deposits || [])
  ];

  const allVisibleTransactions = [
      ...newTransactions,
      ...(isCodeVerified ? previousTransactions : [])
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    try {
        return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
        return "Invalid Date";
    }
  };
  
  const formatTime = (dateString: string) => {
    try {
        return format(new Date(dateString), 'p'); // e.g., 5:30 PM
    } catch {
        return "Invalid Time";
    }
  };


  return (
    <div className="relative isolate overflow-hidden">
       <div className="absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
            <Image
                src="https://i.pinimg.com/736x/2f/9b/19/2f9b195ba9069a509b41552b763f8c8c.jpg"
                alt="Bank of America Watermark"
                width={1800}
                height={720}
                className="opacity-5 pointer-events-none"
            />
        </div>
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
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => setBalanceVisible(v => !v)}>
                          <span className="sr-only">{balanceVisible ? 'Hide' : 'Show'} balance</span>
                          {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                  </div>
                  <Landmark className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold font-headline">
                      {balanceVisible ? dashboardData.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '******'}
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
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" onClick={() => setDepositsVisible(v => !v)}>
                          <span className="sr-only">{depositsVisible ? 'Hide' : 'Show'} deposits</span>
                          {depositsVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                  </div>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold font-headline">
                       {depositsVisible ? dashboardData.totalDeposit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '******'}
                  </div>
                  <p className="text-xs text-muted-foreground">Recent deposits summary</p>
              </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-headline text-2xl font-bold">Recent Activity</h2>
          <div className="flex items-center space-x-2">
              <Switch id="activity-toggle" checked={isActivityDetailsVisible} onCheckedChange={setIsActivityDetailsVisible} />
              <Label htmlFor="activity-toggle" className="text-sm">{isActivityDetailsVisible ? 'Visible' : 'Hidden'}</Label>
          </div>
        </div>
        
        {!isCodeVerified ? (
          <Card className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg">View Transaction History</CardTitle>
                <CardDescription>Enter the code to view your full transaction history.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center gap-2">
                      <Input 
                          type="password"
                          placeholder="Enter code"
                          value={codeInputValue}
                          onChange={(e) => setCodeInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleVerifyCode()}
                      />
                      <Button onClick={handleVerifyCode}>Verify</Button>
                  </div>
              </CardContent>
          </Card>
        ) : (
          <div className="mb-4 flex justify-end">
            <Button variant="outline" onClick={() => setIsCodeVerified(false)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Hide History
            </Button>
          </div>
        )}

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                  <TableRow>
                      <TableHead className="hidden sm:table-cell">Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[50px] text-right"><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {allVisibleTransactions.length > 0 ? (
                      allVisibleTransactions.map(t => (
                          <TableRow key={t.id}>
                              <TableCell className="hidden sm:table-cell">
                                  <div className="font-medium">{isActivityDetailsVisible ? formatDate(t.date) : '******'}</div>
                                  <div className="text-sm text-muted-foreground">{isActivityDetailsVisible ? formatTime(t.date) : '******'}</div>
                              </TableCell>
                              <TableCell>
                                  <div className="font-medium">{isActivityDetailsVisible ? t.description : '******'}</div>
                                  <div className="text-sm text-muted-foreground sm:hidden">
                                      {isActivityDetailsVisible ? `${formatDate(t.date)} at ${formatTime(t.date)}` : '******'}
                                  </div>
                              </TableCell>
                              <TableCell className="text-right font-mono">
                                 {isActivityDetailsVisible ? (
                                      <span className={t.amount > 0 ? 'text-primary' : 'text-foreground'}>
                                          {t.amount < 0 ? '-' : ''}${Math.abs(t.amount).toFixed(2)}
                                      </span>
                                 ) : (
                                     '******'
                                 )}
                              </TableCell>
                              <TableCell className="text-right">
                                 {newTransactions.some(nt => nt.id === t.id) && isActivityDetailsVisible && (
                                     <Button variant="ghost" size="icon" onClick={() => handleDeleteTransaction(t.id)}>
                                         <Trash2 className="h-4 w-4 text-destructive" />
                                         <span className="sr-only">Delete Transaction</span>
                                     </Button>
                                 )}
                              </TableCell>
                          </TableRow>
                      ))
                  ) : (
                      <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                              {isCodeVerified ? "No transactions found." : "Enter code to view history."}
                          </TableCell>
                      </TableRow>
                  )}
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
                        name="bankName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Recipient Bank</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a bank" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {bankNames.map((name) => (
                                            <SelectItem key={name} value={name}>{name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                    <Input placeholder="12-digit account number" {...field} maxLength={12} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="recipientName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Recipient Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="Enter name or will auto-fill"
                                        {...field}
                                        readOnly={isStaticRecipient}
                                        className={cn(isStaticRecipient && 'bg-muted')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} value={field.value ?? ''} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>
                          {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          {transactionType}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={isTransferring} onOpenChange={setIsTransferring}>
          <DialogContent className="sm:max-w-xs flex flex-col items-center justify-center bg-transparent border-none shadow-none text-primary-foreground">
              <DialogHeader>
                <DialogTitle className="sr-only">Processing Transaction</DialogTitle>
                <DialogDescription className="sr-only">Please wait while we process your transaction.</DialogDescription>
              </DialogHeader>
              <Image
                  src="https://i.pinimg.com/736x/2f/9b/19/2f9b195ba9069a509b41552b763f8c8c.jpg"
                  alt="Bank of America Logo"
                  width={150}
                  height={60}
                  className="animate-pulse"
              />
              <p className="mt-4 text-lg">Processing...</p>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isHoldDialogOpen} onOpenChange={setIsHoldDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader className="items-center text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <DialogTitle className="text-2xl font-headline">Transaction on Hold</DialogTitle>
              <DialogDescription>
                Dear esteemed customer your account has been hold for now please perform a transaction after five days.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={() => setIsHoldDialogOpen(false)} className="w-full">
                    Close
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
            <DialogContent className="sm:max-w-lg p-0 bg-transparent border-none shadow-none">
                <DialogHeader>
                    <DialogTitle className="sr-only">Transaction Receipt</DialogTitle>
                    <DialogDescription className="sr-only">
                        Your transaction receipt is ready. You can close this dialog.
                    </DialogDescription>
                </DialogHeader>
                <div className="receipt-container-print">
                    {lastTransaction && dashboardData && (
                        <TransactionReceipt
                            transaction={lastTransaction}
                            senderName={dashboardData.fullName}
                            footer={
                                <>
                                    <Button onClick={() => setIsReceiptDialogOpen(false)} variant="secondary">
                                        Close
                                    </Button>
                                </>
                            }
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}
