
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Upline } from '@/services/CommissionTypes';
import { processTradeCommission } from '@/services/CommissionService';

interface CommissionExampleProps {
  profitExample: number;
  performanceFee: number;
  masterTraderFee: number;
  networkFee: number;
  distributionExample: string[];
}

const CommissionExample: React.FC<CommissionExampleProps> = ({ 
  profitExample,
  performanceFee,
  masterTraderFee,
  networkFee,
  distributionExample 
}) => {
  // Example upline chain for demonstration
  const exampleUpline: Upline[] = [
    { id: "user1", rank: "V1" },
    { id: "user2", rank: "V4" },
    { id: "user3", rank: "V6" },
    { id: "user4", rank: "V8" }
  ];
  
  const result = processTradeCommission(exampleUpline, profitExample);
  
  // Generate detailed breakdown
  const distributionBreakdown = Object.entries(result.distribution)
    .filter(([_, percentage]) => percentage > 0)
    .map(([userId, percentage]) => {
      const upline = exampleUpline.find(u => u.id === userId);
      const solAmount = result.commissionAmounts[userId];
      return {
        rank: upline?.rank || userId,
        percentage,
        solAmount: solAmount.toFixed(2)
      };
    });

  return (
    <div className="flex-1">
      <Card className="bg-slate-700/50 border-slate-600/50 backdrop-blur-sm h-full">
        <CardHeader>
          <CardTitle className="text-white text-lg">Exemplo de Distribuição</CardTitle>
          <p className="text-slate-300 text-sm">Baseado em {profitExample} SOL de lucro</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Fee Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-emerald-800/30 rounded">
              <span className="text-emerald-200">Master Trader (10%)</span>
              <span className="text-emerald-200 font-medium">{masterTraderFee.toFixed(2)} SOL</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-800/30 rounded">
              <span className="text-blue-200">Rede (20%)</span>
              <span className="text-blue-200 font-medium">{networkFee.toFixed(2)} SOL</span>
            </div>
          </div>
          
          {/* Network Distribution */}
          <div className="space-y-2">
            <h4 className="text-white font-medium">Distribuição na Rede:</h4>
            <p className="text-slate-300 text-sm">Linha: V1 → V4 → V6 → V8</p>
            
            {distributionBreakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-purple-800/30 rounded">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-600 text-white">{item.rank}</Badge>
                  <span className="text-purple-200 text-sm">
                    {index === 0 ? `${item.percentage}%` : 
                     `${(distributionBreakdown[index-1]?.percentage || 0) + item.percentage}% - ${distributionBreakdown[index-1]?.percentage || 0}% = ${item.percentage}%`}
                  </span>
                </div>
                <span className="text-purple-200 font-medium">{item.solAmount} SOL</span>
              </div>
            ))}
            
            <div className="p-3 bg-gradient-to-r from-purple-800/50 to-blue-800/50 rounded-lg mt-3 border border-purple-500/30">
              <p className="text-purple-200 text-sm text-center">
                <strong>Total distribuído:</strong> {result.totalDistributed.toFixed(2)} SOL ({((result.totalDistributed / profitExample) * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionExample;
