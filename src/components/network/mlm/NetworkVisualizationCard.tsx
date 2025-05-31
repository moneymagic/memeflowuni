
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Users, Network, Layers } from 'lucide-react';

const NetworkVisualizationCard: React.FC = () => {
  return (
    <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10"></div>
      <CardHeader className="relative">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500/20 rounded-2xl">
            <Network className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-white font-light text-xl tracking-tight">Matriz de Ganhos</CardTitle>
            <CardDescription className="text-white/60 font-light">
              Profundidade Infinita + Compressão por Ranking
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-6">
        <div className="text-center p-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-3xl blur opacity-30"></div>
            <div className="relative bg-gradient-to-r from-emerald-400/20 to-blue-500/20 p-6 rounded-3xl backdrop-blur-sm border border-white/10">
              <Users className="h-10 w-10 text-white mx-auto" />
            </div>
          </div>
          <p className="text-white font-medium mb-2 tracking-tight">Você</p>
          <p className="text-white/60 text-sm font-light">Master Account</p>
        </div>
        
        <div className="bg-white/5 p-6 rounded-2xl text-sm text-white/70 border border-white/10">
          <div className="flex items-start space-x-3 mb-4">
            <Layers className="h-5 w-5 text-blue-400 mt-0.5" />
            <div>
              <p className="mb-3 font-light leading-relaxed">
                O sistema sobe linha por linha da árvore, procurando os ranks qualificados de V1 a V8.
              </p>
              <p className="font-light leading-relaxed">
                Cada rank tem um percentual fixo dentro dos 20% distribuídos em rede.
              </p>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-white/20 text-white hover:bg-white/10 rounded-2xl py-3 font-medium backdrop-blur-sm"
        >
          Ver Árvore Completa
        </Button>
      </CardContent>
    </Card>
  );
};

export default NetworkVisualizationCard;
