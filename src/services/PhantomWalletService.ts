
/**
 * Service for Phantom Wallet integration with real-time balance updates
 */

export interface PhantomWalletData {
  balance: number;
  publicKey: string;
  isConnected: boolean;
}

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
      getAccount: () => Promise<{ publicKey: { toString: () => string } }>;
    };
  }
}

/**
 * Get real-time SOL balance from Phantom wallet
 */
export async function getPhantomBalance(walletAddress: string): Promise<number> {
  try {
    // Using Solana RPC to get real balance
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getBalance',
        params: [walletAddress]
      })
    });

    const data = await response.json();
    
    if (data.result) {
      // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
      return data.result.value / 1000000000;
    }
    
    return 0;
  } catch (error) {
    console.error('Erro ao buscar saldo da Phantom:', error);
    return 0;
  }
}

/**
 * Get comprehensive Phantom wallet data
 */
export async function getPhantomWalletData(walletAddress: string): Promise<PhantomWalletData> {
  try {
    const balance = await getPhantomBalance(walletAddress);
    
    return {
      balance,
      publicKey: walletAddress,
      isConnected: !!walletAddress
    };
  } catch (error) {
    console.error('Erro ao buscar dados da Phantom:', error);
    return {
      balance: 0,
      publicKey: '',
      isConnected: false
    };
  }
}

/**
 * Validate wallet connection and ensure it's Phantom
 */
export function validatePhantomConnection(): boolean {
  return typeof window !== 'undefined' && 
         window.solana && 
         window.solana.isPhantom === true;
}

/**
 * Get account info including token balances
 */
export async function getAccountInfo(walletAddress: string) {
  try {
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getAccountInfo',
        params: [
          walletAddress,
          { encoding: 'jsonParsed' }
        ]
      })
    });

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Erro ao buscar informações da conta:', error);
    return null;
  }
}
