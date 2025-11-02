import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { WalletAdapter } from '@solana/wallet-adapter-base';
import { ZKEncryptConfig, PaymentResult } from '../types';
import { isValidSolanaAddress } from '../utils';

interface SendPaymentOptions {
  recipient: string;
  amount: number;
  encrypted?: boolean;
  wallet: WalletAdapter;
}

export class PaymentClient {
  private connection: Connection;
  private config: ZKEncryptConfig;

  constructor(connection: Connection, config: ZKEncryptConfig) {
    this.connection = connection;
    this.config = config;
  }

  async send(options: SendPaymentOptions): Promise<PaymentResult> {
    if (!isValidSolanaAddress(options.recipient)) {
      throw new Error('Invalid Solana address');
    }

    if (!options.wallet.publicKey) {
      throw new Error('Wallet not connected');
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: options.wallet.publicKey,
        toPubkey: new PublicKey(options.recipient),
        lamports: options.amount * LAMPORTS_PER_SOL,
      })
    );

    const { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = options.wallet.publicKey;

    const signed = await options.wallet.signTransaction(transaction);
    const signature = await this.connection.sendRawTransaction(signed.serialize());

    await this.connection.confirmTransaction(signature);

    return {
      signature,
      recipient: options.recipient,
      amount: options.amount,
    };
  }

  async batchSend(payments: Array<{ recipient: string; amount: number }>, wallet: WalletAdapter): Promise<PaymentResult[]> {
    const results: PaymentResult[] = [];
    
    for (const payment of payments) {
      const result = await this.send({
        ...payment,
        wallet,
      });
      results.push(result);
    }

    return results;
  }
}
