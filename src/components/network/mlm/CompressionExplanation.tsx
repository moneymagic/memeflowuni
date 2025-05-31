
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const CompressionExplanation: React.FC = () => {
  return (
    <Card className="bg-slate-700/50 border-slate-600/50 backdrop-blur-sm mt-6">
      <CardHeader>
        <CardTitle className="text-white">Como Funciona o Sistema de Diferença</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-slate-300">
        <div className="space-y-3">
          <div>
            <h4 className="text-white font-medium mb-2">🎯 Regras do Sistema MemeMoon Flow:</h4>
            <ul className="space-y-2 list-disc pl-5">
              <li>O sistema percorre a linha ascendente do seguidor que lucrou</li>
              <li>Cada upline recebe a <strong className="text-white">diferença</strong> entre seu percentual máximo e o percentual do upline imediatamente abaixo</li>
              <li>Se o upline tiver o mesmo ou menor ranking que o de baixo, ele <strong className="text-red-300">não recebe nada</strong></li>
              <li>A soma total dos bônus <strong className="text-white">nunca ultrapassa 20%</strong> por transação</li>
              <li>Sobras não são redistribuídas - ficam com a plataforma</li>
            </ul>
          </div>
          
          <div className="p-4 bg-emerald-800/30 rounded-lg border border-emerald-500/30">
            <h4 className="text-emerald-200 font-medium mb-2">✅ Exemplo Completo (20% distribuído):</h4>
            <p className="text-emerald-200">Linha: V1 → V4 → V6 → V8</p>
            <ul className="text-emerald-200 text-sm mt-2 space-y-1">
              <li>• V1: 2% (primeiro da linha)</li>
              <li>• V4: 8% - 2% = 6%</li>
              <li>• V6: 14% - 8% = 6%</li>
              <li>• V8: 20% - 14% = 6%</li>
              <li><strong>Total: 20%</strong></li>
            </ul>
          </div>
          
          <div className="p-4 bg-red-800/30 rounded-lg border border-red-500/30">
            <h4 className="text-red-200 font-medium mb-2">❌ Exemplo com Empate:</h4>
            <p className="text-red-200">Linha: V5 → V5</p>
            <ul className="text-red-200 text-sm mt-2 space-y-1">
              <li>• V5 (downline): 12%</li>
              <li>• V5 (upline): 12% - 12% = 0% → <strong>não recebe nada</strong></li>
              <li>• Sobra de 8% fica com a plataforma</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompressionExplanation;
