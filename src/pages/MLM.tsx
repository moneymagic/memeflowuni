
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import MLMStatsCards from "@/components/network/mlm/MLMStatsCards";
import MLMMainContent from "@/components/network/mlm/MLMMainContent";
import ReferralCard from "@/components/network/mlm/ReferralCard";
import NetworkVisualizationCard from "@/components/network/mlm/NetworkVisualizationCard";
import CommissionCard from "@/components/network/mlm/CommissionCard";
import TopPerformers from "@/components/network/mlm/TopPerformers";
import { useToast } from "@/components/ui/use-toast";
import { rankCommissionPercentages } from "@/services/RankService";

const MLM = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("overview");
  
  const [networkStats, setNetworkStats] = useState({
    totalMembers: 165,
    activeMembers: 98,
    totalVolume: 1289.5,
    averageRank: 2.3,
    directReferrals: 8
  });

  const topPerformers = [
    {
      name: "user123.sol",
      level: 2,
      earnings: "5.23 SOL",
      referrals: 12
    },
    {
      name: "crypto_whale.sol",
      level: 1,
      earnings: "4.87 SOL",
      referrals: 8
    },
    {
      name: "blockchain_dev.sol",
      level: 3,
      earnings: "3.61 SOL",
      referrals: 6
    }
  ];

  const handleTabChange = (value: string) => {
    setTab(value);
  };

  const levels = [
    { level: 1, members: 8, commission: "10%", earnings: "1.25 SOL" },
    { level: 2, members: 23, commission: "8%", earnings: "2.18 SOL" },
    { level: 3, members: 47, commission: "6%", earnings: "3.64 SOL" },
    { level: 4, members: 87, commission: "4%", earnings: "5.12 SOL" }
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNetworkStats({
        totalMembers: 212,
        activeMembers: 150,
        totalVolume: 2100.75,
        averageRank: 2.8,
        directReferrals: 15
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch network data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-gradient-to-r from-violet-400 to-purple-500 p-3 rounded-2xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-light text-white mb-2 tracking-tight">Matriz Unilevel</h1>
                <p className="text-slate-300 font-light">Sistema avançado de comissões VastCopy</p>
              </div>
              <Badge 
                variant="outline" 
                className="border-emerald-400/50 text-emerald-400 bg-emerald-950/50 backdrop-blur-sm rounded-2xl px-4 py-2 font-medium ml-auto"
              >
                Sistema VastCopy
              </Badge>
            </div>
          </div>

          <MLMStatsCards stats={networkStats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 shadow-xl">
                <Tabs value={tab} onValueChange={handleTabChange}>
                  <TabsList className="bg-slate-700/80 backdrop-blur-sm border border-slate-600/50 rounded-2xl p-1">
                    <TabsTrigger 
                      value="overview" 
                      className="rounded-xl font-medium data-[state=active]:bg-slate-600 data-[state=active]:text-white data-[state=active]:shadow-sm text-slate-300"
                    >
                      Visão Geral
                    </TabsTrigger>
                    <TabsTrigger 
                      value="commission" 
                      className="rounded-xl font-medium data-[state=active]:bg-slate-600 data-[state=active]:text-white data-[state=active]:shadow-sm text-slate-300"
                    >
                      Comissões
                    </TabsTrigger>
                    <TabsTrigger 
                      value="compression" 
                      className="rounded-xl font-medium data-[state=active]:bg-slate-600 data-[state=active]:text-white data-[state=active]:shadow-sm text-slate-300"
                    >
                      Compressão
                    </TabsTrigger>
                  </TabsList>
                  <MLMMainContent 
                    tab={tab} 
                    rankPercentages={rankCommissionPercentages} 
                    levels={levels}
                  />
                </Tabs>
              </div>
              
              <TopPerformers topPerformers={topPerformers} />
            </div>
            
            <div className="space-y-8">
              <ReferralCard directReferrals={networkStats.directReferrals} />
              <NetworkVisualizationCard />
              <CommissionCard monthlyCommissions={890} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MLM;
