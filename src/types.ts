import { WalletAdapter } from '@solana/wallet-adapter-base';

export interface ZKEncryptConfig {
  network?: string;
  rpcUrl?: string;
  fheEndpoint?: string;
  oracleEndpoint?: string;
  commitment?: string;
}

export interface EncryptOptions {
  data: string;
  publicKey: string;
}

export interface DecryptOptions {
  ciphertext: string;
  privateKey: string;
}

export interface PaymentOptions {
  recipient: string;
  amount: number;
  encrypted?: boolean;
  walletAdapter?: WalletAdapter;
}

export interface OracleQueryOptions {
  model: string;
  prompt: string;
  encrypted?: boolean;
  maxTokens?: number;
}

export interface SwapOptions {
  fromToken: string;
  toToken: string;
  amount: number;
  receiveAddress: string;
  walletAdapter?: WalletAdapter;
}

export interface NetworkStats {
  totalPayments: number;
  totalOracleCalls: number;
  totalSwaps: number;
  feesSaved: number;
}

export interface UserStats {
  payments: number;
  oracleCalls: number;
  swaps: number;
  feesSaved: number;
}

export interface EncryptResult {
  ciphertext: string;
  nonce: string;
}

export interface DecryptResult {
  data: string;
}

export interface PaymentResult {
  signature: string;
  recipient: string;
  amount: number;
}

export interface OracleResult {
  data: string;
  encrypted: boolean;
}

export interface SwapResult {
  signature: string;
  fromToken: string;
  toToken: string;
  amount: number;
}
