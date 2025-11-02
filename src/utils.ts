import bs58 from 'bs58';

export function isValidSolanaAddress(address: string): boolean {
  try {
    const decoded = bs58.decode(address);
    return decoded.length === 32;
  } catch {
    return false;
  }
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function validateAmount(amount: number): boolean {
  return amount > 0 && amount <= 1000000;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateNonce(): string {
  const array = new Uint8Array(24);
  crypto.getRandomValues(array);
  return bs58.encode(array);
}
