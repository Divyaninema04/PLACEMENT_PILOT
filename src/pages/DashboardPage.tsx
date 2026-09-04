import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowRight, BookOpen, CalendarDays, FileText, Map, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, Empty, Loading, PageHeader } from '../components/ui'
import { getAcademics, getProfile, getTasks } from '../lib/data'
import { useAuth } from '../lib/auth'
import type { AcademicRecord, Profile, Task } from '../lib/types'

const today = () => new Date().toLocaleDateString('en-CA')
export function DashboardPage() {
  const { user } = useAuth(); const [profile, setProfile] = useState<Profile | null | undefined>(undefined); const [records, setRecords] = useState<AcademicRecord[] | undefined>(); const [tasks, setTasks] = useState<Task[] | undefined>()
  useEffect(() => { if (!user) return; getProfile(user.id).then(setProfile); getAcademics(user.id).then(setRecords); getTasks(user.id).then(setTasks) }, [user])
  if (profile === undefined || !records || !tasks) return <Loading />
  const completedProfile = profile ? [profile.full_name, profile.college, profile.branch, profile.graduation_year, profile.current_semester, profile.skills.length, profile.career_interests.length, profile.career_goals].filter(Boolean).length : 0
  const percentage = Math.round((completedProfile / 8) * 100); const todays = tasks.filter(t => t.due_date === today()); const latest = records[records.length - 1]
  return <div className="page"><PageHeader eyebrow="YOUR CAREER WORKSPACE" title={profile?.full_name ? `Welcome back, ${profile.full_name.split(' ')[0]}` : 'Welcome to PlacementPilot'}><Link className="text-link" to="/profile">Complete profile <ArrowRight size={16} /></Link></PageHeader><section className="stat-grid"><Stat icon={<UserRound />} label="Profile completion" value={profile ? `${percentage}%` : 'Not started'} detail={profile ? `${completedProfile} of 8 key details added` : 'Add your real details to begin'} to="/profile" /><Stat icon={<BookOpen />} label="Academic progress" value={latest?.cgpa != null ? `CGPA ${latest.cgpa}` : 'No record'} detail={latest ? `Latest: semester ${latest.semester}` : 'Add an academic record'} to="/academics" /><Stat icon={<CalendarDays />} label="Today’s tasks" value={todays.length ? `${todays.filter(t => t.is_completed).length}/${todays.length}` : 'No tasks'} detail={todays.length ? 'completed today' : 'Plan your day when ready'} to="/planner" /><Stat icon={<FileText />} label="Resume completion" value="Coming next" detail="Resume tools are on the way" /></section><div className="dashboard-grid"><Card title="Today’s focus" action={<Link className="text-link" to="/planner">Open planner <ArrowRight size={16} /></Link>}>{todays.length ? <ul className="simple-list">{todays.map(t => <li key={t.id}><span className={t.is_completed ? 'check checked' : 'check'} /> <span className={t.is_completed ? 'strike' : ''}>{t.title}</span><small>{t.priority}</small></li>)}</ul> : <Empty title="No tasks scheduled for today" text="Use the planner to add a task when you’re ready." />}</Card><Card title="Career roadmap"><div className="roadmap"><Map size={25} /><div><strong>Coming in Phase 2</strong><p>Your roadmap will use your own profile, academic record, and completed tasks—never invented information.</p></div></div></Card></div></div>
}
function Stat({ icon, label, value, detail, to }: { icon: ReactNode; label: string; value: string; detail: string; to?: string }) { const content = <><span className="stat-icon">{icon}</span><p>{label}</p><strong>{value}</strong><small>{detail}</small></>; return to ? <Link to={to} className="stat-card">{content}</Link> : <div className="stat-card">{content}</div> }
