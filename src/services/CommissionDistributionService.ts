
import { Upline, CommissionDistribution } from './CommissionTypes';
import { MEMEMOON_RANK_PERCENTAGES } from './MLMCommissionService';

/**
 * Distributes commission across a chain of uplines based on rank difference logic
 * Uses the MemeMoon Flow differential system where each upline receives the 
 * difference between their percentage and the percentage of the upline below them.
 * 
 * @param uplines Array of upline members sorted from closest to furthest
 * @returns Object mapping user IDs to their commission percentages
 */
export function distributeCommission(uplines: Upline[]): CommissionDistribution {
  const distribution: CommissionDistribution = {};
  let totalDistributed = 0;
  
  // Initialize all uplines with 0% commission
  uplines.forEach(upline => {
    distribution[upline.id] = 0;
  });

  // If no uplines, all 20% goes to memeflow
  if (uplines.length === 0) {
    distribution['memeflow'] = 20;
    return distribution;
  }

  // Start with the first upline (closest to the follower)
  let previousPercentage = 0;
  
  // Process each upline in the chain
  for (let i = 0; i < uplines.length; i++) {
    const upline = uplines[i];
    const currentMaxPercentage = getMaxPercentageForRank(upline.rank);
    
    // Calculate the difference between current and previous percentage
    const differencePercentage = currentMaxPercentage - previousPercentage;
    
    // Only assign commission if there's a positive difference
    if (differencePercentage > 0) {
      distribution[upline.id] = differencePercentage;
      totalDistributed += differencePercentage;
      previousPercentage = currentMaxPercentage;
      
      // If we've reached the maximum (20%), stop processing
      if (previousPercentage >= 20) {
        break;
      }
    }
    // If difference is 0 or negative, this upline gets nothing
  }
  
  // Calculate residual amount and assign it to memeflow platform
  const residual = 20 - totalDistributed;
  if (residual > 0) {
    distribution['memeflow'] = residual;
  }

  return distribution;
}

/**
 * Get the maximum percentage for a given rank using MemeMoon Flow rules
 */
function getMaxPercentageForRank(rank: string | null): number {
  if (!rank) return 0;
  return MEMEMOON_RANK_PERCENTAGES[rank as keyof typeof MEMEMOON_RANK_PERCENTAGES] || 0;
}

/**
 * Calculates the actual SOL amount each upline receives based on the distribution percentages
 * @param distribution Commission distribution percentages
 * @param totalProfit Total profit amount in SOL
 * @returns Object mapping user IDs to their commission amounts in SOL
 */
export function calculateCommissionAmounts(
  distribution: CommissionDistribution, 
  totalProfit: number
): Record<string, number> {
  const result: Record<string, number> = {};
  
  Object.entries(distribution).forEach(([userId, percentage]) => {
    // Convert percentage to decimal and multiply by total profit
    result[userId] = (percentage / 100) * totalProfit;
  });
  
  return result;
}
