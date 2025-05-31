
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp } from 'lucide-react';
import { useWalletData } from '@/hooks/useWalletData';

const NetworkStats: React.FC = () => {
  const { networkData, isLoading } = useWalletData();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalMembers = networkData?.totalMembers || 0;
  const totalVolume = networkData?.totalVolume || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-white mt-1">{totalMembers}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Volume</p>
              <p className="text-2xl font-bold text-white mt-1">{totalVolume.toFixed(2)} SOL</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkStats;
