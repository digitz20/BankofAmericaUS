
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, CreditCard, Landmark, DollarSign, Loader2 } from 'lucide-react';
import Link from 'next/link';

const accounts = [
  { id: '...7890', name: 'Advantage Checking', balance: 5230.50, icon: Landmark },
  { id: '...1234', name: 'Growth Savings', balance: 25100.75, icon: DollarSign },
  { id: '...5678', name: 'Cash Rewards Visa', balance: -750.20, icon: CreditCard },
];

const transactions = [
    { id: 'txn_1', date: '2024-07-25', description: 'Grocery Store', amount: -75.43, account: 'Advantage Checking' },
    { id: 'txn_2', date: '2024-07-25', description: 'Gas Station', amount: -42.10, account: 'Cash Rewards Visa' },
    { id: 'txn_3', date: '2024-07-24', description: 'Paycheck Deposit', amount: 2200.00, account: 'Advantage Checking' },
    { id: 'txn_4', date: '2024-07-23', description: 'Online Shopping', amount: -150.00, account: 'Cash Rewards Visa' },
    { id: 'txn_5', date: '2024-07-22', description: 'Transfer to Savings', amount: -500.00, account: 'Advantage Checking' },
];

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-grow items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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
            const Icon = acc.icon;
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
                        <p className="text-xs text-muted-foreground">Account ending in {acc.id}</p>
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
                {transactions.map(t => (
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
