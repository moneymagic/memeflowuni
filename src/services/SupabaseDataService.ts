
import { supabase } from "@/integrations/supabase/client";

export interface UserRankingStats {
  current_rank: number;
  total_profit: number;
  network_size: number;
  direct_referrals: number;
}

export interface WalletBalance {
  total_profit: number;
  today_profit: number;
  commission_earnings: number;
}

export interface NetworkMember {
  wallet_address: string;
  current_ranking: number;
  total_profit: number;
  linha: number;
  join_date: string;
}

export interface CommissionHistory {
  id: string;
  from_wallet_address: string;
  amount: number;
  type: string;
  created_at: string;
}

export interface RankingUpgrade {
  can_upgrade: boolean;
  next_rank: number;
  requirements_met: boolean;
}

export const getUserRankingStats = async (walletAddress: string): Promise<UserRankingStats | null> => {
  try {
    const { data, error } = await supabase.rpc('getuserrankingstats', { 
      wallet_address_param: walletAddress 
    });
    
    if (error) {
      console.error('Erro ao buscar stats de ranking:', error);
      return null;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Erro na função getUserRankingStats:', error);
    return null;
  }
};

export const getWalletBalance = async (walletAddress: string): Promise<WalletBalance | null> => {
  try {
    const { data, error } = await supabase.rpc('getwalletbalance', { 
      wallet_address_param: walletAddress 
    });
    
    if (error) {
      console.error('Erro ao buscar saldo da wallet:', error);
      return null;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Erro na função getWalletBalance:', error);
    return null;
  }
};

export const getNetworkTree = async (walletAddress: string): Promise<NetworkMember[]> => {
  try {
    const { data, error } = await supabase.rpc('getnetworktree', { 
      wallet_address_param: walletAddress 
    });
    
    if (error) {
      console.error('Erro ao buscar árvore da rede:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Erro na função getNetworkTree:', error);
    return [];
  }
};

export const getCommissionsHistory = async (walletAddress: string): Promise<CommissionHistory[]> => {
  try {
    const { data, error } = await supabase.rpc('getcommissionshistory', { 
      wallet_address_param: walletAddress 
    });
    
    if (error) {
      console.error('Erro ao buscar histórico de comissões:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Erro na função getCommissionsHistory:', error);
    return [];
  }
};

export const checkRankingUpgrade = async (walletAddress: string): Promise<RankingUpgrade | null> => {
  try {
    const { data, error } = await supabase.rpc('checkrankingupgrade', { 
      wallet_address_param: walletAddress 
    });
    
    if (error) {
      console.error('Erro ao verificar upgrade de ranking:', error);
      return null;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Erro na função checkRankingUpgrade:', error);
    return null;
  }
};
