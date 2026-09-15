'use server'; 

import { supabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient, createSupabaseServerClientReadOnly } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { validateFormData } from "../auth/safeAction";
import { ActionResponse } from "../types";
import { loginSchema } from "../validations/login.validations";

export async function logout() {

  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()

  // Clear session and send user somewhere safe
  redirect("/login")
}




export type FormState = { success: boolean, error: string | null }


export const login = async (_: any, formData: FormData): Promise<ActionResponse<{ user: string }>> => {
    const validated = validateFormData(loginSchema, formData)
    const supabase = createSupabaseServerClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    })
    
    if (error) throw new Error('supabase error thrown')
    
    // 💡 FIX: Removed 'error: null' and added 'as const' to strictly match the expected type
    return {
      success: true,
      data: { user: 'test'}
    } as const;
}


export async function etest(
  _: any, 
  formData: FormData
) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { success: false, error: 'missing credentials'}
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message}
  }

  return { success: true, error: null}

}


export async function inviteAdmin(email: string) {
  
  // 1️⃣ Invite the user (creates auth user + sends invite email)
  const { data: inviteData, error: inviteError } =
    await supabaseAdminClient.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/welcome`,
      data: {
        role: 'admin',
      },
    });

  if (inviteError) throw new Error(inviteError.message);
  if (!inviteData.user) throw new Error('No user returned');

  return { user: inviteData.user };

}

export async function getCurrentUser() {
  const supabase = createSupabaseServerClientReadOnly()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    if (error.name === 'AuthSessionMissingError') {
      return null
    }
    throw new Error(error.message)
  }
  
  return user
}


export async function signup(
  _: any, // Changed to any to match your ActionForm parameter rules safely
  formData: FormData
): Promise<ActionResponse<unknown>> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = formData.get('role') as string

  if (!email || !password || !role) {
    return { success: false, error: 'missing credentials' } as const;
  }

  // 💡 FIX: Create a safe origin URL because 'location' does not exist on the server
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        role,
        full_name: fullName
      },
    },
  })

  if (error) {
    return { success: false, error: error.message } as const;
  }

  // 💡 FIX: Removed 'error: null' and added 'data: null' to match the ActionResponse format
  return { 
    success: true, 
    data: null 
  } as const;
}