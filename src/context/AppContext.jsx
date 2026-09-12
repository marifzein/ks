import { createContext, useContext, useState } from 'react'
import {
  members as seedMembers,
  news as seedNews,
  events as seedEvents,
  registrations as seedRegistrations,
  orgStats as seedStats,
} from '../data'

const AppContext = createContext(null)

export const useApp = () => useContext(AppContext)

export function AppProvider({ children }) {
  const [members, setMembers] = useState(seedMembers)
  const [news, setNews] = useState(seedNews)
  const [events, setEvents] = useState(seedEvents)
  const [registrations, setRegistrations] = useState(seedRegistrations)
  const [stats, setStats] = useState(seedStats)
  const [session, setSession] = useState(null) // { name, role: 'member'|'pengurus'|'admin' }

  const approveRegistration = (id) => {
    const reg = registrations.find((r) => r.id === id)
    if (!reg) return null
    const nomor = `IKS.${new Date().getFullYear()}.${String(1000 + members.length + 1).slice(1)}`
    const newMember = {
      id: `mbr-${Date.now()}`,
      nomor,
      name: reg.name,
      gender: reg.gender || 'L',
      province: reg.province,
      cabang: reg.cabang,
      ranting: reg.ranting,
      jenjang: reg.jenjang || 'Anggota Muda',
      status: 'AKTIF',
      joinYear: new Date().getFullYear(),
      phone: reg.phone,
      birthDate: reg.birthDate,
      achievements: [],
      activities: [],
    }
    setMembers((m) => [newMember, ...m])
    setRegistrations((rs) => rs.map((r) => (r.id === id ? { ...r, status: 'DISETUJUI' } : r)))
    setStats((s) => ({ ...s, members: s.members + 1, activeMembers: s.activeMembers + 1, pending: Math.max(0, s.pending - 1) }))
    return newMember
  }

  const rejectRegistration = (id) => {
    setRegistrations((rs) => rs.map((r) => (r.id === id ? { ...r, status: 'DITOLAK' } : r)))
    setStats((s) => ({ ...s, pending: Math.max(0, s.pending - 1) }))
  }

  const addNews = (item) => setNews((n) => [{ ...item, id: `nws-${Date.now()}` }, ...n])
  const deleteNews = (id) => setNews((n) => n.filter((x) => x.id !== id))

  const addEvent = (item) => setEvents((e) => [{ ...item, id: `evt-${Date.now()}` }, ...e])
  const deleteEvent = (id) => setEvents((e) => e.filter((x) => x.id !== id))

  const login = (sessionData) => setSession(sessionData)
  const logout = () => setSession(null)

  const value = {
    members,
    news,
    events,
    registrations,
    stats,
    session,
    approveRegistration,
    rejectRegistration,
    addNews,
    deleteNews,
    addEvent,
    deleteEvent,
    login,
    logout,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}