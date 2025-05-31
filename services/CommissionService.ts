import { supabase } from '../../src/integrations/supabase/client';

/**
 * Tipos para o sistema de comissões
 */
export type Rank = 'V1' | 'V2' | 'V3' | 'V4' | 'V5' | 'V6' | 'V7' | 'V8';

export interface Upline {
  id: string;
  rank: Rank | null;
}

export interface CommissionDistribution {
  [userId: string]: number;
}

export interface CommissionResult {
  profitAmount: number;
  performanceFee: number;
  masterTraderFee: number;
  networkFee: number;
  remainingProfit: number;
  distribution: CommissionDistribution;
  commissionAmounts: Record<string, number>;
  totalDistributed: number;
}

export interface RankingProgress {
  id: number;
  user_id: string;
  previous_rank: number;
  new_rank: number;
  network_profit: number;
  timestamp: string;
}

/**
 * Mapeia os percentuais por ranking conforme as regras do MemeMoon Flow
 * Cada ranking tem um percentual máximo de comissão que pode receber
 */
export const RANK_PERCENTAGES: Record<Rank, number> = {
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
 * Requisitos de lucro da rede e estrutura para cada ranking
 * Nota: Os valores de "volume" foram renomeados para "networkProfit" para refletir
 * que a progressão é baseada no lucro da rede, não no volume de transações
 */
export const RANK_REQUIREMENTS: Record<Rank, { networkProfit: number, structure: string }> = {
  'V1': { networkProfit: 0, structure: '—' },
  'V2': { networkProfit: 30, structure: '2 linhas diferentes com pelo menos 1 membro V1' },
  'V3': { networkProfit: 100, structure: '2 linhas diferentes com pelo menos 1 membro V2' },
  'V4': { networkProfit: 300, structure: '2 linhas diferentes com pelo menos 1 membro V3' },
  'V5': { networkProfit: 1000, structure: '2 linhas diferentes com pelo menos 1 membro V4' },
  'V6': { networkProfit: 3000, structure: '2 linhas diferentes com pelo menos 1 membro V5' },
  'V7': { networkProfit: 10000, structure: '2 linhas diferentes com pelo menos 1 membro V6' },
  'V8': { networkProfit: 30000, structure: '2 linhas diferentes com pelo menos 1 membro V7' },
};

/**
 * Processa a distribuição de comissões para um lucro específico usando a lógica do MemeMoon Flow
 * @param tradeProfit Valor do lucro da operação em SOL
 * @param followerUserId ID do usuário seguidor que copiou a operação
 * @returns Informações detalhadas da distribuição
 */
export async function processCommission(tradeProfit: number, followerUserId: string) {
  try {
    const { data, error } = await supabase.rpc('process_commissions', {
      trade_profit_param: tradeProfit,
      follower_user_id_param: followerUserId
    });
    
    if (error) {
      console.error('Erro ao processar comissões:', error);
      throw new Error(`Falha ao processar comissões: ${error.message}`);
    }
    
    // Converte a resposta JSON para o tipo esperado
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
 * @param userId ID do usuário
 * @returns Array de uplines ordenado do mais próximo ao mais distante
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
 * Verifica se um usuário pode subir de ranking com base no lucro da rede
 * @param userId ID do usuário
 * @returns Novo ranking possível (número)
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
 * @param userId ID do usuário
 * @returns Array de distribuições de comissão
 */
export async function getUserCommissionDistributions(userId: string): Promise<any[]> {
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
 * @param userId ID do usuário
 * @returns Array de progressos de ranking
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
 * @param userId ID do usuário
 * @returns Estatísticas de rede ou null em caso de erro
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
 * Distribui comissão entre uma cadeia de uplines com base na lógica diferencial
 * Cada upline recebe a diferença entre seu percentual e o percentual do upline abaixo
 * @param uplines Array de uplines ordenado do mais próximo ao mais distante
 * @returns Objeto mapeando IDs de usuário para seus percentuais de comissão
 */
export function distributeCommission(uplines: Upline[]): CommissionDistribution {
  const distribution: CommissionDistribution = {};
  let totalDistributed = 0;
  
  // Inicializa todos os uplines com 0% de comissão
  uplines.forEach(upline => {
    distribution[upline.id] = 0;
  });
  
  // Se não houver uplines, todo o percentual (20%) vai para a plataforma
  if (uplines.length === 0) {
    distribution['memeflow'] = 20;
    return distribution;
  }
  
  // Começa com o primeiro upline (mais próximo do seguidor)
  let previousPercentage = 0;
  
  // Processa cada upline na cadeia
  for (let i = 0; i < uplines.length; i++) {
    const upline = uplines[i];
    const currentMaxPercentage = getMaxPercentageForRank(upline.rank);
    
    // Calcula a diferença entre o percentual atual e o anterior
    const differencePercentage = currentMaxPercentage - previousPercentage;
    
    // Só atribui comissão se houver uma diferença positiva
    if (differencePercentage > 0) {
      distribution[upline.id] = differencePercentage;
      totalDistributed += differencePercentage;
      previousPercentage = currentMaxPercentage;
      
      // Se atingiu o máximo (20%), para o processamento
      if (previousPercentage >= 20) {
        break;
      }
    }
    // Se a diferença for 0 ou negativa, este upline não recebe nada
  }
  
  // Calcula o valor residual e atribui à plataforma memeflow
  const residual = 20 - totalDistributed;
  if (residual > 0) {
    distribution['memeflow'] = residual;
  }
  
  return distribution;
}

/**
 * Obtém o percentual máximo para um determinado ranking
 * @param rank Ranking do usuário
 * @returns Percentual máximo de comissão
 */
export function getMaxPercentageForRank(rank: Rank | null): number {
  if (!rank) return 0;
  return RANK_PERCENTAGES[rank] || 0;
}

/**
 * Calcula os valores reais em SOL que cada upline recebe com base nos percentuais
 * @param distribution Percentuais de distribuição de comissão
 * @param totalProfit Valor total do lucro em SOL
 * @returns Objeto mapeando IDs de usuário para seus valores de comissão em SOL
 */
export function calculateCommissionAmounts(
  distribution: CommissionDistribution, 
  totalProfit: number
): Record<string, number> {
  const result: Record<string, number> = {};
  
  Object.entries(distribution).forEach(([userId, percentage]) => {
    // Converte o percentual para decimal e multiplica pelo lucro total
    result[userId] = (percentage / 100) * totalProfit;
  });
  
  return result;
}

/**
 * Processa a distribuição de comissão para um lucro específico
 * @param uplines Cadeia de uplines ordenada do mais próximo ao mais distante
 * @param profitAmount Valor total do lucro em SOL
 * @returns Informações detalhadas da distribuição
 */
export function processTradeCommission(uplines: Upline[], profitAmount: number): CommissionResult {
  // Calcula a taxa de performance (30% do lucro)
  const performanceFee = profitAmount * 0.3;
  
  // Calcula a taxa do master trader (10% do lucro)
  const masterTraderFee = profitAmount * 0.1;
  
  // Calcula a taxa de rede (20% do lucro) - é o que será distribuído
  const networkFee = profitAmount * 0.2;
  
  // Calcula o lucro restante após as taxas (70% do lucro)
  const remainingProfit = profitAmount - performanceFee;
  
  // Calcula os percentuais de distribuição usando o sistema diferencial
  const distribution = distributeCommission(uplines);
  
  // Calcula os valores reais em SOL com base no lucro original
  // Nota: Calculamos com base no lucro total, não apenas na taxa de rede
  const commissionAmounts = calculateCommissionAmounts(distribution, profitAmount);
  
  // Calcula o total distribuído (deve ser igual à networkFee se todos os rankings estiverem presentes)
  const totalDistributed = Object.values(commissionAmounts).reduce((sum, amount) => sum + amount, 0);
  
  return {
    profitAmount,
    performanceFee,
    masterTraderFee,
    networkFee,
    remainingProfit,
    distribution,
    commissionAmounts,
    totalDistributed
  };
}

/**
 * Converte ranking string para valor numérico para comparação
 * @param rank Ranking do usuário
 * @returns Valor numérico do ranking
 */
export function rankToNumber(rank: Rank | null): number {
  if (!rank) return 0;
  return parseInt(rank.substring(1), 10);
}

/**
 * Verifica se um ranking se qualifica para um nível específico de comissão
 * @param userRank Ranking do usuário
 * @param requiredRank Ranking necessário
 * @returns Verdadeiro se o usuário se qualifica
 */
export function isRankQualified(userRank: Rank | null, requiredRank: Rank): boolean {
  if (!userRank) return false;
  return rankToNumber(userRank) >= rankToNumber(requiredRank);
}

/**
 * Obtém o requisito de lucro da rede para um ranking específico
 * @param rank Ranking alvo
 * @returns Valor do lucro da rede necessário
 */
export function getNetworkProfitRequirement(rank: Rank): number {
  return RANK_REQUIREMENTS[rank].networkProfit;
}

/**
 * Obtém a descrição do requisito de estrutura para um ranking específico
 * @param rank Ranking alvo
 * @returns Descrição do requisito de estrutura
 */
export function getStructureRequirement(rank: Rank): string {
  return RANK_REQUIREMENTS[rank].structure;
}
