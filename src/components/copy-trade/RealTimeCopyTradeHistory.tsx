
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';
import { useWalletData } from '@/hooks/useWalletData';

const RealTimeCopyTradeHistory: React.FC = () => {
  const { tradeHistory, isLoading } = useWalletData();

  if (isLoading) {
    return (
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <RefreshCw className="animate-spin text-white h-8 w-8" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Histórico de Trades</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tradeHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>Nenhum trade encontrado</p>
            <p className="text-sm mt-2">Seus trades aparecerão aqui quando o copy trading estiver ativo</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tradeHistory.slice(0, 10).map((trade) => (
              <div key={trade.id} className="bg-black/40 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{trade.tokenSymbol}</span>
                    <Badge variant={trade.isSuccessful ? "default" : "destructive"}>
                      {trade.isSuccessful ? 'Sucesso' : 'Falha'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    {trade.profitSol > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                    <span className={`font-medium ${trade.profitSol > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {trade.profitSol > 0 ? '+' : ''}{trade.profitSol.toFixed(4)} SOL
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <p>Entrada: {trade.entryPrice.toFixed(6)}</p>
                    <p>Saída: {trade.exitPrice.toFixed(6)}</p>
                  </div>
                  <div className="text-right">
                    <p>Data: {trade.timestamp.toLocaleDateString('pt-BR')}</p>
                    <p>Hora: {trade.timestamp.toLocaleTimeString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeCopyTradeHistory;
