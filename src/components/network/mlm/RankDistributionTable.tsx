
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Rank } from '@/services/CommissionTypes';
import { rankCommissionPercentages } from '@/services/RankService';

interface RankDistributionTableProps {
  profitExample: number;
}

const RankDistributionTable: React.FC<RankDistributionTableProps> = ({ profitExample }) => {
  const networkFee = profitExample * 0.2; // 20% of profit goes to network

  return (
    <div className="flex-1">
      <Card className="bg-slate-700/50 border-slate-600/50 backdrop-blur-sm h-full">
        <CardHeader>
          <CardTitle className="text-white text-lg">Percentuais Máximos por Ranking</CardTitle>
          <p className="text-slate-300 text-sm">Sistema de diferença - cada upline recebe a diferença entre seu percentual e o do upline abaixo</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(rankCommissionPercentages).map(([rank, percentage]) => {
              const solAmount = (percentage / 100) * profitExample;
              return (
                <div key={rank} className="flex items-center justify-between p-3 bg-slate-600/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium">
                      {rank}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{percentage}%</p>
                    <p className="text-slate-300 text-sm">(máx. {solAmount.toFixed(2)} SOL)</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-800/50 to-purple-800/50 rounded-lg border border-blue-500/30">
            <p className="text-blue-200 text-sm text-center">
              <strong>Regra:</strong> Cada upline recebe a diferença entre seu percentual máximo e o percentual do upline imediatamente abaixo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RankDistributionTable;
