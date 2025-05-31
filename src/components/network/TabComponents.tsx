
import React from "react";
import NetworkStats from "./NetworkStats";
import DownlineStats from "./DownlineStats";

interface TabComponentsProps {
  activeTab: string;
  stats: {
    totalMembers: number;
    totalVolume: number;
    directReferrals: number;
    totalCommissions: number;
    monthlyCommissions: number;
    activeMembers: number;
  };
  downlineStats: {
    totalMembers: number;
    activeMembers: number;
    inactiveMembers: number;
    directDownlines: number;
    currentDownlines: number;
    currentDirect: number;
  };
  teamMembers: {
    id: string;
    username: string;
    joinDate: string;
    teamSize: number;
    rank?: number;
  }[];
}

const TabComponents: React.FC<TabComponentsProps> = ({
  activeTab,
}) => {
  switch (activeTab) {
    case "downline":
      return (
        <>
          <NetworkStats />
          <DownlineStats />
        </>
      );
    case "commissions":
      return (
        <>
          <NetworkStats />
          <div className="text-center py-12">
            <p className="text-gray-400">Detalhes de comissões em breve...</p>
          </div>
        </>
      );
    default:
      return (
        <>
          <NetworkStats />
          <DownlineStats />
        </>
      );
  }
};

export default TabComponents;
