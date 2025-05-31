
import { supabase } from "@/integrations/supabase/client";
import { getUserBalance } from "./UserBalanceService";

export interface WalletUserData {
  walletAddress: string;
  userId?: string;
  totalProfit: number;
  todayProfit: number;
  commissionEarnings: number;
  currentRank: number;
  networkSize: number;
  directReferrals: number;
}

export interface CopyTradeData {
  allocatedCapital: number;
  isActive: boolean;
  totalTrades: number;
  successfulTrades: number;
  todayReturn: number;
  successRate: number;
}

export interface NetworkData {
  totalMembers: number;
  totalVolume: number;
  activeMembers: number;
  inactiveMembers: number;
  cumulativeProfit: number;
  todayProfit: number;
}

export interface TradeHistoryItem {
  id: string;
  tokenSymbol: string;
  entryPrice: number;
  exitPrice: number;
  profitSol: number;
  timestamp: Date;
  isSuccessful: boolean;
}

/**
 * Busca ou cria um usuário no banco baseado no endereço da carteira
 */
export async function ensureUserExists(walletAddress: string): Promise<string | null> {
  try {
    // Primeiro verifica se o usuário já existe
    let { data: existingUser, error } = await supabase
      .from('users')
      .select('wallet_address')
      .eq('wallet_address', walletAddress)
      .single();

    if (!existingUser && !error) {
      // Se não existe, cria o usuário
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{
          wallet_address: walletAddress,
          total_profit: 0,
          current_ranking: 1
        }])
        .select('wallet_address')
        .single();

      if (insertError) {
        console.error('Erro ao criar usuário:', insertError);
        return null;
      }
      
      existingUser = newUser;
    }

    return existingUser?.wallet_address || null;
  } catch (error) {
    console.error('Erro ao garantir existência do usuário:', error);
    return null;
  }
}

/**
 * Busca dados completos do usuário conectado
 */
export async function getWalletUserData(walletAddress: string): Promise<WalletUserData | null> {
  try {
    await ensureUserExists(walletAddress);

    const { data, error } = await supabase.rpc('getwalletbalance', {
      wallet_address_param: walletAddress
    });

    if (error) {
      console.error('Erro ao buscar dados da carteira:', error);
      return null;
    }

    const balanceData = data?.[0];
    
    // Buscar dados de ranking
    const { data: rankData, error: rankError } = await supabase.rpc('getuserrankingstats', {
      wallet_address_param: walletAddress
    });

    const rankingData = rankData?.[0];

    return {
      walletAddress,
      totalProfit: balanceData?.total_profit || 0,
      todayProfit: balanceData?.today_profit || 0,
      commissionEarnings: balanceData?.commission_earnings || 0,
      currentRank: rankingData?.current_rank || 1,
      networkSize: rankingData?.network_size || 0,
      directReferrals: rankingData?.direct_referrals || 0
    };
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return null;
  }
}

/**
 * Busca dados de copy trading do usuário
 */
export async function getCopyTradeData(walletAddress: string): Promise<CopyTradeData | null> {
  try {
    await ensureUserExists(walletAddress);

    // Buscar configurações de copy trade
    const { data: settings, error: settingsError } = await supabase
      .from('copy_settings')
      .select('allocated_capital_sol, is_active')
      .eq('user_id', walletAddress)
      .single();

    // Buscar histórico de trades
    const { data: trades, error: tradesError } = await supabase
      .from('copy_trades')
      .select('*')
      .eq('user_id', walletAddress);

    if (settingsError && settingsError.code !== 'PGRST116') {
      console.error('Erro ao buscar configurações:', settingsError);
    }

    if (tradesError) {
      console.error('Erro ao buscar trades:', tradesError);
    }

    const totalTrades = trades?.length || 0;
    const successfulTrades = trades?.filter(trade => trade.is_successful).length || 0;
    const todayTrades = trades?.filter(trade => {
      const tradeDate = new Date(trade.timestamp).toDateString();
      const today = new Date().toDateString();
      return tradeDate === today;
    }) || [];

    const todayProfit = todayTrades.reduce((sum, trade) => sum + (trade.profit_sol || 0), 0);
    const successRate = totalTrades > 0 ? (successfulTrades / totalTrades) * 100 : 0;

    return {
      allocatedCapital: settings?.allocated_capital_sol || 0,
      isActive: settings?.is_active || false,
      totalTrades,
      successfulTrades,
      todayReturn: todayProfit,
      successRate
    };
  } catch (error) {
    console.error('Erro ao buscar dados de copy trade:', error);
    return null;
  }
}

/**
 * Busca dados da rede do usuário
 */
export async function getNetworkData(walletAddress: string): Promise<NetworkData | null> {
  try {
    await ensureUserExists(walletAddress);

    const { data: networkTree, error } = await supabase.rpc('getnetworktree', {
      wallet_address_param: walletAddress
    });

    if (error) {
      console.error('Erro ao buscar árvore da rede:', error);
      return null;
    }

    const totalMembers = networkTree?.length || 0;
    const totalVolume = networkTree?.reduce((sum: number, member: any) => sum + (member.total_profit || 0), 0) || 0;
    
    // Para determinar ativos/inativos, vamos usar uma lógica simples baseada em atividade recente
    const activeMembers = networkTree?.filter((member: any) => member.total_profit > 0).length || 0;
    const inactiveMembers = totalMembers - activeMembers;

    // Buscar lucro cumulativo e de hoje
    const cumulativeProfit = totalVolume;
    const todayProfit = 0; // Pode ser expandido com lógica mais específica

    return {
      totalMembers,
      totalVolume,
      activeMembers,
      inactiveMembers,
      cumulativeProfit,
      todayProfit
    };
  } catch (error) {
    console.error('Erro ao buscar dados da rede:', error);
    return null;
  }
}

/**
 * Busca histórico de trades do usuário
 */
export async function getTradeHistory(walletAddress: string): Promise<TradeHistoryItem[]> {
  try {
    const { data: trades, error } = await supabase
      .from('copy_trades')
      .select('*')
      .eq('user_id', walletAddress)
      .order('timestamp', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Erro ao buscar histórico de trades:', error);
      return [];
    }

    return trades?.map(trade => ({
      id: trade.id,
      tokenSymbol: trade.token_symbol,
      entryPrice: trade.entry_price,
      exitPrice: trade.exit_price,
      profitSol: trade.profit_sol,
      timestamp: new Date(trade.timestamp),
      isSuccessful: trade.is_successful
    })) || [];
  } catch (error) {
    console.error('Erro ao buscar histórico de trades:', error);
    return [];
  }
}

/**
 * Atualiza o lucro total do usuário
 */
export async function updateUserProfit(walletAddress: string, profitAmount: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        total_profit: profitAmount,
        updated_at: new Date().toISOString()
      })
      .eq('wallet_address', walletAddress);

    if (error) {
      console.error('Erro ao atualizar lucro do usuário:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao atualizar lucro:', error);
    return false;
  }
}
