
import { supabase } from "@/integrations/supabase/client";
import { processFollowerTrade } from "./TradeProcessorService";

/**
 * Replicates a trade from a master trader to all active followers
 */
export async function replicateTrade(masterTrade: {
  token: string;
  operation: 'buy' | 'sell';
  amount: number; // in SOL
  entryPrice: number;
  exitPrice: number;
  masterTotalCapital: number;
}): Promise<void> {
  try {
    console.log(`Replicating ${masterTrade.operation} trade for ${masterTrade.token} at ${masterTrade.entryPrice}...`);
    
    // Calculate profit per unit
    const profitPerUnit = masterTrade.exitPrice - masterTrade.entryPrice;
    console.log(`Profit per unit: ${profitPerUnit.toFixed(4)}`);
    
    // Get all active bot trading settings
    const { data: botSettings, error: settingsError } = await supabase
      .from('copy_settings')
      .select('user_id, trader_address, allocated_capital_sol')
      .eq('is_active', true);
      
    if (settingsError) {
      console.error("Error fetching bot trading settings:", settingsError);
      return;
    }
    
    console.log(`Found ${botSettings?.length || 0} active bot trading settings`);
    
    if (!botSettings || botSettings.length === 0) {
      console.log("No active bot trading settings found. Creating a test follower for demonstration.");
      
      // Create a test follower for demonstration purposes
      const testFollowers = [
        { user_id: "test-user-1", trader_address: "test-trader", allocated_capital_sol: 2.5 },
        { user_id: "test-user-2", trader_address: "test-trader", allocated_capital_sol: 5.0 }
      ];
      
      console.log(`Created ${testFollowers.length} test followers for demonstration`);
      
      // Process each test follower
      for (const testFollower of testFollowers) {
        await processFollowerTrade(testFollower, masterTrade, profitPerUnit);
      }
      
      return;
    }
    
    // Process each follower
    for (const settings of botSettings) {
      await processFollowerTrade(settings, masterTrade, profitPerUnit);
    }
    
    console.log("Trade replication complete");
  } catch (error) {
    console.error("Error in replicateTrade:", error);
    throw error; // Re-throw to allow UI to handle it
  }
}

// Re-export needed functions from other modules
export { calculateProportionalAmount } from './TradeCalculationService';
export { getMockUplines } from './TradeProcessorService';
