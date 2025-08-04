import type { AuthBindings } from "@refinedev/core"
import { supabaseClient } from "@/utility/supabaseClient"

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        error,
      }
    }

    if (data?.user) {
      return {
        success: true,
        redirectTo: "/",
      }
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    }
  },

  register: async ({ email, password, fullName, role = "patient" }) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    })

    if (error) {
      return {
        success: false,
        error,
      }
    }

    if (data?.user) {
      // Create profile
      const { error: profileError } = await supabaseClient.from("profiles").insert({
        id: data.user.id,
        email,
        full_name: fullName,
        role,
      })

      if (profileError) {
        return {
          success: false,
          error: profileError,
        }
      }

      return {
        success: true,
        redirectTo: "/",
      }
    }

    return {
      success: false,
      error: {
        message: "Registration failed",
        name: "Registration failed",
      },
    }
  },

  logout: async () => {
    const { error } = await supabaseClient.auth.signOut()

    if (error) {
      return {
        success: false,
        error,
      }
    }

    return {
      success: true,
      redirectTo: "/login",
    }
  },

  check: async () => {
    const { data } = await supabaseClient.auth.getSession()
    const { session } = data

    if (session) {
      return {
        authenticated: true,
      }
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    }
  },

  getPermissions: async () => {
    const { data } = await supabaseClient.auth.getUser()

    if (data?.user) {
      const { data: profile } = await supabaseClient.from("profiles").select("role").eq("id", data.user.id).single()

      return profile?.role
    }

    return null
  },

  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser()

    if (data?.user) {
      const { data: profile } = await supabaseClient.from("profiles").select("*").eq("id", data.user.id).single()

      return {
        id: data.user.id,
        name: profile?.full_name,
        email: profile?.email,
        avatar: data.user.user_metadata?.avatar_url,
        role: profile?.role,
      }
    }

    return null
  },
}
