
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface ReferralCardProps {
  directReferrals: number;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ directReferrals }) => {
  return (
    <Card className="bg-slate-800/90 border-slate-700/50 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <p className="text-white text-lg font-medium">Programa de Indicação</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-slate-300 text-sm">Seu código de indicação:</p>
          <div className="bg-slate-700/50 p-3 rounded border border-slate-600/50">
            <p className="text-white font-mono">MASTER2024</p>
          </div>
        </div>
        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
          Copiar Link
        </Button>
        <div className="text-center">
          <p className="text-sm text-slate-300">
            Você tem <span className="text-white font-bold">{directReferrals}</span> indicações diretas
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralCard;
