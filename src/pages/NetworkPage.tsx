
import React, { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import NetworkStats from '@/components/network/NetworkStats';
import DownlineStats from '@/components/network/DownlineStats';
import Layout from '@/components/Layout';
import { useWalletData } from '@/hooks/useWalletData';

const NetworkPage = () => {
  const { walletAddress, isConnected } = useWallet();
  const { networkData, isLoading } = useWalletData();

  if (!isConnected) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh] p-4">
          <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white max-w-md w-full">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Conectar Carteira</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 mb-4">
                Conecte sua carteira para acessar suas informações de rede
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-xl">Carregando dados da rede...</div>
        </div>
      </Layout>
    );
  }

  const totalMembers = networkData?.totalMembers || 0;
  const totalVolume = networkData?.totalVolume || 0;
  const totalCommissions = networkData?.cumulativeProfit || 0;

  return (
    <Layout>
      <div className="min-h-screen p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Minha Rede</h1>
            <p className="text-gray-300">Gerencie e visualize sua rede de afiliados</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Total de Membros</p>
                    <p className="text-2xl font-bold text-white">{totalMembers}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Volume Total</p>
                    <p className="text-2xl font-bold text-white">{totalVolume.toLocaleString()} SOL</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-md border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">Comissões Totais</p>
                    <p className="text-2xl font-bold text-white">{totalCommissions.toLocaleString()} SOL</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Direct Network Analysis */}
          <Card className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-6 w-6" />
                Análise da Rede
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NetworkStats />
              <DownlineStats />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default NetworkPage;
