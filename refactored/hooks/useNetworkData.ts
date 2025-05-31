import { useState, useEffect } from 'react';
import { 
  getUserNetworkStats, 
  getUserRankingProgress,
  getUserCommissionDistributions,
  RANK_PERCENTAGES,
  RANK_REQUIREMENTS
} from '../services/CommissionService';

/**
 * Hook para obter e gerenciar dados de rede e comissões do usuário
 * Versão otimizada que centraliza todas as chamadas relacionadas a rede e comissões
 * 
 * @param userId ID do usuário
 * @returns Objeto com dados de rede, progresso de ranking e distribuições de comissão
 */
export function useNetworkData(userId: string | null) {
  const [networkStats, setNetworkStats] = useState<any>(null);
  const [rankingProgress, setRankingProgress] = useState<any[]>([]);
  const [commissionDistributions, setCommissionDistributions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Constantes do sistema de ranking e comissões
  const rankPercentages = RANK_PERCENTAGES;
  const rankRequirements = RANK_REQUIREMENTS;

  useEffect(() => {
    // Se não houver userId, não faz nada
    if (!userId) {
      setLoading(false);
      return;
    }

    // Função para carregar todos os dados de rede
    async function loadNetworkData() {
      setLoading(true);
      setError(null);
      
      try {
        // Carrega dados em paralelo para melhor performance
        const [stats, progress, distributions] = await Promise.all([
          getUserNetworkStats(userId),
          getUserRankingProgress(userId),
          getUserCommissionDistributions(userId)
        ]);
        
        setNetworkStats(stats);
        setRankingProgress(progress);
        setCommissionDistributions(distributions);
      } catch (err) {
        console.error('Erro ao carregar dados de rede:', err);
        setError('Falha ao carregar dados de rede. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    loadNetworkData();
  }, [userId]);

  // Funções auxiliares para manipulação de dados
  
  // Calcula o total de comissões recebidas
  const getTotalCommissions = () => {
    return commissionDistributions.reduce((total, dist) => total + (dist.amount || 0), 0);
  };
  
  // Obtém o requisito de lucro para o próximo ranking
  const getNextRankRequirement = () => {
    if (!networkStats) return null;
    
    const currentRank = networkStats.currentRank;
    const nextRank = currentRank + 1;
    
    if (nextRank > 8) return null; // Já está no ranking máximo
    
    const nextRankKey = `V${nextRank}` as keyof typeof rankRequirements;
    return rankRequirements[nextRankKey];
  };
  
  // Calcula o progresso percentual para o próximo ranking
  const getProgressToNextRank = () => {
    if (!networkStats) return 0;
    
    const nextRequirement = getNextRankRequirement();
    if (!nextRequirement) return 100; // Já está no ranking máximo
    
    const currentProfit = networkStats.totalNetworkProfit;
    const requiredProfit = nextRequirement.networkProfit;
    
    // Evita divisão por zero
    if (requiredProfit <= 0) return 100;
    
    const progress = (currentProfit / requiredProfit) * 100;
    return Math.min(progress, 100); // Limita a 100%
  };

  return {
    networkStats,
    rankingProgress,
    commissionDistributions,
    loading,
    error,
    rankPercentages,
    rankRequirements,
    getTotalCommissions,
    getNextRankRequirement,
    getProgressToNextRank
  };
}
