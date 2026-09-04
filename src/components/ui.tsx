import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { LoaderCircle } from 'lucide-react'

export function Button({ children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={`button ${className}`} {...props}>{children}</button> }
export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) { return <input className={`input ${className}`} {...props} /> }
export function Card({ title, children, action }: { title?: string; children: ReactNode; action?: ReactNode }) { return <section className="card">{title && <div className="card-title"><h2>{title}</h2>{action}</div>}{children}</section> }
export function Loading() { return <div className="loading"><LoaderCircle className="spin" /> Loading your workspace…</div> }
export function Empty({ title, text }: { title: string; text: string }) { return <div className="empty"><strong>{title}</strong><span>{text}</span></div> }
export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) { return <header className="page-header"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1></div>{children}</header> }
