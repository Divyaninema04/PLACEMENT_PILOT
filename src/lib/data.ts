import { supabase } from './supabase'
import type { AcademicRecord, Profile, Subject, Task } from './types'

function client() { if (!supabase) throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.') ; return supabase }
function databaseError(error: { message: string }) { if (/failed to fetch|network/i.test(error.message)) return new Error('Could not reach Supabase. Check your internet connection and try again.'); return new Error(`Could not save or load your data: ${error.message}`) }
export async function getProfile(userId: string) { const { data, error } = await client().from('profiles').select('*').eq('id', userId).maybeSingle(); if (error) throw databaseError(error); return data as Profile | null }
export async function saveProfile(profile: Profile) { const { error } = await client().from('profiles').upsert(profile); if (error) throw databaseError(error) }
export async function getAcademics(userId: string) { const { data, error } = await client().from('academic_records').select('*').eq('user_id', userId).order('semester'); if (error) throw databaseError(error); return (data ?? []) as AcademicRecord[] }
export async function saveAcademic(userId: string, values: { semester: number; sgpa: number | null; cgpa: number | null }) { const { error } = await client().from('academic_records').upsert({ user_id: userId, ...values }, { onConflict: 'user_id,semester' }); if (error) throw databaseError(error) }
export async function getSubjects(userId: string) { const { data, error } = await client().from('subjects').select('*').eq('user_id', userId).order('semester').order('created_at'); if (error) throw databaseError(error); return (data ?? []) as Subject[] }
export async function addSubject(userId: string, values: Omit<Subject, 'id'>) { const { error } = await client().from('subjects').insert({ user_id: userId, ...values }); if (error) throw databaseError(error) }
export async function getTasks(userId: string) { const { data, error } = await client().from('tasks').select('*').eq('user_id', userId).order('due_date'); if (error) throw databaseError(error); return (data ?? []) as Task[] }
export async function addTask(userId: string, values: Omit<Task, 'id' | 'is_completed'>) { const { error } = await client().from('tasks').insert({ user_id: userId, ...values }); if (error) throw databaseError(error) }
export async function toggleTask(id: string, is_completed: boolean) { const { error } = await client().from('tasks').update({ is_completed }).eq('id', id); if (error) throw databaseError(error) }
