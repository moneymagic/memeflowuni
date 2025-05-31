
import { useState, useEffect } from 'react';
import { 
  getUserRankingStats, 
  getWalletBalance, 
  getNetworkTree, 
  getCommissionsHistory,
  checkRankingUpgrade,
  type UserRankingStats,
  type WalletBalance,
  type NetworkMember,
  type CommissionHistory,
  type RankingUpgrade
} from '@/services/SupabaseDataService';
import { useWallet } from '@/contexts/WalletContext';

export const useUserData = () => {
  const { walletAddress, isConnected } = useWallet();
  const [rankingStats, setRankingStats] = useState<UserRankingStats | null>(null);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);
  const [networkMembers, setNetworkMembers] = useState<NetworkMember[]>([]);
  const [commissionsHistory, setCommissionsHistory] = useState<CommissionHistory[]>([]);
  const [rankingUpgrade, setRankingUpgrade] = useState<RankingUpgrade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!walletAddress || !isConnected) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      setLoading(true);
      
      try {
        const [
          rankingData,
          balanceData,
          networkData,
          commissionsData,
          upgradeData
        ] = await Promise.all([
          getUserRankingStats(walletAddress),
          getWalletBalance(walletAddress),
          getNetworkTree(walletAddress),
          getCommissionsHistory(walletAddress),
          checkRankingUpgrade(walletAddress)
        ]);

        setRankingStats(rankingData);
        setWalletBalance(balanceData);
        setNetworkMembers(networkData);
        setCommissionsHistory(commissionsData);
        setRankingUpgrade(upgradeData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [walletAddress, isConnected]);

  const refreshData = async () => {
    if (!walletAddress || !isConnected) return;
    
    setLoading(true);
    try {
      const [
        rankingData,
        balanceData,
        networkData,
        commissionsData,
        upgradeData
      ] = await Promise.all([
        getUserRankingStats(walletAddress),
        getWalletBalance(walletAddress),
        getNetworkTree(walletAddress),
        getCommissionsHistory(walletAddress),
        checkRankingUpgrade(walletAddress)
      ]);

      setRankingStats(rankingData);
      setWalletBalance(balanceData);
      setNetworkMembers(networkData);
      setCommissionsHistory(commissionsData);
      setRankingUpgrade(upgradeData);
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    walletAddress,
    rankingStats,
    walletBalance,
    networkMembers,
    commissionsHistory,
    rankingUpgrade,
    loading,
    refreshData
  };
};
