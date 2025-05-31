
import { supabase } from "@/integrations/supabase/client";
import { Rank, Upline } from './CommissionTypes';

/**
 * Service para gerenciar o sistema de comissionamento MLM do MemeMoon Flow
 */

export interface TradeCommissionResult {
  success: boolean;
  master_fee: number;
  network_fee: number;
  total_distributed_percentage: number;
  remaining_percentage: number;
}

export interface CommissionDistribution {
  id: string;
  copy_trade_id: string;
  recipient_user_id: string;
  amount_sol: number;
  percentage: number;
  rank_differential: number;
  created_at: string;
}

export interface RankingProgress {
  id: string;
  user_id: string;
  from_rank: number;
  to_rank: number;
  timestamp: string;
}

/**
 * Processa a distribuição de comissões para uma operação de copy trade
 */
export async function processTradeCommission(
  copyTradeId: string, 
  profitAmount: number, 
  followerUserId: string
): Promise<TradeCommissionResult> {
  try {
    const { data, error } = await supabase.rpc('distribute_trade_commissions', {
      copy_trade_id_param: copyTradeId,
      profit_amount_param: profitAmount,
      follower_user_id_param: followerUserId
    });

    if (error) {
      console.error('Erro ao processar comissões:', error);
      throw new Error(`Falha ao processar comissões: ${error.message}`);
    }

    // Safely convert the JSON response to our expected type
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return {
        success: Boolean(data.success),
        master_fee: Number(data.master_fee || 0),
        network_fee: Number(data.network_fee || 0),
        total_distributed_percentage: Number(data.total_distributed_percentage || 0),
        remaining_percentage: Number(data.remaining_percentage || 0)
      };
    }

    throw new Error('Resposta inválida do servidor');
  } catch (error) {
    console.error('Erro inesperado ao processar comissões:', error);
    throw error;
  }
}

/**
 * Obtém a cadeia de uplines de um usuário
 */
export async function getUserUplineChain(userId: string): Promise<Upline[]> {
  try {
    const { data, error } = await supabase.rpc('get_upline_chain', {
      user_id_param: userId
    });

    if (error) {
      console.error('Erro ao buscar cadeia de uplines:', error);
      return [];
    }

    return data?.map((upline: any) => ({
      id: upline.upline_id,
      rank: upline.rank ? `V${upline.rank}` as Rank : null
    })) || [];
  } catch (error) {
    console.error('Erro inesperado ao buscar uplines:', error);
    return [];
  }
}

/**
 * Verifica se um usuário pode subir de ranking
 */
export async function checkRankUpgrade(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase.rpc('check_rank_upgrade', {
      user_id_param: userId
    });

    if (error) {
      console.error('Erro ao verificar upgrade de ranking:', error);
      return 1;
    }

    return data || 1;
  } catch (error) {
    console.error('Erro inesperado ao verificar ranking:', error);
    return 1;
  }
}

/**
 * Obtém o histórico de distribuições de comissão para um usuário
 */
export async function getUserCommissionDistributions(userId: string): Promise<CommissionDistribution[]> {
  try {
    const { data, error } = await supabase
      .from('commission_distributions')
      .select('*')
      .eq('recipient_user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar distribuições de comissão:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro inesperado ao buscar distribuições:', error);
    return [];
  }
}

/**
 * Obtém o histórico de progresso de ranking para um usuário
 */
export async function getUserRankingProgress(userId: string): Promise<RankingProgress[]> {
  try {
    const { data, error } = await supabase
      .from('ranking_progress')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Erro ao buscar progresso de ranking:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erro inesperado ao buscar progresso:', error);
    return [];
  }
}

/**
 * Obtém estatísticas de rede de um usuário
 */
export async function getUserNetworkStats(userId: string) {
  try {
    const { data: affiliate, error } = await supabase
      .from('affiliates')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Erro ao buscar estatísticas de rede:', error);
      return null;
    }

    return {
      currentRank: affiliate?.rank || 1,
      totalNetworkProfit: affiliate?.total_network_profit || 0,
      totalEarnings: affiliate?.total_earnings || 0,
      directReferrals: affiliate?.direct_referrals_count || 0,
      totalReferrals: affiliate?.total_referrals || 0
    };
  } catch (error) {
    console.error('Erro inesperado ao buscar estatísticas:', error);
    return null;
  }
}

/**
 * Mapeia os percentuais por ranking conforme as regras do MemeMoon Flow
 */
export const MEMEMOON_RANK_PERCENTAGES: Record<Rank, number> = {
  'V1': 2,
  'V2': 4,
  'V3': 6,
  'V4': 8,
  'V5': 12,
  'V6': 14,
  'V7': 16,
  'V8': 20,
};

/**
 * Requisitos de volume e estrutura para cada ranking conforme tabela oficial
 */
export const MEMEMOON_RANK_REQUIREMENTS: Record<Rank, { volume: number, structure: string }> = {
  'V1': { volume: 0, structure: '—' },
  'V2': { volume: 30, structure: '2 linhas diferentes com pelo menos 1 membro V1' },
  'V3': { volume: 100, structure: '2 linhas diferentes com pelo menos 1 membro V2' },
  'V4': { volume: 300, structure: '2 linhas diferentes com pelo menos 1 membro V3' },
  'V5': { volume: 1000, structure: '2 linhas diferentes com pelo menos 1 membro V4' },
  'V6': { volume: 3000, structure: '2 linhas diferentes com pelo menos 1 membro V5' },
  'V7': { volume: 10000, structure: '2 linhas diferentes com pelo menos 1 membro V6' },
  'V8': { volume: 30000, structure: '2 linhas diferentes com pelo menos 1 membro V7' },
};
