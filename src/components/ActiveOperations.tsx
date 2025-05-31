
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Operações ativas de exemplo
const activeOperations = [
  { 
    coin: "BONK", 
    entryPrice: 0.00000135, 
    currentPrice: 0.00000145, 
    percentChange: 7.4, 
    direction: "buy", 
    amount: 0.2
  },
  { 
    coin: "PEPE", 
    entryPrice: 0.0000125, 
    currentPrice: 0.0000135, 
    percentChange: 8.0, 
    direction: "buy", 
    amount: 0.15
  },
  { 
    coin: "SHIB", 
    entryPrice: 0.000028, 
    currentPrice: 0.000027, 
    percentChange: -3.6, 
    direction: "sell", 
    amount: 0.18
  }
];

interface ActiveOperationsProps {
  className?: string;
}

const ActiveOperations = ({ className }: ActiveOperationsProps) => {
  return (
    <Card className={`${className} bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm`}>
      <CardHeader>
        <CardTitle className="text-slate-900 font-medium tracking-tight">Operações em Andamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeOperations.map((op, index) => {
            const isProfit = (op.direction === "buy" && op.percentChange > 0) || 
                            (op.direction === "sell" && op.percentChange < 0);
            
            return (
              <div key={index} className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-3 rounded-2xl">
                      <span className="text-white text-xs font-bold">{op.coin}</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="text-slate-900 font-medium">{op.coin}</p>
                        <Badge 
                          variant="outline" 
                          className={`ml-2 ${op.direction === "buy" 
                            ? "border-emerald-500 text-emerald-700 bg-emerald-50" 
                            : "border-red-500 text-red-700 bg-red-50"}`}
                        >
                          {op.direction === "buy" ? "Compra" : "Venda"}
                        </Badge>
                      </div>
                      <p className="text-slate-600 text-sm font-light">{op.amount} SOL</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <p className={`font-bold ${isProfit ? "text-emerald-600" : "text-red-600"}`}>
                        {op.percentChange > 0 ? "+" : ""}{op.percentChange}%
                      </p>
                      {isProfit ? 
                        <ArrowUpRight className="h-4 w-4 text-emerald-600 ml-1" /> : 
                        <ArrowDownRight className="h-4 w-4 text-red-600 ml-1" />
                      }
                    </div>
                    <p className="text-slate-600 text-sm font-light">
                      {op.coin === "BONK" || op.coin === "PEPE" ? 
                        op.currentPrice.toFixed(8) : op.currentPrice.toFixed(6)} SOL
                    </p>
                  </div>
                </div>
                
                {/* Barra de progresso para visualizar o ganho/perda */}
                <div className="mt-3">
                  <Progress 
                    className="h-2 bg-slate-200"
                    value={isProfit ? 50 + (op.percentChange * 2.5) : 50 - (Math.abs(op.percentChange) * 2.5)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveOperations;
