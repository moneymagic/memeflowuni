
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';
import { 
  getUserCommissionDistributions, 
  getUserRankingProgress, 
  getUserNetworkStats,
  CommissionDistribution,
  RankingProgress 
} from '@/services/MLMCommissionService';

interface MLMCommissionTrackerProps {
  userId: string;
}

const MLMCommissionTracker: React.FC<MLMCommissionTrackerProps> = ({ userId }) => {
  const [commissions, setCommissions] = useState<CommissionDistribution[]>([]);
  const [rankingHistory, setRankingHistory] = useState<RankingProgress[]>([]);
  const [networkStats, setNetworkStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [commissionsData, rankingData, statsData] = await Promise.all([
          getUserCommissionDistributions(userId),
          getUserRankingProgress(userId),
          getUserNetworkStats(userId)
        ]);
        
        setCommissions(commissionsData);
        setRankingHistory(rankingData);
        setNetworkStats(statsData);
      } catch (error) {
        console.error('Erro ao carregar dados de comissionamento:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  if (loading) {
    return (
      <Card className="bg-slate-700/50 border-slate-600/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center text-slate-300">Carregando dados...</div>
        </CardContent>
      </Card>
    );
  }

  const totalEarnings = commissions.reduce((sum, commission) => sum + commission.amount_sol, 0);
  const thisMonthEarnings = commissions
    .filter(commission => {
      const commissionDate = new Date(commission.created_at);
      const now = new Date();
      return commissionDate.getMonth() === now.getMonth() && 
             commissionDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, commission) => sum + commission.amount_sol, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 border-emerald-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm">Ganhos Totais</p>
                <p className="text-white text-xl font-bold">{totalEarnings.toFixed(3)} SOL</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm">Este Mês</p>
                <p className="text-white text-xl font-bold">{thisMonthEarnings.toFixed(3)} SOL</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Ranking Atual</p>
                <p className="text-white text-xl font-bold">V{networkStats?.currentRank || 1}</p>
              </div>
              <Award className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-600/20 to-orange-700/20 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-300 text-sm">Volume da Rede</p>
                <p className="text-white text-xl font-bold">{networkStats?.totalNetworkProfit?.toFixed(1) || 0} SOL</p>
              </div>
              <Users className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Commissions */}
      <Card className="bg-slate-700/50 border-slate-600/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Comissões Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commissions.slice(0, 10).map((commission) => (
              <div key={commission.id} className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                    {commission.percentage.toFixed(1)}%
                  </Badge>
                  <div>
                    <p className="text-white text-sm">Diferencial de ranking</p>
                    <p className="text-slate-400 text-xs">
                      {new Date(commission.created_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-medium">+{commission.amount_sol.toFixed(4)} SOL</p>
                  <p className="text-slate-400 text-xs">
                    {commission.rank_differential.toFixed(1)}% diferencial
                  </p>
                </div>
              </div>
            ))}
            
            {commissions.length === 0 && (
              <div className="text-center text-slate-400 py-8">
                Nenhuma comissão recebida ainda
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ranking Progress */}
      {rankingHistory.length > 0 && (
        <Card className="bg-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Progresso de Ranking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rankingHistory.map((progress) => (
                <div key={progress.id} className="flex items-center justify-between p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-white text-sm">
                        Upgrade: V{progress.from_rank} → V{progress.to_rank}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {new Date(progress.timestamp).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-purple-600 text-white">
                    +{((progress.to_rank - progress.from_rank) * 2)}% Comissão
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MLMCommissionTracker;
