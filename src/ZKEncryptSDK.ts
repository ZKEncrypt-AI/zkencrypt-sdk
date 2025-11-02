import { Connection, PublicKey, Commitment } from '@solana/web3.js';
import { WalletAdapter } from '@solana/wallet-adapter-base';
import { FHEClient } from './fhe/FHEClient';
import { PaymentClient } from './payment/PaymentClient';
import { OracleClient } from './oracle/OracleClient';
import { SwapClient } from './swap/SwapClient';
import { ZKEncryptConfig, EncryptOptions, DecryptOptions, PaymentOptions, OracleQueryOptions, SwapOptions, NetworkStats, UserStats } from './types';

export class ZKEncryptSDK {
  private connection: Connection;
  private config: ZKEncryptConfig;
  private wallet?: WalletAdapter;
  
  public readonly fhe: FHEClient;
  public readonly payment: PaymentClient;
  public readonly oracle: OracleClient;
  public readonly swap: SwapClient;

  private eventHandlers: Map<string, Function[]> = new Map();

  constructor(config: ZKEncryptConfig) {
    this.config = {
      network: config.network || 'mainnet-beta',
      rpcUrl: config.rpcUrl || 'https://api.mainnet-beta.solana.com',
      fheEndpoint: config.fheEndpoint || 'https://fhe.zk-labs.network',
      oracleEndpoint: config.oracleEndpoint || 'https://oracle.zk-labs.network',
      commitment: config.commitment || 'confirmed',
    };

    this.connection = new Connection(
      this.config.rpcUrl,
      this.config.commitment as Commitment
    );

    this.fhe = new FHEClient(this.config.fheEndpoint);
    this.payment = new PaymentClient(this.connection, this.config);
    this.oracle = new OracleClient(this.config.oracleEndpoint);
    this.swap = new SwapClient(this.connection, this.config);
  }

  async connectWallet(walletName: string): Promise<WalletAdapter> {
    
    throw new Error('Not implemented - integrate wallet adapter');
  }

  async disconnectWallet(): Promise<void> {
    this.wallet = undefined;
    this.emit('walletDisconnected', null);
  }

  getAccount(): { publicKey: string } | null {
    if (!this.wallet?.publicKey) return null;
    return {
      publicKey: this.wallet.publicKey.toString(),
    };
  }

  async encrypt(options: EncryptOptions) {
    return this.fhe.encrypt(options.data, options.publicKey);
  }

  async decrypt(options: DecryptOptions) {
    return this.fhe.decrypt(options.ciphertext, options.privateKey);
  }

  async sendPayment(options: PaymentOptions) {
    if (!this.wallet) {
      throw new Error('Wallet not connected');
    }
    
    const result = await this.payment.send({
      ...options,
      wallet: this.wallet,
    });
    
    this.emit('payment', result);
    return result;
  }

  async queryOracle(options: OracleQueryOptions) {
    const result = await this.oracle.query(options);
    this.emit('oracleQuery', result);
    return result;
  }

  async privateSwap(options: SwapOptions) {
    if (!this.wallet) {
      throw new Error('Wallet not connected');
    }
    
    const result = await this.swap.execute({
      ...options,
      wallet: this.wallet,
    });
    
    this.emit('swap', result);
    return result;
  }

  async getStats(): Promise<NetworkStats> {
    
    return {
      totalPayments: 0,
      totalOracleCalls: 0,
      totalSwaps: 0,
      feesSaved: 0,
    };
  }

  async getUserStats(address: string): Promise<UserStats> {
    
    return {
      payments: 0,
      oracleCalls: 0,
      swaps: 0,
      feesSaved: 0,
    };
  }

  on(event: string, handler: Function): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  off(event: string, handler: Function): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }

  getConnection(): Connection {
    return this.connection;
  }

  getConfig(): ZKEncryptConfig {
    return this.config;
  }
}
