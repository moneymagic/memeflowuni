
import React from "react";
import Layout from "@/components/Layout";
import DashboardBalance from "./DashboardBalance";
import DashboardContent from "./DashboardContent";

interface DashboardLayoutProps {
  isActive: boolean;
  isLoading: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  isActive,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full animate-pulse mx-auto mb-4"></div>
                <p className="text-gray-300 font-light">Carregando dashboard...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Dashboard</h1>
            <p className="text-gray-300 font-light">Acompanhe seus investimentos e ganhos</p>
          </div>

          {/* Saldo e métricas */}
          <DashboardBalance />

          {/* Dashboard Content */}
          <DashboardContent isActive={isActive} />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardLayout;
