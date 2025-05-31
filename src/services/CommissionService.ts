
import { Upline, CommissionResult } from './CommissionTypes';
import { 
  distributeCommission, 
  calculateCommissionAmounts 
} from './CommissionDistributionService';
import { MEMEMOON_RANK_PERCENTAGES } from './MLMCommissionService';

/**
 * Process commission distribution for a specific trade profit using MemeMoon Flow logic
 * @param uplines Chain of upline members sorted from closest to furthest
 * @param profitAmount Total profit amount in SOL
 * @returns Detailed distribution information 
 */
export function processTradeCommission(uplines: Upline[], profitAmount: number): CommissionResult {
  // Calculate performance fee (30% of profit)
  const performanceFee = profitAmount * 0.3;
  
  // Calculate master trader fee (10% of profit) 
  const masterTraderFee = profitAmount * 0.1;
  
  // Calculate network fee (20% of profit) - this is what gets distributed
  const networkFee = profitAmount * 0.2;
  
  // Calculate remaining profit after fees (70% of profit)
  const remainingProfit = profitAmount - performanceFee;
  
  // Calculate distribution percentages using the differential system
  const distribution = distributeCommission(uplines);
  
  // Calculate actual SOL amounts based on the original profit amount
  // Note: We calculate based on total profit, not just the network fee
  const commissionAmounts = calculateCommissionAmounts(distribution, profitAmount);
  
  // Calculate total distributed (should equal networkFee if all ranks present)
  const totalDistributed = Object.values(commissionAmounts).reduce((sum, amount) => sum + amount, 0);
  
  return {
    profitAmount,
    performanceFee,
    masterTraderFee,
    networkFee,
    remainingProfit,
    distribution,
    commissionAmounts,
    totalDistributed
  };
}

// Re-export everything needed from the service
export { MEMEMOON_RANK_PERCENTAGES as rankCommissionPercentages } from './MLMCommissionService';
export { distributeCommission, calculateCommissionAmounts } from './CommissionDistributionService';
export type { Rank, Upline, CommissionDistribution, CommissionResult } from './CommissionTypes';
