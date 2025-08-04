import { dataProvider as supabaseDataProvider } from "@refinedev/supabase"
import { supabaseClient } from "@/utility/supabaseClient"

export const dataProvider = supabaseDataProvider(supabaseClient)
