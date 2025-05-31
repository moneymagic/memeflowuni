
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import { Upline, Rank } from '@/services/CommissionTypes';
import { distributeCommission } from '@/services/CommissionService';
import { TabsContent } from "@/components/ui/tabs";
import CompressionExplanation from './CompressionExplanation';
import CommissionExample from './CommissionExample';
import RankDistributionTable from './RankDistributionTable';

interface MLMMainContentProps {
  tab: string;
  rankPercentages: Record<Rank, number>;
  levels: { level: number; members: number; commission: string; earnings: string }[];
}

const MLMMainContent: React.FC<MLMMainContentProps> = ({ tab, rankPercentages, levels }) => {
  // Sample upline for demonstration
  const sampleUpline: Upline[] = [
    { id: "user1", rank: "V1" },
    { id: "user2", rank: "V3" },
    { id: "user3", rank: null },  // No rank
    { id: "user4", rank: "V2" },
    { id: "user5", rank: "V5" },
    { id: "user6", rank: null },  // No rank
    { id: "user7", rank: "V8" }
  ];
  
  // Calculate distribution using the service
  const distribution = distributeCommission(sampleUpline);
  
  // Format distribution for display
  const formattedDistribution = Object.entries(distribution)
    .filter(([_, percentage]) => percentage > 0)
    .map(([userId, percentage]) => {
      const upline = sampleUpline.find(u => u.id === userId);
      return `${upline?.rank || "Unknown"}: ${percentage}%`;
    })
    .join(", ");

  // Example values for CommissionExample
  const profitExample = 100;
  const performanceFee = profitExample * 0.3;
  const masterTraderFee = profitExample * 0.1;
  const networkFee = profitExample * 0.2;
  const distributionExample = formattedDistribution.split(", ");

  return (
    <>
      <TabsContent value="overview">
        <Card className="bg-slate-700/50 border-slate-600/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Estrutura Unilevel com Compressão por Ranking</CardTitle>
            <CardDescription className="text-slate-300">
              Distribuição de comissões por nível da rede (20% do lucro total)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {levels.map((level, index) => (
                <div key={index} className="p-4 bg-slate-600/30 rounded-lg border border-slate-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold">Nível {level.level}</p>
                        <p className="text-slate-300 text-sm">{level.members} membros</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                        {level.commission}
                      </Badge>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-white font-medium">{level.members} pessoas</p>
                      <p className="text-slate-300 text-sm">neste nível</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-green-400 font-bold">{level.earnings}</p>
                      <p className="text-slate-300 text-sm">ganhos mensais</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-4 bg-gradient-to-r from-purple-800/50 to-blue-800/50 rounded-lg mt-4 border border-purple-500/30">
                <p className="text-white text-center">
                  A profundidade da rede é ilimitada: as comissões sobem linha por linha até encontrar os ranks qualificados
                </p>
                <p className="text-sm text-center text-blue-300 mt-2">
                  Exemplo: {formattedDistribution}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="commission">
        <CommissionExample 
          profitExample={profitExample}
          performanceFee={performanceFee}
          masterTraderFee={masterTraderFee}
          networkFee={networkFee}
          distributionExample={distributionExample}
        />
      </TabsContent>
      
      <TabsContent value="compression">
        <CompressionExplanation />
      </TabsContent>
    </>
  );
};

export default MLMMainContent;
