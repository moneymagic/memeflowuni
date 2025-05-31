
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';

interface CommissionCardProps {
  monthlyCommissions?: number;
}

const CommissionCard: React.FC<CommissionCardProps> = ({ monthlyCommissions = 890 }) => {
  return (
    <Card className="relative overflow-hidden bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-700/10"></div>
      <CardHeader className="relative">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-600/20 rounded-2xl">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-white font-light text-xl tracking-tight">Suas Comissões</CardTitle>
            <p className="text-slate-300 font-light">Ganhos da matriz unilevel</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-6">
        <div className="text-center p-6 bg-slate-700/50 rounded-2xl backdrop-blur-sm border border-slate-600/30">
          <p className="text-4xl font-light text-white tracking-tight">₴ {monthlyCommissions}</p>
          <p className="text-emerald-400 font-medium mt-2">este mês</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-2xl border border-slate-600/30">
            <span className="text-slate-300 font-light">Hoje</span>
            <span className="text-white font-medium">₴ 67</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-2xl border border-slate-600/30">
            <span className="text-slate-300 font-light">Esta semana</span>
            <span className="text-white font-medium">₴ 234</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-2xl border border-slate-600/30">
            <span className="text-slate-300 font-light">Este mês</span>
            <span className="text-white font-medium">₴ 890</span>
          </div>
        </div>
        
        <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600/30">
          <h4 className="text-white font-medium mb-3 tracking-tight">Integração Solana</h4>
          <p className="text-slate-300 text-sm font-light leading-relaxed">
            Todas as comissões são calculadas e distribuídas automaticamente na blockchain Solana,
            garantindo transparência, velocidade e taxas mínimas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionCard;
