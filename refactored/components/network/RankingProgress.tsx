import React from 'react';
import { useNetworkData } from '../../hooks/useNetworkData';

/**
 * Componente para exibir o progresso de ranking do usuário
 * Versão otimizada que utiliza o hook centralizado useNetworkData
 * 
 * @param userId ID do usuário
 * @returns Componente React
 */
export const RankingProgress: React.FC<{ userId: string }> = ({ userId }) => {
  const { 
    networkStats, 
    loading, 
    error,
    getNextRankRequirement,
    getProgressToNextRank
  } = useNetworkData(userId);

  if (loading) {
    return <div className="p-4 rounded-lg bg-primary-900/20">Carregando progresso de ranking...</div>;
  }

  if (error || !networkStats) {
    return <div className="p-4 rounded-lg bg-destructive/20">Erro ao carregar dados de ranking</div>;
  }

  const currentRank = networkStats.currentRank;
  const nextRankRequirement = getNextRankRequirement();
  const progressPercentage = getProgressToNextRank();
  
  // Se já está no ranking máximo
  if (!nextRankRequirement) {
    return (
      <div className="p-6 rounded-lg bg-primary-900/20">
        <h3 className="text-xl font-bold mb-2">Ranking Máximo Alcançado</h3>
        <p className="text-muted-foreground">
          Parabéns! Você atingiu o ranking máximo (V8).
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-primary-900/20">
      <h3 className="text-xl font-bold mb-2">Progresso de Ranking</h3>
      
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">Ranking Atual: V{currentRank}</span>
        <span className="font-medium">Próximo: V{currentRank + 1}</span>
      </div>
      
      {/* Barra de progresso */}
      <div className="w-full h-3 bg-primary-900/30 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span>Lucro da Rede Atual:</span>
          <span className="font-medium">{networkStats.totalNetworkProfit.toFixed(2)} SOL</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Necessário para V{currentRank + 1}:</span>
          <span className="font-medium">{nextRankRequirement.networkProfit} SOL</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Requisito de Estrutura:</span>
          <span className="font-medium">{nextRankRequirement.structure}</span>
        </div>
      </div>
    </div>
  );
};

export default RankingProgress;
