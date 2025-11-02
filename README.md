# ZKEncrypt SDKd

The official JavaScript/TypeScript SDK for ZKEncrypt Network - A privacy-preserving AI infrastructure powered by Fully Homomorphic Encryption (FHE).

## 🚀 Features

- **FHE Operations**: Encrypt, decrypt, and compute on encrypted data without revealing sensitive information
- **x402 Micropayments**: Send privacy-preserving micropayments on Solana with sub-cent transaction fees
- **AI Oracle Integration**: Query encrypted AI oracles with FHE-secured data for private machine learning inference
- **Private DeFi**: Execute shielded swaps and transactions with complete privacy guarantees
- **Wallet Integration**: Seamless integration with Phantom, Solflare, and other Solana wallets
- **TypeScript Support**: Full type safety and IntelliSense support for enhanced developer experience

## 📦 Installation

```bash
npm install @zkencrypt/sdk
# or
yarn add @zkencrypt/sdk
# or
pnpm add @zkencrypt/sdk
```

## 🔧 Quick Start

### Initialize the SDK

```typescript
import { ZKEncryptSDK } from '@zkencrypt/sdk';

const sdk = new ZKEncryptSDK({
  network: 'mainnet-beta', // or 'devnet' for testing
  rpcUrl: 'https://api.mainnet-beta.solana.com',
});
```

### Encrypt Data

```typescript
// Encrypt sensitive data with FHE
const encrypted = await sdk.encrypt({
  data: 'Sensitive information',
  publicKey: userPublicKey,
});

console.log('Encrypted:', encrypted.ciphertext);
```

### Decrypt Data

```typescript
// Decrypt FHE-encrypted data
const decrypted = await sdk.decrypt({
  ciphertext: encrypted.ciphertext,
  privateKey: userPrivateKey,
});

console.log('Decrypted:', decrypted.data);
```

### Send x402 Micropayment

```typescript
// Send privacy-preserving micropayment
const payment = await sdk.sendPayment({
  recipient: 'RECIPIENT_SOLANA_ADDRESS',
  amount: 0.001, // Amount in SOL
  encrypted: true, // Enable privacy mode
  walletAdapter: phantomWallet,
});

console.log('Transaction signature:', payment.signature);
```

### Query AI Oracle

```typescript
// Query encrypted AI oracle
const result = await sdk.queryOracle({
  model: 'gpt-4',
  prompt: 'Your encrypted query',
  encrypted: true,
  maxTokens: 100,
});

console.log('Oracle response:', result.data);
```

### Private Swap

```typescript
// Execute shielded DeFi swap
const swap = await sdk.privateSwap({
  fromToken: 'SOL',
  toToken: 'USDC',
  amount: 1.0,
  receiveAddress: 'YOUR_ADDRESS',
  walletAdapter: phantomWallet,
});

console.log('Swap completed:', swap.signature);
```

## 🔑 Authentication

```typescript
// Connect wallet
const wallet = await sdk.connectWallet('phantom');

// Get connected account
const account = sdk.getAccount();
console.log('Connected:', account.publicKey);

// Disconnect
await sdk.disconnectWallet();
```

## 🌐 Network Configuration

```typescript
const sdk = new ZKEncryptSDK({
  network: 'mainnet-beta',
  rpcUrl: 'https://api.mainnet-beta.solana.com',
  fheEndpoint: 'https://fhe.zk-labs.network',
  oracleEndpoint: 'https://oracle.zk-labs.network',
  commitment: 'confirmed',
});
```

## 📊 Stats & Analytics

```typescript
// Get network stats
const stats = await sdk.getStats();
console.log('Total payments:', stats.totalPayments);
console.log('Total oracle calls:', stats.totalOracleCalls);
console.log('Fees saved:', stats.feesSaved);

// Get user stats
const userStats = await sdk.getUserStats(userAddress);
console.log('Your payments:', userStats.payments);
```

## 🔐 Security Best Practices

1. **Never expose private keys**: Use environment variables or secure key management
2. **Validate addresses**: Always validate Solana addresses before transactions
3. **Use encrypted mode**: Enable encryption for sensitive operations
4. **Monitor transactions**: Check transaction signatures on Solana Explorer
5. **Test on devnet first**: Use devnet for development and testing

## 🛠️ Advanced Usage

### Custom FHE Operations

```typescript
// Perform homomorphic addition
const result = await sdk.fhe.add(
  encryptedValue1,
  encryptedValue2,
  publicKey
);

// Perform homomorphic multiplication
const product = await sdk.fhe.multiply(
  encryptedValue1,
  encryptedValue2,
  publicKey
);
```

### Batch Operations

```typescript
// Send multiple payments in one transaction
const batch = await sdk.batchPayments([
  { recipient: 'ADDRESS1', amount: 0.001 },
  { recipient: 'ADDRESS2', amount: 0.002 },
  { recipient: 'ADDRESS3', amount: 0.003 },
]);
```

### Event Listeners

```typescript
// Listen to payment events
sdk.on('payment', (event) => {
  console.log('Payment sent:', event);
});

// Listen to oracle events
sdk.on('oracleQuery', (event) => {
  console.log('Oracle queried:', event);
});

// Listen to wallet events
sdk.on('walletConnected', (wallet) => {
  console.log('Wallet connected:', wallet.publicKey);
});
```

## 📚 API Reference

See [API Documentation](https://zkencrypt-ai.gitbook.io/zkencrypt-ai/quickstart/developer-sdk-js-ts) for complete API reference.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- [Website](https://zk-labs.network)
- [Documentation](https://zkencrypt-ai.gitbook.io/zkencrypt-ai)
- [Twitter](https://x.com/ZKEncrypt_AI)
- [GitHub](https://github.com/ZKEncrypt-AI)

## 💬 Support

- Email: support@zk-labs.network
- GitHub Issues: [Report bugs](https://github.com/ZKEncrypt-AI/zkencrypt-sdk/issues)

---

Built with ❤️ by the ZKEncrypt AI team
