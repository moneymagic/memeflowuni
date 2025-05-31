
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WalletConnect from "@/components/WalletConnect";
import { useWalletData } from "@/hooks/useWalletData";
import { useWallet } from "@/contexts/WalletContext";

const Dashboard = () => {
  const { isConnected } = useWallet();
  const { userData, isLoading, error } = useWalletData();
  const { toast } = useToast();

  // Show error toast if there's an error
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar dados",
        description: error,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  // Se a carteira não está conectada, mostrar tela de conexão com estilo aprimorado
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600/10 via-transparent to-transparent"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-light text-white mb-4">
              Conecte sua carteira
            </h2>
            <p className="text-gray-300 font-extralight">
              Para acessar o dashboard com dados reais, conecte sua Phantom Wallet
            </p>
          </div>
          <WalletConnect />
        </div>
      </div>
    );
  }

  const isActive = userData?.totalProfit ? userData.totalProfit > 0 : false;

  return (
    <DashboardLayout 
      isActive={isActive}
      isLoading={isLoading}
    />
  );
};

export default Dashboard;
