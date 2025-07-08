import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  recipientAccountNumber?: string;
  recipientName?: string;
  bankName?: string;
};

interface TransactionReceiptProps {
  transaction: Transaction;
  senderName: string;
  footer?: React.ReactNode;
}

export const TransactionReceipt: React.FC<TransactionReceiptProps> = ({ transaction, senderName, footer }) => {
  if (!transaction) return null;

  return (
    <Card className="w-full max-w-md mx-auto border-primary shadow-lg receipt-dialog-content-print">
      <CardHeader className="text-center bg-primary text-primary-foreground p-4 rounded-t-lg">
        <div className="flex justify-center items-center gap-4">
            <Image
                src="https://i.pinimg.com/736x/2f/9b/19/2f9b195ba9069a509b41552b763f8c8c.jpg"
                alt="Bank of America Logo"
                width={40}
                height={40}
                className="bg-white p-1 rounded-sm"
            />
            <CardTitle className="font-headline text-2xl">Transaction Receipt</CardTitle>
        </div>
        <CardDescription className="text-primary-foreground/80">Transfer Successful</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {footer && (
            <div className="pb-4 mb-4 border-b no-print flex flex-col gap-2 sm:flex-row sm:justify-center">
                {footer}
            </div>
        )}
        <div className="space-y-4">
            <div className="text-center">
                <p className="text-sm text-muted-foreground">Amount Transferred</p>
                <p className="text-4xl font-bold font-headline text-primary">
                    {Math.abs(transaction.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
            </div>
            
            <Separator />

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <p className="font-medium text-muted-foreground">Date:</p>
                <p className="text-right">{format(new Date(transaction.date), 'MMM d, yyyy')}</p>

                <p className="font-medium text-muted-foreground">Time:</p>
                <p className="text-right">{format(new Date(transaction.date), 'p')}</p>
                
                <p className="font-medium text-muted-foreground">Transaction ID:</p>
                <p className="text-right font-mono text-xs">{transaction.id}</p>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
                <h4 className="font-semibold">From:</h4>
                <p>{senderName}</p>
            </div>
            
            <div className="space-y-2 text-sm">
                <h4 className="font-semibold">To:</h4>
                <p>{transaction.recipientName}</p>
                <p className="text-muted-foreground">{transaction.bankName}</p>
                <p className="text-muted-foreground">Acct: ...{transaction.recipientAccountNumber?.slice(-4)}</p>
            </div>
            
            <Separator />
            
            <p className="text-xs text-center text-muted-foreground pt-4">Thank you for banking with Bank of America.</p>
        </div>
      </CardContent>
    </Card>
  );
};
