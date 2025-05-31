
import React from 'react';
import { Rank } from '@/services/CommissionTypes';
import { MEMEMOON_RANK_REQUIREMENTS } from '@/services/MLMCommissionService';

interface RankRequirementsTableProps {
  rankRequirements?: Record<Rank, { sol: number, linesWithRank: Rank | null }>;
}

const RankRequirementsTable: React.FC<RankRequirementsTableProps> = () => {
  return (
    <div>
      <h3 className="text-white font-semibold mb-3">Requisitos de Ranking</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-gray-400 py-3 px-4">Rank</th>
              <th className="text-left text-gray-400 py-3 px-4">Volume de Lucro (SOL)</th>
              <th className="text-left text-gray-400 py-3 px-4">Estrutura Necessária</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(MEMEMOON_RANK_REQUIREMENTS).map(([rank, req]) => (
              <tr key={rank} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 px-4">
                  <div className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full w-fit">
                    {rank}
                  </div>
                </td>
                <td className="py-3 px-4 text-white">
                  {req.volume > 0 ? `${req.volume.toLocaleString()} SOL` : '—'}
                </td>
                <td className="py-3 px-4 text-white text-sm">
                  {req.structure}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankRequirementsTable;
