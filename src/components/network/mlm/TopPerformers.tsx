
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TopPerformersProps {
  topPerformers: { name: string; level: number; earnings: string; referrals: number; }[];
}

const TopPerformers: React.FC<TopPerformersProps> = ({ topPerformers }) => {
  return (
    <Card className="bg-slate-800/90 border-slate-700/50 backdrop-blur-sm mt-6 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Top Performers</CardTitle>
        <p className="text-slate-300">Members generating the most commissions in your network</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPerformers.map((performer, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/30">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 p-2 rounded-full">
                  <span className="text-white text-xs font-bold">#{index + 1}</span>
                </div>
                <div>
                  <p className="text-white font-medium font-mono">{performer.name}</p>
                  <p className="text-slate-300 text-sm">Level {performer.level} • {performer.referrals} referrals</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-bold">{performer.earnings}</p>
                <p className="text-slate-300 text-sm">this month</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
