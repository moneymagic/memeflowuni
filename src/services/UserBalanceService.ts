
import { supabase } from "@/integrations/supabase/client";

/**
 * Gets the wallet balance for a user by wallet address
 */
export async function getUserBalance(walletAddress: string): Promise<number> {
  try {
    console.log(`Fetching wallet balance for wallet: ${walletAddress}`);
    
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('total_profit')
      .eq('wallet_address', walletAddress)
      .single();
      
    if (userError) {
      console.error("Error fetching user data:", userError);
      return 0;
    }

    const balance = user?.total_profit || 0;
    console.log(`User balance: ${balance} SOL`);
    
    return balance;
  } catch (error) {
    console.error("Error in getUserBalance:", error);
    return 0;
  }
}

/**
 * Checks if a user is active based on their wallet address
 */
export async function isUserActive(walletAddress: string): Promise<boolean> {
  try {
    // Para Web3, consideramos que qualquer carteira conectada está ativa
    // Pode ser expandido com lógica de saldo mínimo se necessário
    return !!walletAddress;
  } catch (error) {
    console.error("Error checking user active status:", error);
    return false;
  }
}
