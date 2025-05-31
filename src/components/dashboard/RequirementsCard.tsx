
import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

interface RequirementsCardProps {
  isActive: boolean;
}

const RequirementsCard: React.FC<RequirementsCardProps> = ({ isActive }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-slate-900 font-medium tracking-tight">Requisitos de Saldo</CardTitle>
        <CardDescription className="text-slate-600 font-light">
          Mantenha seu saldo para continuar ativo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-2xl">
            <span className="text-slate-600 font-light text-sm">Saldo para Ativação:</span>
            <span className="text-emerald-600 font-medium">0.5 SOL</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-2xl">
            <span className="text-slate-600 font-light text-sm">Saldo de Manutenção:</span>
            <span className="text-amber-600 font-medium">0.1 SOL</span>
          </div>
        </div>
        
        <div className={`p-4 rounded-2xl border ${
          isActive 
            ? 'bg-emerald-50/80 border-emerald-200/50' 
            : 'bg-red-50/80 border-red-200/50'
        }`}>
          <div className="flex items-start space-x-3">
            {isActive ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            )}
            <p className={`font-light text-sm leading-relaxed ${
              isActive ? 'text-emerald-700' : 'text-red-700'
            }`}>
              {isActive 
                ? "Sua conta está ativa e funcionando corretamente" 
                : "Sua conta está inativa. Adicione saldo para ativá-la."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequirementsCard;
