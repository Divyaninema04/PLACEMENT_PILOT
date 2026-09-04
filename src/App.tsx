import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { AcademicsPage } from './pages/AcademicsPage'
import { PlannerPage } from './pages/PlannerPage'
import { ProfilePage } from './pages/ProfilePage'
import { AppLayout } from './components/AppLayout'
import { Loading } from './components/ui'
import { useAuth } from './lib/auth'
import { isSupabaseConfigured } from './lib/supabase'

function Protected() { const { user, loading } = useAuth(); if (loading) return <Loading />; return user ? <AppLayout /> : <Navigate to="/login" replace /> }
function PublicOnly() { const { user, loading } = useAuth(); if (loading) return <Loading />; return user ? <Navigate to="/dashboard" replace /> : <AuthPage /> }
function SetupNotice() { return <div className="setup"><div><span className="brand-mark">P</span><h1>Configure PlacementPilot</h1><p>Add your Supabase project URL and anon key to a local <code>.env</code> file, then restart the development server.</p><pre>VITE_SUPABASE_URL=https://your-project.supabase.co{"\n"}VITE_SUPABASE_ANON_KEY=your-anon-key</pre></div></div> }
export function App() { if (!isSupabaseConfigured) return <SetupNotice />; return <Routes><Route path="/login" element={<PublicOnly />} /><Route element={<Protected />}><Route path="/dashboard" element={<DashboardPage />} /><Route path="/academics" element={<AcademicsPage />} /><Route path="/planner" element={<PlannerPage />} /><Route path="/profile" element={<ProfilePage />} /></Route><Route path="*" element={<Navigate to="/dashboard" replace />} /></Routes> }
