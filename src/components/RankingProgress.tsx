
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, RefreshCw } from "lucide-react";
import { useUserData } from "@/hooks/useUserData";
import { MEMEMOON_RANK_REQUIREMENTS } from "@/services/MLMCommissionService";

interface RankingProgressProps {
  className?: string;
}

const RankingProgress = ({ className }: RankingProgressProps) => {
  const { rankingStats, rankingUpgrade, loading, refreshData } = useUserData();

  if (loading) {
    return (
      <Card className={`${className} bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin text-slate-500" />
            <span className="ml-2 text-slate-600">Carregando progresso...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentRank = rankingStats?.current_rank || 1;
  const totalProfit = rankingStats?.total_profit || 0;
  const directReferrals = rankingStats?.direct_referrals || 0;
  const networkSize = rankingStats?.network_size || 0;
  
  const nextRank = currentRank + 1;
  const canUpgrade = rankingUpgrade?.can_upgrade || false;
  
  // Usar os requisitos corretos da tabela oficial
  const currentRankKey = `V${currentRank}` as keyof typeof MEMEMOON_RANK_REQUIREMENTS;
  const nextRankKey = `V${nextRank}` as keyof typeof MEMEMOON_RANK_REQUIREMENTS;
  
  const nextRankRequirements = MEMEMOON_RANK_REQUIREMENTS[nextRankKey];
  
  if (!nextRankRequirements) {
    // Se não há próximo rank (já é V8), mostrar status máximo
    return (
      <Card className={`${className} bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-slate-900 font-medium tracking-tight">Status</CardTitle>
              <CardDescription className="text-slate-600 font-light">
                Rank máximo atingido
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={refreshData}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                title="Atualizar dados"
              >
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </button>
              <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-yellow-600 text-white">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium">V{currentRank}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-slate-600">🎉 Parabéns! Você atingiu o rank máximo V8!</p>
            <p className="text-slate-500 text-sm mt-2">Rede total: {networkSize} membros</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const volumeProgress = nextRankRequirements.volume > 0 
    ? Math.min((totalProfit / nextRankRequirements.volume) * 100, 100)
    : 100;
  
  // Para estrutura, assumimos que directReferrals representa as linhas qualificadas
  // O requisito é sempre 2 linhas diferentes com pelo menos 1 membro do rank anterior
  const structureProgress = Math.min((directReferrals / 2) * 100, 100);
  
  const getNextLevelBenefits = () => {
    return [
      { text: `+${nextRank * 2}% Bônus MLM`, bgColor: "bg-purple-100", textColor: "text-purple-700" },
      { text: "Profundidade infinita", bgColor: "bg-blue-100", textColor: "text-blue-700" }
    ];
  };

  const nextLevelBenefits = getNextLevelBenefits();
  
  return (
    <Card className={`${className} bg-white/95 backdrop-blur-sm border border-slate-200/60 rounded-3xl shadow-sm`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-slate-900 font-medium tracking-tight">Status</CardTitle>
            <CardDescription className="text-slate-600 font-light">
              Progresso para V{nextRank}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={refreshData}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              title="Atualizar dados"
            >
              <RefreshCw className="w-4 h-4 text-slate-600" />
            </button>
            <div className={`flex items-center gap-1 px-4 py-2 rounded-full ${
              canUpgrade 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
            }`}>
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium">V{currentRank}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {nextRankRequirements.volume > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 font-light">Lucro dos Indicados</span>
              <span className="text-slate-900 font-medium">
                {totalProfit.toFixed(1)} / {nextRankRequirements.volume} SOL
              </span>
            </div>
            <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <Progress 
                value={volumeProgress} 
                className="h-3 bg-gradient-to-r from-emerald-500 to-teal-600"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Faltam {Math.max(0, nextRankRequirements.volume - totalProfit).toFixed(1)} SOL
              </span>
              <span className="text-slate-500">{volumeProgress.toFixed(1)}%</span>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600 font-light">Estrutura</span>
            <span className="text-slate-900 font-medium">
              {directReferrals} / 2 linhas
            </span>
          </div>
          <div className="relative h-3 w-full bg-slate-200 rounded-full overflow-hidden">
            <Progress 
              value={structureProgress} 
              className="h-3 bg-gradient-to-r from-purple-500 to-blue-600"
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">
              {nextRankRequirements.structure}
            </span>
            <span className="text-slate-500">{structureProgress.toFixed(1)}%</span>
          </div>
        </div>

        <div className="text-center text-sm text-slate-600">
          <p>Rede total: {networkSize} membros</p>
        </div>
        
        {canUpgrade && (
          <div className="rounded-2xl border border-green-200 p-4 bg-green-50">
            <p className="text-green-900 text-sm font-medium mb-2">🎉 Parabéns! Você pode fazer upgrade!</p>
            <p className="text-green-700 text-xs">Você atendeu todos os requisitos para o nível V{nextRank}</p>
          </div>
        )}
        
        {!canUpgrade && nextRank <= 8 && (
          <div className="rounded-2xl border border-slate-200/60 p-4 bg-slate-50/80">
            <p className="text-slate-900 text-sm font-medium mb-3">Próximo nível: V{nextRank}</p>
            <div className="flex flex-wrap gap-2">
              {nextLevelBenefits.map((benefit, index) => (
                <span 
                  key={index}
                  className={`${benefit.bgColor} ${benefit.textColor} text-xs px-3 py-1 rounded-full font-medium`}
                >
                  {benefit.text}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RankingProgress;
