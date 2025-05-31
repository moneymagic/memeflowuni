
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Infinity } from 'lucide-react';

interface MLMStatsCardsProps {
  stats?: {
    totalMembers: number;
    activeMembers: number;
    totalVolume: number;
    averageRank: number;
    directReferrals: number;
  };
  networkStats?: {
    totalMembers: number;
    totalVolume: number;
    averageRank: number;
    directReferrals: number;
    totalCommissions: number;
    monthlyCommissions: number;
    networkDepth: string;
    activeMembers: number;
  };
}

const MLMStatsCards: React.FC<MLMStatsCardsProps> = ({ stats, networkStats }) => {
  // Use networkStats if provided, otherwise fall back to stats
  const displayStats = networkStats ? {
    totalMembers: networkStats.totalMembers,
    activeMembers: networkStats.activeMembers,
    totalVolume: networkStats.totalVolume,
    averageRank: networkStats.averageRank,
    directReferrals: networkStats.directReferrals
  } : stats || {
    totalMembers: 0,
    activeMembers: 0,
    totalVolume: 0,
    averageRank: 0,
    directReferrals: 0
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {/* Total Members Card */}
      <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10"></div>
        <CardContent className="relative p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-white/60 text-sm font-medium tracking-wide uppercase">Total Members</p>
              <p className="text-4xl font-light text-white tracking-tight">{displayStats.totalMembers.toLocaleString()}</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-emerald-400 text-sm font-medium">+12% this month</span>
              </div>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Users className="h-7 w-7 text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Volume Card */}
      <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10"></div>
        <CardContent className="relative p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-white/60 text-sm font-medium tracking-wide uppercase">Total Volume</p>
              <p className="text-4xl font-light text-white tracking-tight">{displayStats.totalVolume.toLocaleString()} SOL</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-emerald-400 text-sm font-medium">+8.5% this month</span>
              </div>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <TrendingUp className="h-7 w-7 text-emerald-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Depth Card */}
      <Card className="relative overflow-hidden bg-white/5 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-600/10"></div>
        <CardContent className="relative p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <p className="text-white/60 text-sm font-medium tracking-wide uppercase">Network Depth</p>
              <p className="text-4xl font-light text-white tracking-tight">∞ levels</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span className="text-violet-400 text-sm font-medium">{displayStats.activeMembers} active</span>
              </div>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <Infinity className="h-7 w-7 text-violet-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MLMStatsCards;
