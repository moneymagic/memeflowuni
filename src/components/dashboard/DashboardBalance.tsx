
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, RefreshCw } from "lucide-react";
import { useWalletData } from "@/hooks/useWalletData";

const DashboardBalance: React.FC = () => {
  const { userData, isLoading, refreshData } = useWalletData();

  if (isLoading) {
    return (
      <Card className="mb-8 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin text-slate-500" />
            <span className="ml-2 text-slate-600">Carregando saldo...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalProfit = userData?.totalProfit || 0;
  const todayProfit = userData?.todayProfit || 0;
  const commissionEarnings = userData?.commissionEarnings || 0;

  return (
    <Card className="mb-8 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-slate-600 font-light text-sm">Lucro Total</p>
              <p className="text-3xl font-light text-slate-900 tracking-tight">{totalProfit.toFixed(3)} SOL</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-emerald-600">
                  Hoje: {todayProfit.toFixed(3)} SOL
                </span>
                <span className="text-sm text-blue-600">
                  Comissões: {commissionEarnings.toFixed(3)} SOL
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button 
              onClick={refreshData}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Atualizar dados"
            >
              <RefreshCw className="w-4 h-4 text-slate-600" />
            </button>
            <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/50 rounded-2xl px-4 py-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-emerald-700">Ativo</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardBalance;
