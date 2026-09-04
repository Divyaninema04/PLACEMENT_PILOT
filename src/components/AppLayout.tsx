import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BarChart3, BookOpen, Building2, CalendarDays, Compass, FileText, LayoutDashboard, LogOut, Menu, Network, UserRound, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../lib/auth'

const active = ({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active' : ''}`
const nav = [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }, { to: '/academics', label: 'Academics', icon: BookOpen }, { to: '/planner', label: 'Planner', icon: CalendarDays }]
const next = [{ label: 'Career Roadmap', icon: Compass }, { label: 'Resume', icon: FileText }, { label: 'Companies', icon: Building2 }, { label: 'Alumni Connect', icon: Network }, { label: 'Analytics', icon: BarChart3 }]
export function AppLayout() {
  const [open, setOpen] = useState(false); const { signOut, user } = useAuth(); const navigate = useNavigate()
  const logout = async () => { await signOut(); navigate('/login', { replace: true }) }
  return <div className="app-shell"><aside className={`sidebar ${open ? 'open' : ''}`}><div className="sidebar-top"><NavLink className="brand" to="/dashboard"><span className="brand-mark">P</span><span>PlacementPilot</span></NavLink><button className="icon-button mobile-only" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div><nav>{nav.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={active} onClick={() => setOpen(false)}><Icon size={19} />{label}</NavLink>)}<p className="nav-caption">Coming next</p>{next.map(({ label, icon: Icon }) => <div className="nav-link muted" key={label}><Icon size={19} />{label}<span className="soon">Soon</span></div>)}<NavLink to="/profile" className={active} onClick={() => setOpen(false)}><UserRound size={19} />Profile</NavLink></nav><div className="sidebar-bottom"><div className="user-mini"><span>{user?.email?.charAt(0).toUpperCase()}</span><p>{user?.email}</p></div><button className="logout" onClick={logout}><LogOut size={18} />Log out</button></div></aside>{open && <div className="scrim" onClick={() => setOpen(false)} />}<main><div className="mobile-bar"><button className="icon-button" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button><span className="brand-mark">P</span></div><Outlet /></main></div>
}
