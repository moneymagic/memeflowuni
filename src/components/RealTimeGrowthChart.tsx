
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { getCapitalGrowthData, CapitalGrowthData } from '@/services/CapitalGrowthService';

const RealTimeGrowthChart: React.FC = () => {
  const { walletAddress, isConnected } = useWallet();
  const [growthData, setGrowthData] = useState<CapitalGrowthData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGrowthData = async () => {
      if (!walletAddress || !isConnected) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getCapitalGrowthData(walletAddress, 30);
        setGrowthData(data);
      } catch (error) {
        console.error('Error fetching growth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrowthData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchGrowthData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [walletAddress, isConnected]);

  const totalGrowth = growthData.length > 0 ? 
    ((growthData[growthData.length - 1].value - growthData[0].value) / growthData[0].value) * 100 : 0;

  if (isLoading) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin text-slate-500" />
            <span className="ml-2 text-slate-600">Carregando dados de crescimento...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-900 font-medium tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Crescimento do Capital
        </CardTitle>
        <CardDescription className="text-slate-600">
          Evolução dos ganhos nos últimos 30 dias
          <span className={`ml-2 font-medium ${totalGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {totalGrowth >= 0 ? '+' : ''}{totalGrowth.toFixed(2)}%
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(value) => `${value} SOL`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => [
                  `${value.toFixed(3)} SOL`,
                  name === 'value' ? 'Capital Total' : 'Lucro do Dia'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeGrowthChart;
