import React from 'react';
import { useNetworkData } from '../../hooks/useNetworkData';

/**
 * Componente para exibir estatísticas de rede do usuário
 * Versão otimizada com design minimalista e foco na usabilidade
 * 
 * @param userId ID do usuário
 * @returns Componente React
 */
export const NetworkStats: React.FC<{ userId: string }> = ({ userId }) => {
  const { networkStats, loading, error } = useNetworkData(userId);

  if (loading) {
    return <div className="p-4 rounded-lg bg-primary-900/20 animate-pulse">Carregando estatísticas...</div>;
  }

  if (error || !networkStats) {
    return <div className="p-4 rounded-lg bg-destructive/20">Erro ao carregar estatísticas de rede</div>;
  }

  return (
    <div className="p-6 rounded-lg bg-primary-900/20">
      <h3 className="text-xl font-bold mb-4">Estatísticas de Rede</h3>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Ranking</span>
          <span className="text-2xl font-bold">V{networkStats.currentRank}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Lucro da Rede</span>
          <span className="text-2xl font-bold">{networkStats.totalNetworkProfit.toFixed(2)} SOL</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Referidos Diretos</span>
          <span className="text-2xl font-bold">{networkStats.directReferrals}</span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Ganhos Totais</span>
          <span className="text-2xl font-bold">{networkStats.totalEarnings.toFixed(2)} SOL</span>
        </div>
      </div>
    </div>
  );
};

export default NetworkStats;
