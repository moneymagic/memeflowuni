export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      affiliate_commissions: {
        Row: {
          affiliate_id: string
          amount: number
          copied_trade_id: string | null
          created_at: string
          id: string
          level: number
          paid: boolean | null
          percentage: number
          transaction_hash: string | null
          updated_at: string
        }
        Insert: {
          affiliate_id: string
          amount: number
          copied_trade_id?: string | null
          created_at?: string
          id?: string
          level: number
          paid?: boolean | null
          percentage: number
          transaction_hash?: string | null
          updated_at?: string
        }
        Update: {
          affiliate_id?: string
          amount?: number
          copied_trade_id?: string | null
          created_at?: string
          id?: string
          level?: number
          paid?: boolean | null
          percentage?: number
          transaction_hash?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "affiliate_commissions_affiliate_id_fkey"
            columns: ["affiliate_id"]
            isOneToOne: false
            referencedRelation: "affiliates"
            referencedColumns: ["id"]
          },
        ]
      }
      affiliates: {
        Row: {
          created_at: string
          current_ranking: number | null
          direct_referrals_count: number | null
          id: string
          max_rank_available: number | null
          personal_profit: number | null
          rank: number | null
          rank_qualified_referrals: Json | null
          referral_code: string
          sponsor_id: string | null
          total_earnings: number | null
          total_network_profit: number | null
          total_referrals: number | null
          updated_at: string
          user_id: string
          volume_network: number | null
          volume_personal: number | null
        }
        Insert: {
          created_at?: string
          current_ranking?: number | null
          direct_referrals_count?: number | null
          id?: string
          max_rank_available?: number | null
          personal_profit?: number | null
          rank?: number | null
          rank_qualified_referrals?: Json | null
          referral_code: string
          sponsor_id?: string | null
          total_earnings?: number | null
          total_network_profit?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id: string
          volume_network?: number | null
          volume_personal?: number | null
        }
        Update: {
          created_at?: string
          current_ranking?: number | null
          direct_referrals_count?: number | null
          id?: string
          max_rank_available?: number | null
          personal_profit?: number | null
          rank?: number | null
          rank_qualified_referrals?: Json | null
          referral_code?: string
          sponsor_id?: string | null
          total_earnings?: number | null
          total_network_profit?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id?: string
          volume_network?: number | null
          volume_personal?: number | null
        }
        Relationships: []
      }
      commission_distributions: {
        Row: {
          amount_sol: number
          copy_trade_id: string
          created_at: string | null
          id: string
          percentage: number
          rank_differential: number
          recipient_user_id: string
        }
        Insert: {
          amount_sol: number
          copy_trade_id: string
          created_at?: string | null
          id?: string
          percentage: number
          rank_differential: number
          recipient_user_id: string
        }
        Update: {
          amount_sol?: number
          copy_trade_id?: string
          created_at?: string | null
          id?: string
          percentage?: number
          rank_differential?: number
          recipient_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commission_distributions_copy_trade_id_fkey"
            columns: ["copy_trade_id"]
            isOneToOne: false
            referencedRelation: "copy_trades"
            referencedColumns: ["id"]
          },
        ]
      }
      commissions: {
        Row: {
          amount: number
          created_at: string | null
          from_wallet_address: string | null
          id: string
          type: string | null
          wallet_address: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          from_wallet_address?: string | null
          id?: string
          type?: string | null
          wallet_address?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          from_wallet_address?: string | null
          id?: string
          type?: string | null
          wallet_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_from_wallet_address_fkey"
            columns: ["from_wallet_address"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
          {
            foreignKeyName: "commissions_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      copy_settings: {
        Row: {
          allocated_capital_sol: number
          created_at: string
          id: string
          is_active: boolean
          trader_address: string
          updated_at: string
          user_id: string
        }
        Insert: {
          allocated_capital_sol?: number
          created_at?: string
          id?: string
          is_active?: boolean
          trader_address: string
          updated_at?: string
          user_id: string
        }
        Update: {
          allocated_capital_sol?: number
          created_at?: string
          id?: string
          is_active?: boolean
          trader_address?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      copy_trades: {
        Row: {
          entry_price: number
          exit_price: number
          fee_paid_sol: number
          id: string
          is_successful: boolean | null
          profit_sol: number
          timestamp: string
          token_symbol: string
          trader_address: string
          user_id: string
        }
        Insert: {
          entry_price: number
          exit_price: number
          fee_paid_sol: number
          id?: string
          is_successful?: boolean | null
          profit_sol: number
          timestamp?: string
          token_symbol: string
          trader_address: string
          user_id: string
        }
        Update: {
          entry_price?: number
          exit_price?: number
          fee_paid_sol?: number
          id?: string
          is_successful?: boolean | null
          profit_sol?: number
          timestamp?: string
          token_symbol?: string
          trader_address?: string
          user_id?: string
        }
        Relationships: []
      }
      network: {
        Row: {
          created_at: string | null
          id: string
          linha: number | null
          upline_wallet_address: string | null
          wallet_address: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          linha?: number | null
          upline_wallet_address?: string | null
          wallet_address?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          linha?: number | null
          upline_wallet_address?: string | null
          wallet_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "network_upline_wallet_address_fkey"
            columns: ["upline_wallet_address"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
          {
            foreignKeyName: "network_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          updated_at: string
          username: string | null
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id: string
          updated_at?: string
          username?: string | null
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          updated_at?: string
          username?: string | null
          wallet_address?: string | null
        }
        Relationships: []
      }
      rank_requirements: {
        Row: {
          bonus_percentage: number
          created_at: string
          direct_referrals_required: number
          id: string
          rank: number
          rank_name: string
          same_rank_referrals_required: number
          updated_at: string
          volume_required: number
        }
        Insert: {
          bonus_percentage?: number
          created_at?: string
          direct_referrals_required: number
          id?: string
          rank: number
          rank_name: string
          same_rank_referrals_required: number
          updated_at?: string
          volume_required: number
        }
        Update: {
          bonus_percentage?: number
          created_at?: string
          direct_referrals_required?: number
          id?: string
          rank?: number
          rank_name?: string
          same_rank_referrals_required?: number
          updated_at?: string
          volume_required?: number
        }
        Relationships: []
      }
      ranking_progress: {
        Row: {
          created_at: string | null
          from_rank: number
          id: string
          timestamp: string | null
          to_rank: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          from_rank: number
          id?: string
          timestamp?: string | null
          to_rank: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          from_rank?: number
          id?: string
          timestamp?: string | null
          to_rank?: number
          user_id?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          admin_wallet_address: string
          affiliate_fee_percentage: number | null
          created_at: string
          id: string
          level_1_percentage: number | null
          level_2_percentage: number | null
          level_3_percentage: number | null
          level_4_percentage: number | null
          level_5_percentage: number | null
          level_6_percentage: number | null
          level_7_percentage: number | null
          level_8_percentage: number | null
          master_trader_fee_percentage: number | null
          min_active_balance: number | null
          min_maintenance_balance: number | null
          platform_fee_percentage: number | null
          updated_at: string
        }
        Insert: {
          admin_wallet_address: string
          affiliate_fee_percentage?: number | null
          created_at?: string
          id?: string
          level_1_percentage?: number | null
          level_2_percentage?: number | null
          level_3_percentage?: number | null
          level_4_percentage?: number | null
          level_5_percentage?: number | null
          level_6_percentage?: number | null
          level_7_percentage?: number | null
          level_8_percentage?: number | null
          master_trader_fee_percentage?: number | null
          min_active_balance?: number | null
          min_maintenance_balance?: number | null
          platform_fee_percentage?: number | null
          updated_at?: string
        }
        Update: {
          admin_wallet_address?: string
          affiliate_fee_percentage?: number | null
          created_at?: string
          id?: string
          level_1_percentage?: number | null
          level_2_percentage?: number | null
          level_3_percentage?: number | null
          level_4_percentage?: number | null
          level_5_percentage?: number | null
          level_6_percentage?: number | null
          level_7_percentage?: number | null
          level_8_percentage?: number | null
          master_trader_fee_percentage?: number | null
          min_active_balance?: number | null
          min_maintenance_balance?: number | null
          platform_fee_percentage?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      trades: {
        Row: {
          entry_price: number | null
          exit_price: number | null
          id: string
          profit: number
          timestamp: string | null
          token_symbol: string | null
          wallet_address: string | null
        }
        Insert: {
          entry_price?: number | null
          exit_price?: number | null
          id?: string
          profit: number
          timestamp?: string | null
          token_symbol?: string | null
          wallet_address?: string | null
        }
        Update: {
          entry_price?: number | null
          exit_price?: number | null
          id?: string
          profit?: number
          timestamp?: string | null
          token_symbol?: string | null
          wallet_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trades_wallet_address_fkey"
            columns: ["wallet_address"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["wallet_address"]
          },
        ]
      }
      transactions: {
        Row: {
          amount_sol: number
          created_at: string
          description: string | null
          id: string
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Insert: {
          amount_sol: number
          created_at?: string
          description?: string | null
          id?: string
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
        }
        Update: {
          amount_sol?: number
          created_at?: string
          description?: string | null
          id?: string
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
        }
        Relationships: []
      }
      uplines: {
        Row: {
          created_at: string | null
          id: number
          updated_at: string | null
          upline_id: string | null
          upline_position: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          upline_id?: string | null
          upline_position?: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          updated_at?: string | null
          upline_id?: string | null
          upline_position?: number
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          current_ranking: number | null
          total_profit: number | null
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          current_ranking?: number | null
          total_profit?: number | null
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          current_ranking?: number | null
          total_profit?: number | null
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance_sol: number
          deposit_address: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance_sol?: number
          deposit_address?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance_sol?: number
          deposit_address?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_commission_distribution: {
        Args: { profit_amount_param: number; follower_user_id_param: string }
        Returns: {
          upline_id: string
          commission_amount: number
          percentage_earned: number
        }[]
      }
      calculate_qualified_referrals: {
        Args: { user_id_param: string; target_rank: number }
        Returns: number
      }
      calculate_user_rank: {
        Args: { user_id_param: string }
        Returns: number
      }
      check_rank_upgrade: {
        Args: { user_id_param: string }
        Returns: number
      }
      checkrankingupgrade: {
        Args: { user_id_param: string } | { wallet_address_param: string }
        Returns: {
          can_upgrade: boolean
          next_rank: number
          requirements_met: boolean
        }[]
      }
      deposit_sol: {
        Args: { p_user_id: string; p_amount: number; p_description?: string }
        Returns: boolean
      }
      distribute_affiliate_commissions: {
        Args: {
          copied_trade_id_param: string
          profit_amount_param: number
          follower_user_id_param: string
        }
        Returns: undefined
      }
      distribute_trade_commissions: {
        Args: {
          copy_trade_id_param: string
          profit_amount_param: number
          follower_user_id_param: string
        }
        Returns: Json
      }
      get_upline_chain: {
        Args: { user_id_param: string }
        Returns: {
          upline_id: string
          rank: number
          upline_position: number
        }[]
      }
      getcommissionshistory: {
        Args: { user_id_param: string } | { wallet_address_param: string }
        Returns: {
          id: string
          from_wallet_address: string
          amount: number
          type: string
          created_at: string
        }[]
      }
      getnetworktree: {
        Args: { user_id_param: string } | { wallet_address_param: string }
        Returns: {
          wallet_address: string
          current_ranking: number
          total_profit: number
          linha: number
          join_date: string
        }[]
      }
      getuserrankingstats: {
        Args: { user_id_param: string } | { wallet_address_param: string }
        Returns: {
          current_rank: number
          total_profit: number
          network_size: number
          direct_referrals: number
        }[]
      }
      getwalletbalance: {
        Args: { user_id_param: string } | { wallet_address_param: string }
        Returns: {
          total_profit: number
          today_profit: number
          commission_earnings: number
        }[]
      }
      is_user_active: {
        Args: { user_id_param: string }
        Returns: boolean
      }
      process_trading_fee: {
        Args: {
          p_user_id: string
          p_trader_address: string
          p_token_symbol: string
          p_entry_price: number
          p_exit_price: number
          p_profit_sol: number
        }
        Returns: Json
      }
      update_affiliate_metrics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      transaction_type: "deposit" | "fee" | "refund"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      transaction_type: ["deposit", "fee", "refund"],
    },
  },
} as const
