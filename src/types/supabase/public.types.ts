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
      application: {
        Row: {
          created_at: string
          id: string
          invitation_date: string | null
          is_reviewed: boolean
          last_updated: string
          phase_status: Database["public"]["Enums"]["phase"]
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application status"] | null
          testiv_date: string | null
          testiv_mark: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          invitation_date?: string | null
          is_reviewed?: boolean
          last_updated: string
          phase_status?: Database["public"]["Enums"]["phase"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application status"] | null
          testiv_date?: string | null
          testiv_mark?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          invitation_date?: string | null
          is_reviewed?: boolean
          last_updated?: string
          phase_status?: Database["public"]["Enums"]["phase"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application status"] | null
          testiv_date?: string | null
          testiv_mark?: number | null
        }
        Relationships: []
      }
      class_posts: {
        Row: {
          author_id: string
          bucket_id: string | null
          class: string
          content: string
          created_at: string
          id: string
          images_id: string[] | null
          images_path: string[] | null
          status: Database["public"]["Enums"]["post status"]
          title: string
        }
        Insert: {
          author_id: string
          bucket_id?: string | null
          class: string
          content: string
          created_at?: string
          id?: string
          images_id?: string[] | null
          images_path?: string[] | null
          status?: Database["public"]["Enums"]["post status"]
          title: string
        }
        Update: {
          author_id?: string
          bucket_id?: string | null
          class?: string
          content?: string
          created_at?: string
          id?: string
          images_id?: string[] | null
          images_path?: string[] | null
          status?: Database["public"]["Enums"]["post status"]
          title?: string
        }
        Relationships: []
      }
      father: {
        Row: {
          created_at: string
          home_address: string
          id: string
          income: number
          name: string
          nationality: string
          occupation: string
          office_address: string
          office_phone_number: string
          phone_number: string
          race: string
        }
        Insert: {
          created_at?: string
          home_address: string
          id?: string
          income: number
          name: string
          nationality: string
          occupation: string
          office_address: string
          office_phone_number: string
          phone_number: string
          race: string
        }
        Update: {
          created_at?: string
          home_address?: string
          id?: string
          income?: number
          name?: string
          nationality?: string
          occupation?: string
          office_address?: string
          office_phone_number?: string
          phone_number?: string
          race?: string
        }
        Relationships: []
      }
      mother: {
        Row: {
          created_at: string
          home_address: string
          id: string
          income: number
          name: string
          nationality: string
          occupation: string
          office_address: string
          office_phone_number: string
          phone_number: string
          race: string
        }
        Insert: {
          created_at?: string
          home_address: string
          id?: string
          income: number
          name: string
          nationality: string
          occupation: string
          office_address: string
          office_phone_number: string
          phone_number: string
          race: string
        }
        Update: {
          created_at?: string
          home_address?: string
          id?: string
          income?: number
          name?: string
          nationality?: string
          occupation?: string
          office_address?: string
          office_phone_number?: string
          phone_number?: string
          race?: string
        }
        Relationships: []
      }
      school_posts: {
        Row: {
          author_id: string
          bucket_id: string | null
          content: string
          created_at: string
          id: string
          images_id: string[] | null
          images_path: string[] | null
          title: string
        }
        Insert: {
          author_id: string
          bucket_id?: string | null
          content: string
          created_at?: string
          id?: string
          images_id?: string[] | null
          images_path?: string[] | null
          title: string
        }
        Update: {
          author_id?: string
          bucket_id?: string | null
          content?: string
          created_at?: string
          id?: string
          images_id?: string[] | null
          images_path?: string[] | null
          title?: string
        }
        Relationships: []
      }
      student: {
        Row: {
          application_id: string | null
          birth_cert_number: string
          created_at: string
          dob: string
          gender: string
          id: string
          kindergarten_name: string
          name: string
          nationality: string
          place_of_birth: string
          primary_school_name: string
          primary_school_session: string
          requested_class: string
          requested_school: string
          requested_year: number
        }
        Insert: {
          application_id?: string | null
          birth_cert_number: string
          created_at?: string
          dob: string
          gender: string
          id?: string
          kindergarten_name: string
          name: string
          nationality: string
          place_of_birth: string
          primary_school_name: string
          primary_school_session: string
          requested_class: string
          requested_school: string
          requested_year: number
        }
        Update: {
          application_id?: string | null
          birth_cert_number?: string
          created_at?: string
          dob?: string
          gender?: string
          id?: string
          kindergarten_name?: string
          name?: string
          nationality?: string
          place_of_birth?: string
          primary_school_name?: string
          primary_school_session?: string
          requested_class?: string
          requested_school?: string
          requested_year?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      "application status": "pending" | "accepted" | "rejected"
      phase: "1" | "2" | "3" | "4"
      "post status": "approved" | "pending" | "rejected" | "remark"
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
      "application status": ["pending", "accepted", "rejected"],
      phase: ["1", "2", "3", "4"],
      "post status": ["approved", "pending", "rejected", "remark"],
    },
  },
} as const
