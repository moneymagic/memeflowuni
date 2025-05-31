
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, TrendingUp, Calendar } from "lucide-react";

interface RevenueMetricsProps {
  className?: string;
}

const RevenueMetrics = ({ className }: RevenueMetricsProps) => {
  const metricsData = {
    dailyRevenue: 0.45,
    dailyChange: "+12%",
    historicalRevenue: 8.75,
    historicalChange: "+32%"
  };

  return (
    <Card className={`${className} bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm`}>
      <CardHeader>
        <CardTitle className="text-slate-900 font-medium tracking-tight">Métricas de Faturamento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Faturamento Diário */}
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200/50 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm flex items-center font-light">
                    <Calendar className="h-4 w-4 mr-2" />
                    Faturamento Diário
                  </p>
                  <p className="text-2xl font-light text-slate-900 mt-2 tracking-tight">
                    {metricsData.dailyRevenue} SOL
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-emerald-600 text-sm font-medium">
                      {metricsData.dailyChange}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-emerald-600 ml-1" />
                  </div>
                </div>
                <div className="bg-emerald-500 p-3 rounded-2xl">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Faturamento Histórico */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/50 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm flex items-center font-light">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Faturamento Histórico
                  </p>
                  <p className="text-2xl font-light text-slate-900 mt-2 tracking-tight">
                    {metricsData.historicalRevenue} SOL
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-blue-600 text-sm font-medium">
                      {metricsData.historicalChange}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-blue-600 ml-1" />
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueMetrics;
