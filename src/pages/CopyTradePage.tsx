
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CopyTradeWallet from "@/components/copy-trade/CopyTradeWallet";
import CopyTradeSettings from "@/components/copy-trade/CopyTradeSettings";
import RealTimeCopyTradeHistory from "@/components/copy-trade/RealTimeCopyTradeHistory";
import { useWallet } from "@/contexts/WalletContext";
import { useWalletData } from "@/hooks/useWalletData";
import WalletConnect from "@/components/WalletConnect";
import { Bot, Zap, TrendingUp, Settings } from "lucide-react";

const CopyTradePage = () => {
  const { isConnected, walletAddress } = useWallet();
  const { phantomBalance, copyTradeData, isLoading, error } = useWalletData();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600/10 via-transparent to-transparent"></div>
        
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <div className="relative group mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-gradient-to-r from-gray-500 to-gray-700 p-3 rounded-2xl shadow-lg mx-auto w-fit">
                <Bot className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-light text-white mb-4">
              Acesse o Copy Trading
            </h2>
            <p className="text-gray-300 font-extralight">
              Para configurar o trading automatizado com dados reais, conecte sua Phantom Wallet
            </p>
          </div>
          <WalletConnect />
        </div>
      </div>
    );
  }

  // Show error if there's one
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Erro ao carregar dados</h2>
              <p className="text-gray-300">{error}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const walletData = {
    balance: phantomBalance,
    isActive: copyTradeData?.isActive || false
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-gray-500 to-gray-700 p-3 rounded-2xl shadow-lg">
                  <Bot className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Copy Trading</h1>
                <p className="text-gray-300 font-light">Trading automatizado com dados reais em tempo real</p>
              </div>
            </div>
          </div>

          {/* Real-time Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-700/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">24h</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-1">
                +{copyTradeData?.todayReturn?.toFixed(2) || '0.00'}%
              </h3>
              <p className="text-gray-400 text-sm font-light">Retorno Hoje (Real)</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">Ativo</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-1">{copyTradeData?.totalTrades || 0}</h3>
              <p className="text-gray-400 text-sm font-light">Trades Executados (Real)</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">IA</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-1">
                {copyTradeData?.successRate?.toFixed(1) || '0.0'}%
              </h3>
              <p className="text-gray-400 text-sm font-light">Taxa de Sucesso (Real)</p>
            </div>

            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/80 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">Phantom</span>
              </div>
              <h3 className="text-2xl font-light text-white mb-1">{phantomBalance.toFixed(4)} SOL</h3>
              <p className="text-gray-400 text-sm font-light">Saldo Real Phantom</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <Tabs defaultValue="wallet" className="w-full">
              <div className="border-b border-white/10 px-8 pt-6 pb-0">
                <TabsList className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-1">
                  <TabsTrigger 
                    value="wallet" 
                    className="rounded-xl font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-300"
                  >
                    Carteira
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="rounded-xl font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-300"
                  >
                    Configurações
                  </TabsTrigger>
                  <TabsTrigger 
                    value="history" 
                    className="rounded-xl font-medium data-[state=active]:bg-gray-700 data-[state=active]:text-white data-[state=active]:shadow-sm text-gray-300"
                  >
                    Histórico Real
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-8">
                <TabsContent value="wallet" className="mt-0">
                  <CopyTradeWallet walletData={walletData} isLoading={isLoading} />
                </TabsContent>
                
                <TabsContent value="settings" className="mt-0">
                  <CopyTradeSettings walletData={walletData} isLoading={isLoading} />
                </TabsContent>
                
                <TabsContent value="history" className="mt-0">
                  <RealTimeCopyTradeHistory />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CopyTradePage;
