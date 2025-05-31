
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Wallet, ExternalLink } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

interface CopyTradeWalletProps {
  walletData: {
    balance: number;
    isActive: boolean;
  };
  isLoading: boolean;
}

const CopyTradeWallet = ({ walletData, isLoading }: CopyTradeWalletProps) => {
  const { toast } = useToast();
  const { walletAddress } = useWallet();
  
  const handleViewInExplorer = () => {
    if (walletAddress) {
      window.open(`https://explorer.solana.com/address/${walletAddress}`, '_blank');
    }
  };
  
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
    <div className="space-y-6">
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Carteira Phantom Conectada</CardTitle>
          <CardDescription className="text-gray-400">
            Sua carteira para operações de copy trading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-black/40 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Saldo Disponível</p>
            <p className="text-white text-3xl font-bold">{walletData.balance} SOL</p>
            <div className="flex items-center mt-2">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                walletData.balance > 0.05 ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <p className={`text-sm ${
                walletData.balance > 0.05 ? 'text-green-500' : 'text-red-500'
              }`}>
                {walletData.balance > 0.05 
                  ? 'Saldo suficiente para copy trading' 
                  : 'Saldo baixo! Adicione fundos para continuar o copy trading'}
              </p>
            </div>
          </div>
          
          <div className="bg-black/40 rounded-lg p-4 border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Endereço da Carteira</p>
            <div className="flex items-center justify-between mb-4">
              <p className="text-white text-sm font-mono truncate mr-2">
                {walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-8)}` : 'Não conectado'}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleViewInExplorer}
                disabled={!walletAddress}
              >
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
            
            <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-3">
              <div className="flex items-start">
                <Wallet className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <div className="text-blue-300 text-sm">
                  <p className="font-medium mb-1">Como funciona:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• O bot executa trades usando sua carteira Phantom</li>
                    <li>• Você mantém controle total dos seus fundos</li>
                    <li>• Taxas são cobradas apenas sobre lucros realizados</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CopyTradeWallet;
