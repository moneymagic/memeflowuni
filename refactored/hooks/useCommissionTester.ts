import { useState, useEffect } from 'react';
import { SupabaseService } from '../services/SupabaseService';

/**
 * Hook para testar a lógica de comissões e ranking
 * Simula operações e verifica se a distribuição está correta
 * 
 * @param userId ID do usuário para teste
 * @returns Objeto com resultados de teste e funções de simulação
 */
export function useCommissionTester(userId: string | null) {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Simula uma operação lucrativa e testa a distribuição de comissões
   * @param profitAmount Valor do lucro em SOL
   */
  const simulateTrade = async (profitAmount: number) => {
    if (!userId) {
      setError('ID de usuário não fornecido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Obtém a cadeia de uplines
      const uplines = await SupabaseService.getUplineChain(userId);
      
      // Processa a comissão
      const result = await SupabaseService.processCommission(profitAmount, userId);
      
      // Verifica se o processamento foi bem-sucedido
      if (!result) {
        throw new Error('Falha ao processar comissões');
      }
      
      // Calcula valores esperados
      const expectedPerformanceFee = profitAmount * 0.3;
      const expectedMasterFee = profitAmount * 0.1;
      const expectedNetworkFee = profitAmount * 0.2;
      
      // Compara com os valores reais
      const testPassed = (
        Math.abs(result.master_fee - expectedMasterFee) < 0.001 &&
        Math.abs(result.network_fee - expectedNetworkFee) < 0.001
      );
      
      // Registra os resultados do teste
      setTestResults({
        profitAmount,
        uplineCount: uplines.length,
        expectedValues: {
          performanceFee: expectedPerformanceFee,
          masterFee: expectedMasterFee,
          networkFee: expectedNetworkFee
        },
        actualValues: {
          masterFee: result.master_fee,
          networkFee: result.network_fee,
          distributedPercentage: result.total_distributed_percentage,
          remainingPercentage: result.remaining_percentage
        },
        testPassed
      });
    } catch (err: any) {
      console.error('Erro ao simular operação:', err);
      setError(err.message || 'Erro ao simular operação');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Testa a progressão de ranking com base no lucro da rede
   */
  const testRankProgression = async () => {
    if (!userId) {
      setError('ID de usuário não fornecido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Obtém estatísticas de rede atuais
      const stats = await SupabaseService.getNetworkStats(userId);
      
      // Verifica se é possível subir de ranking
      const possibleRank = await SupabaseService.checkRankUpgrade(userId);
      
      // Obtém histórico de progresso de ranking
      const progressHistory = await SupabaseService.getRankingProgress(userId);
      
      // Registra os resultados do teste
      setTestResults({
        currentStats: stats,
        possibleRank,
        progressHistory: progressHistory.slice(0, 5), // Limita a 5 registros
        testPassed: possibleRank >= stats.currentRank
      });
    } catch (err: any) {
      console.error('Erro ao testar progressão de ranking:', err);
      setError(err.message || 'Erro ao testar progressão de ranking');
    } finally {
      setLoading(false);
    }
  };

  return {
    testResults,
    loading,
    error,
    simulateTrade,
    testRankProgression
  };
}
