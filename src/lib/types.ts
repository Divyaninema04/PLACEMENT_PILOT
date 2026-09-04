export type Profile = { id: string; full_name: string | null; avatar_url: string | null; college: string | null; branch: string | null; graduation_year: number | null; current_semester: number | null; skills: string[]; career_interests: string[]; career_goals: string | null }
export type AcademicRecord = { id: string; semester: number; sgpa: number | null; cgpa: number | null }
export type Subject = { id: string; semester: number; name: string; marks: number | null; completion: number }
export type Task = { id: string; title: string; description: string | null; due_date: string; priority: 'low' | 'medium' | 'high'; is_completed: boolean }
