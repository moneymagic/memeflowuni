
import { getUplines } from "./UplineService";
import { updateUserWalletBalance } from "./WalletService";
import { recordCopyTrade } from "./TradeRecordService";
import { calculateProportionalAmount } from "./TradeCalculationService";
import { distributeCommission, calculateCommissionAmounts } from "./CommissionService";
import { Upline } from "./CommissionService";

interface MasterTrade {
  token: string;
  operation: 'buy' | 'sell';
  amount: number;
  entryPrice: number;
  exitPrice: number;
  masterTotalCapital: number;
}

interface FollowerSettings {
  user_id: string;
  trader_address: string;
  allocated_capital_sol: number;
}

/**
 * Gets mock uplines for testing the commission distribution
 */
export function getMockUplines(userId: string): Upline[] {
  // Generate 8 mock uplines with different ranks for testing
  return [
    { id: "upline1", rank: "V3" },
    { id: "upline2", rank: "V1" },
    { id: "upline3", rank: "V5" },
    { id: "upline4", rank: "V2" },
    { id: "upline5", rank: "V8" },
    { id: "upline6", rank: null },
    { id: "upline7", rank: "V6" },
    { id: "upline8", rank: "V4" },
  ];
}

/**
 * Simulates getting real uplines from the user's network
 */
async function getUserUplines(userId: string): Promise<Upline[]> {
  try {
    // Get the real uplines from the database
    const uplines = await getUplines(userId);
    
    // If no uplines found, return empty array
    if (!uplines || uplines.length === 0) {
      console.log(`No uplines found for user ${userId}, using mock data`);
      return getMockUplines(userId);
    }
    
    return uplines;
  } catch (error) {
    console.error("Error retrieving user uplines:", error);
    return [];
  }
}

/**
 * Process a follower's trade
 */
export async function processFollowerTrade(
  follower: FollowerSettings,
  masterTrade: MasterTrade,
  profitPerUnit: number
): Promise<{ success: boolean, tradeId?: string, error?: any }> {
  console.log(`Processing follower ${follower.user_id} with ${follower.allocated_capital_sol} SOL allocated`);
  
  // Calculate proportional amount for this follower
  const userAmount = calculateProportionalAmount(
    masterTrade.amount,
    masterTrade.masterTotalCapital,
    follower.allocated_capital_sol
  );
  
  console.log(`Proportional trade amount: ${userAmount.toFixed(4)} SOL`);
  
  // Simulate trade execution - In a real implementation, this would call Jupiter API
  // START JUPITER INTEGRATION POINT
  // Here we would add the actual Jupiter swap integration:
  // const jupiterResult = await jupiterSwap({
  //   inputToken: ...,
  //   outputToken: ...,
  //   amount: userAmount,
  //   slippage: 1, // 1%
  // });
  // END JUPITER INTEGRATION POINT
  
  // Calculate profit (for now, just using the master's profit ratio)
  const userProfit = userAmount * (profitPerUnit / masterTrade.entryPrice);
  console.log(`Calculated profit: ${userProfit.toFixed(4)} SOL`);
  
  // If profit is negative or zero, skip fee calculation
  if (userProfit <= 0) {
    console.log(`No profit for user ${follower.user_id}, skipping fee calculation`);
    
    // Still record the trade with zero fee
    await recordCopyTrade(
      follower.user_id,
      follower.trader_address,
      masterTrade.token,
      masterTrade.entryPrice,
      masterTrade.exitPrice,
      userProfit,
      0,
      true
    );
    return { success: true };
  }
  
  // Calculate performance fee (30% of profit)
  const performanceFee = userProfit * 0.3;
  const masterFee = userProfit * 0.1; // 10% to master trader
  const networkFee = userProfit * 0.2; // 20% to network
  
  console.log(`Performance fee: ${performanceFee.toFixed(4)} SOL (Master: ${masterFee.toFixed(4)} SOL, Network: ${networkFee.toFixed(4)} SOL)`);
  
  // Get user's uplines for commission distribution
  const uplines = await getUserUplines(follower.user_id);
  console.log(`Retrieved ${uplines.length} uplines for user ${follower.user_id}`);
  
  // Calculate commission distribution with compression
  const distribution = distributeCommission(uplines);
  console.log("Commission distribution:", distribution);
  
  // Calculate actual SOL amounts
  const commissionAmounts = calculateCommissionAmounts(distribution, userProfit);
  console.log("Commission amounts (SOL):", commissionAmounts);
  
  // Add a summary of commission distribution
  const totalCommission = Object.values(commissionAmounts).reduce((sum, val) => sum + val, 0);
  console.log(`Total commission distributed: ${totalCommission.toFixed(4)} SOL`);
  
  try {
    // Update user's wallet balance
    const walletUpdate = await updateUserWalletBalance(follower.user_id, performanceFee);
  
    if (!walletUpdate.success) {
      console.log(walletUpdate.message);
    
      // Record the failed trade
      await recordCopyTrade(
        follower.user_id,
        follower.trader_address,
        masterTrade.token,
        masterTrade.entryPrice,
        masterTrade.exitPrice,
        userProfit,
        0, // No fee paid
        false // Not successful
      );
      return { success: false, error: walletUpdate.message };
    }
  
    // Record the successful trade
    const tradeId = await recordCopyTrade(
      follower.user_id,
      follower.trader_address,
      masterTrade.token,
      masterTrade.entryPrice,
      masterTrade.exitPrice,
      userProfit,
      performanceFee, // Full fee paid
      true // Successful
    );
  
    console.log(`Trade recorded with ID: ${tradeId || 'unknown'}`);
  
    // In a real implementation, we would distribute the commissions to the uplines
    // This would involve updating their wallet balances
  
    console.log(`Processed bot trade for user ${follower.user_id} successfully`);
    return { success: true, tradeId };
  } catch (error) {
    console.error(`Error processing trade for user ${follower.user_id}:`, error);
    return { success: false, error };
  }
}
