export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          capabilities: Json
          created_at: string
          decision_scope: string[]
          decisions_processed: number | null
          department: string | null
          dqs_score: number | null
          failure_rate: number | null
          forecast_accuracy: number | null
          id: string
          instruction_layer: string
          name: string
          objective: string | null
          org_id: string
          risk_boundaries: Json
          risk_exposure: string | null
          roi_contribution: string | null
          role: string | null
          status: string
          success_rate: number | null
          updated_at: string
        }
        Insert: {
          capabilities?: Json
          created_at?: string
          decision_scope?: string[]
          decisions_processed?: number | null
          department?: string | null
          dqs_score?: number | null
          failure_rate?: number | null
          forecast_accuracy?: number | null
          id?: string
          instruction_layer?: string
          name: string
          objective?: string | null
          org_id: string
          risk_boundaries?: Json
          risk_exposure?: string | null
          roi_contribution?: string | null
          role?: string | null
          status?: string
          success_rate?: number | null
          updated_at?: string
        }
        Update: {
          capabilities?: Json
          created_at?: string
          decision_scope?: string[]
          decisions_processed?: number | null
          department?: string | null
          dqs_score?: number | null
          failure_rate?: number | null
          forecast_accuracy?: number | null
          id?: string
          instruction_layer?: string
          name?: string
          objective?: string | null
          org_id?: string
          risk_boundaries?: Json
          risk_exposure?: string | null
          roi_contribution?: string | null
          role?: string | null
          status?: string
          success_rate?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agents_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      assumptions: {
        Row: {
          created_at: string
          decision_id: string
          id: string
          impact_weight: number
          org_id: string
          owner_id: string | null
          status: string
          text: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          decision_id: string
          id?: string
          impact_weight?: number
          org_id: string
          owner_id?: string | null
          status?: string
          text: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          decision_id?: string
          id?: string
          impact_weight?: number
          org_id?: string
          owner_id?: string | null
          status?: string
          text?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assumptions_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "decisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assumptions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assumptions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json
          id: string
          ip_address: string | null
          org_id: string
          resource: string | null
          resource_type: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          ip_address?: string | null
          org_id: string
          resource?: string | null
          resource_type?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          id?: string
          ip_address?: string | null
          org_id?: string
          resource?: string | null
          resource_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      decision_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          decision_id: string
          details: Json
          id: string
          org_id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          decision_id: string
          details?: Json
          id?: string
          org_id: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          decision_id?: string
          details?: Json
          id?: string
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "decision_logs_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_logs_decision_id_fkey"
            columns: ["decision_id"]
            isOneToOne: false
            referencedRelation: "decisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_logs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      decisions: {
        Row: {
          category: string | null
          created_at: string
          description: string
          diw: number
          dqs: number
          expected_outcome: string | null
          financial_exposure: number | null
          id: string
          org_id: string
          owner_id: string | null
          owner_type: string
          reasoning: string | null
          reversibility_index: number | null
          risk_level: string | null
          status: string
          strategic_intent: string | null
          time_horizon: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string
          diw?: number
          dqs?: number
          expected_outcome?: string | null
          financial_exposure?: number | null
          id?: string
          org_id: string
          owner_id?: string | null
          owner_type?: string
          reasoning?: string | null
          reversibility_index?: number | null
          risk_level?: string | null
          status?: string
          strategic_intent?: string | null
          time_horizon?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string
          diw?: number
          dqs?: number
          expected_outcome?: string | null
          financial_exposure?: number | null
          id?: string
          org_id?: string
          owner_id?: string | null
          owner_type?: string
          reasoning?: string | null
          reversibility_index?: number | null
          risk_level?: string | null
          status?: string
          strategic_intent?: string | null
          time_horizon?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "decisions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decisions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          id: string
          linked_decisions: number | null
          name: string
          org_id: string
          processing_status: string
          size: string | null
          storage_path: string | null
          type: string | null
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          linked_decisions?: number | null
          name: string
          org_id: string
          processing_status?: string
          size?: string | null
          storage_path?: string | null
          type?: string | null
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          linked_decisions?: number | null
          name?: string
          org_id?: string
          processing_status?: string
          size?: string | null
          storage_path?: string | null
          type?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprise_leads: {
        Row: {
          company: string
          created_at: string
          email: string
          id: string
          name: string
          role: string | null
          size: string | null
          status: string
          use_case: string | null
        }
        Insert: {
          company: string
          created_at?: string
          email: string
          id?: string
          name: string
          role?: string | null
          size?: string | null
          status?: string
          use_case?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: string | null
          size?: string | null
          status?: string
          use_case?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          actor_avatar: string | null
          actor_name: string | null
          created_at: string
          id: string
          message: string
          org_id: string | null
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          actor_avatar?: string | null
          actor_name?: string | null
          created_at?: string
          id?: string
          message?: string
          org_id?: string | null
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          actor_avatar?: string | null
          actor_name?: string | null
          created_at?: string
          id?: string
          message?: string
          org_id?: string | null
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      org_members: {
        Row: {
          created_at: string
          id: string
          org_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          org_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          org_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          config: Json
          created_at: string
          id: string
          industry: string | null
          name: string
          size: string | null
          stage: string | null
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          industry?: string | null
          name: string
          size?: string | null
          stage?: string | null
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          industry?: string | null
          name?: string
          size?: string | null
          stage?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      simulations: {
        Row: {
          config: Json
          created_at: string
          description: string
          id: string
          linked_decisions: number | null
          org_id: string
          outcome_count: number | null
          probability: number | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          description?: string
          id?: string
          linked_decisions?: number | null
          org_id: string
          outcome_count?: number | null
          probability?: number | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          description?: string
          id?: string
          linked_decisions?: number | null
          org_id?: string
          outcome_count?: number | null
          probability?: number | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          id: string
          org_id: string
          plan: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          org_id: string
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          org_id?: string
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: true
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          onboarding_completed: boolean
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          onboarding_completed?: boolean
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          onboarding_completed?: boolean
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_onboarding: {
        Args: {
          p_user_id: string
          p_org_id: string
          p_plan?: string
          p_payment_success?: boolean
        }
        Returns: undefined
      }
      create_first_decision: {
        Args: {
          p_org_id: string
          p_user_id: string
          p_title: string
          p_strategic_intent: string
          p_expected_outcome: string
          p_assumptions: string[]
        }
        Returns: string
      }
      is_org_admin: { Args: { check_org_id: string }; Returns: boolean }
      is_org_member: { Args: { check_org_id: string }; Returns: boolean }
      setup_organization: {
        Args: {
          p_user_id: string
          p_org_name: string
          p_industry?: string
          p_size?: string
          p_stage?: string
          p_plan?: string
        }
        Returns: string
      }
      update_org_config: {
        Args: { p_org_id: string; p_config_patch: Json }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never
