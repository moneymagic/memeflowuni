
import React from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, LogOut } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (isConnected && walletAddress) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 font-medium tracking-tight flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            Carteira Conectada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-50/80 rounded-2xl p-4">
            <p className="text-slate-600 text-sm mb-1">Endereço:</p>
            <p className="font-mono text-slate-900 font-medium">{formatAddress(walletAddress)}</p>
          </div>
          <Button 
            onClick={disconnectWallet}
            variant="outline"
            className="w-full flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Desconectar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-900 font-medium tracking-tight">
          Conectar Carteira
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <p className="text-slate-600 font-light">
            Conecte sua carteira Phantom para acessar o dashboard
          </p>
          <Button 
            onClick={connectWallet}
            className="w-full flex items-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            Conectar Phantom Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;
