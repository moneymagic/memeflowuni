import { supabase } from '../../src/integrations/supabase/client';
import { CommissionService } from './CommissionService';

/**
 * Serviço para interações com o Supabase
 * Centraliza todas as chamadas ao backend para evitar duplicação de código
 */
export class SupabaseService {
  /**
   * Obtém dados do usuário pelo ID
   * @param userId ID do usuário
   * @returns Dados do usuário ou null em caso de erro
   */
  static async getUserById(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Erro inesperado ao buscar usuário:', error);
      return null;
    }
  }
  
  /**
   * Obtém dados de afiliado pelo ID do usuário
   * @param userId ID do usuário
   * @returns Dados de afiliado ou null em caso de erro
   */
  static async getAffiliateByUserId(userId: string) {
    try {
      const { data, error } = await supabase
        .from('affiliates')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        console.error('Erro ao buscar afiliado:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Erro inesperado ao buscar afiliado:', error);
      return null;
    }
  }
  
  /**
   * Obtém histórico de operações de um usuário
   * @param userId ID do usuário
   * @param limit Limite de registros (opcional)
   * @returns Array de operações ou array vazio em caso de erro
   */
  static async getUserTrades(userId: string, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
        
      if (error) {
        console.error('Erro ao buscar operações:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Erro inesperado ao buscar operações:', error);
      return [];
    }
  }
  
  /**
   * Obtém referidos diretos de um usuário
   * @param userId ID do usuário
   * @returns Array de referidos ou array vazio em caso de erro
   */
  static async getDirectReferrals(userId: string) {
    try {
      const { data, error } = await supabase
        .from('affiliates')
        .select('*, users(*)')
        .eq('referrer_id', userId);
        
      if (error) {
        console.error('Erro ao buscar referidos diretos:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Erro inesperado ao buscar referidos:', error);
      return [];
    }
  }
  
  /**
   * Obtém estatísticas de rede de um usuário
   * Método centralizado que substitui chamadas duplicadas em outros serviços
   * @param userId ID do usuário
   * @returns Estatísticas de rede ou objeto padrão em caso de erro
   */
  static async getNetworkStats(userId: string) {
    try {
      const { data: affiliate, error } = await supabase
        .from('affiliates')
        .select('*')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        console.error('Erro ao buscar estatísticas de rede:', error);
        return {
          currentRank: 1,
          totalNetworkProfit: 0,
          totalEarnings: 0,
          directReferrals: 0,
          totalReferrals: 0
        };
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
      return {
        currentRank: 1,
        totalNetworkProfit: 0,
        totalEarnings: 0,
        directReferrals: 0,
        totalReferrals: 0
      };
    }
  }
  
  /**
   * Processa comissões para uma operação
   * Método centralizado que substitui chamadas duplicadas em outros serviços
   * @param tradeProfit Lucro da operação
   * @param followerUserId ID do usuário seguidor
   * @returns Resultado do processamento ou null em caso de erro
   */
  static async processCommission(tradeProfit: number, followerUserId: string) {
    try {
      const { data, error } = await supabase.rpc('process_commissions', {
        trade_profit_param: tradeProfit,
        follower_user_id_param: followerUserId
      });
      
      if (error) {
        console.error('Erro ao processar comissões:', error);
        return null;
      }
      
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        return {
          success: Boolean(data.success),
          master_fee: Number(data.master_fee || 0),
          network_fee: Number(data.network_fee || 0),
          total_distributed_percentage: Number(data.total_distributed_percentage || 0),
          remaining_percentage: Number(data.remaining_percentage || 0)
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro inesperado ao processar comissões:', error);
      return null;
    }
  }
  
  /**
   * Obtém a cadeia de uplines de um usuário
   * Método centralizado que substitui chamadas duplicadas em outros serviços
   * @param userId ID do usuário
   * @returns Array de uplines ou array vazio em caso de erro
   */
  static async getUplineChain(userId: string) {
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
        rank: upline.rank ? `V${upline.rank}` as any : null
      })) || [];
    } catch (error) {
      console.error('Erro inesperado ao buscar uplines:', error);
      return [];
    }
  }
  
  /**
   * Verifica se um usuário pode subir de ranking
   * Método centralizado que substitui chamadas duplicadas em outros serviços
   * @param userId ID do usuário
   * @returns Novo ranking possível ou 1 em caso de erro
   */
  static async checkRankUpgrade(userId: string) {
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
   * Método centralizado que substitui chamadas duplicadas em outros serviços
   * @param userId ID do usuário
   * @returns Array de distribuições ou array vazio em caso de erro
   */
  static async getCommissionDistributions(userId: string) {
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
   * Método centralizado que substitui chamadas duplicadas em outros serviços
   * @param userId ID do usuário
   * @returns Array de progressos ou array vazio em caso de erro
   */
  static async getRankingProgress(userId: string) {
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
}
