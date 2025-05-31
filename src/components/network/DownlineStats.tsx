
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Users } from 'lucide-react';
import { useWalletData } from '@/hooks/useWalletData';
import { supabase } from "@/integrations/supabase/client";
import { useWallet } from '@/contexts/WalletContext';

interface TeamMember {
  id: string;
  username: string;
  joinDate: string;
  teamSize: number;
  rank?: number;
  walletAddress: string;
  totalProfit: number;
}

interface RankIconProps {
  rank?: number;
}

const RankIcon: React.FC<RankIconProps> = ({ rank }) => {
  if (!rank) return null;
  
  return (
    <span className="inline-flex items-center justify-center ml-1">
      <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </span>
  );
};

const DownlineStats: React.FC = () => {
  const { networkData, isLoading } = useWalletData();
  const { walletAddress } = useWallet();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!walletAddress) return;
      
      try {
        setLoadingMembers(true);
        const { data, error } = await supabase.rpc('getnetworktree', {
          wallet_address_param: walletAddress
        });

        if (error) {
          console.error('Erro ao buscar membros da equipe:', error);
          return;
        }

        const members: TeamMember[] = (data || []).slice(0, 10).map((member: any, index: number) => ({
          id: member.wallet_address || `member-${index}`,
          username: `${member.wallet_address?.slice(0, 6)}...${member.wallet_address?.slice(-4)}` || 'Unknown',
          joinDate: new Date(member.join_date || Date.now()).toLocaleDateString('pt-BR'),
          teamSize: Math.floor(Math.random() * 50), // Placeholder - can be expanded with real logic
          rank: member.current_ranking || 1,
          walletAddress: member.wallet_address || '',
          totalProfit: member.total_profit || 0
        }));

        setTeamMembers(members);
      } catch (error) {
        console.error('Erro ao buscar membros:', error);
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchTeamMembers();
  }, [walletAddress]);

  // Utility function to format numbers
  const formatNumber = (num: number): string => {
    return num.toLocaleString('pt-BR');
  };

  const stats = {
    totalMembers: networkData?.totalMembers || 0,
    activeMembers: networkData?.activeMembers || 0,
    inactiveMembers: networkData?.inactiveMembers || 0,
    directDownlines: 0, // Placeholder
    currentDownlines: networkData?.totalMembers || 0,
    currentDirect: teamMembers.filter(member => member.rank === 1).length || 0
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-blue-600/30 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-600/30 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-blue-600/30 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Team Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-white">{formatNumber(stats.totalMembers)} <span className="text-sm font-normal text-white/70">people</span></p>
              <div className="text-sm text-white/70 mt-4">
                <p>Activated yesterday</p>
                <p>0 people</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-600/30 border-white/10 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Cumulative Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <p className="text-3xl font-bold text-white">{formatNumber(networkData?.cumulativeProfit || 0)} <span className="text-sm font-normal text-white/70">SOL</span></p>
              <div className="text-sm text-white/70 mt-4">
                <p>Profit for today</p>
                <p>{networkData?.todayProfit || 0} SOL</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Global Team</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Direct downlines</span>
              </div>
              <p className="text-2xl font-bold text-white">{stats.currentDirect}</p>
              <p className="text-gray-400 text-xs">pessoas conectadas diretamente</p>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg text-center">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Team count</span>
              </div>
              <p className="text-2xl font-bold text-white">{formatNumber(stats.currentDownlines)}</p>
              <p className="text-gray-400 text-xs">total da rede</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-black/30 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center">
            <span>Direct Downline</span>
            <ChevronDown className="ml-2 h-5 w-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50/10 rounded-lg p-4 mb-6">
            <p className="text-gray-300 text-sm">
              Data is counted once per hour and is counted daily
              according to Singapore time (UTC + 8).
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-white font-bold text-xl">{stats.activeMembers} people</p>
                <p className="text-gray-300">Activated</p>
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-xl">{stats.inactiveMembers} people</p>
                <p className="text-gray-300">Deactivated</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mt-8 mb-4">
              <h3 className="text-white text-lg font-medium">Direct downline details</h3>
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                All
              </Button>
            </div>

            {loadingMembers ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse border-b border-white/10 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-gray-700 rounded-full h-10 w-10 mr-3"></div>
                        <div>
                          <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                          <div className="h-3 bg-gray-300 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
                        <div className="h-4 bg-gray-300 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {teamMembers.length > 0 ? teamMembers.map((member) => (
                  <div key={member.id} className="border-b border-white/10 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-gray-700 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-gray-300" />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {member.username}
                            <RankIcon rank={member.rank} />
                          </p>
                          <p className="text-gray-400 text-sm">{member.joinDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300">Team count:</p>
                        <p className="text-white">{member.teamSize}</p>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>Nenhum membro direto encontrado</p>
                    <p className="text-sm mt-2">Seus referidos diretos aparecerão aqui</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DownlineStats;
