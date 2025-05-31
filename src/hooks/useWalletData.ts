
import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { 
  getWalletUserData, 
  getCopyTradeData, 
  getNetworkData,
  getTradeHistory,
  WalletUserData,
  CopyTradeData,
  NetworkData,
  TradeHistoryItem
} from '@/services/WalletDataService';
import { getPhantomBalance } from '@/services/PhantomWalletService';

export interface UseWalletDataReturn {
  userData: WalletUserData | null;
  copyTradeData: CopyTradeData | null;
  networkData: NetworkData | null;
  tradeHistory: TradeHistoryItem[];
  phantomBalance: number;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const useWalletData = (): UseWalletDataReturn => {
  const { walletAddress, isConnected } = useWallet();
  const [userData, setUserData] = useState<WalletUserData | null>(null);
  const [copyTradeData, setCopyTradeData] = useState<CopyTradeData | null>(null);
  const [networkData, setNetworkData] = useState<NetworkData | null>(null);
  const [tradeHistory, setTradeHistory] = useState<TradeHistoryItem[]>([]);
  const [phantomBalance, setPhantomBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    if (!walletAddress || !isConnected) {
      setUserData(null);
      setCopyTradeData(null);
      setNetworkData(null);
      setTradeHistory([]);
      setPhantomBalance(0);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('Fetching all wallet data for:', walletAddress);

      // Buscar dados em paralelo para melhor performance
      const [userDataResult, copyTradeResult, networkDataResult, tradeHistoryResult, balanceResult] = await Promise.all([
        getWalletUserData(walletAddress).catch(err => {
          console.error('Error fetching user data:', err);
          return null;
        }),
        getCopyTradeData(walletAddress).catch(err => {
          console.error('Error fetching copy trade data:', err);
          return null;
        }),
        getNetworkData(walletAddress).catch(err => {
          console.error('Error fetching network data:', err);
          return null;
        }),
        getTradeHistory(walletAddress).catch(err => {
          console.error('Error fetching trade history:', err);
          return [];
        }),
        getPhantomBalance(walletAddress).catch(err => {
          console.error('Error fetching Phantom balance:', err);
          return 0;
        })
      ]);

      console.log('Fetched data:', {
        userData: userDataResult,
        copyTradeData: copyTradeResult,
        networkData: networkDataResult,
        tradeHistory: tradeHistoryResult?.length,
        phantomBalance: balanceResult
      });

      setUserData(userDataResult);
      setCopyTradeData(copyTradeResult);
      setNetworkData(networkDataResult);
      setTradeHistory(tradeHistoryResult);
      setPhantomBalance(balanceResult);

    } catch (error) {
      console.error('Erro ao buscar dados da carteira:', error);
      setError('Erro ao carregar dados da carteira');
    } finally {
      setIsLoading(false);
    }
  }, [walletAddress, isConnected]);

  useEffect(() => {
    fetchAllData();
    
    // Set up auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(() => {
      if (walletAddress && isConnected) {
        fetchAllData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchAllData, walletAddress, isConnected]);

  const refreshData = useCallback(async () => {
    await fetchAllData();
  }, [fetchAllData]);

  return {
    userData,
    copyTradeData,
    networkData,
    tradeHistory,
    phantomBalance,
    isLoading,
    error,
    refreshData
  };
};
