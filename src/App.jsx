import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Tentang from './pages/Tentang'
import Sejarah from './pages/Sejarah'
import Nilai from './pages/Nilai'
import Kegiatan from './pages/Kegiatan'
import Berita from './pages/Berita'
import BeritaDetail from './pages/BeritaDetail'
import Sebaran from './pages/Sebaran'
import Bergabung from './pages/Bergabung'
import Registrasi from './pages/Registrasi'
import Verifikasi from './pages/Verifikasi'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

import MemberDashboard from './pages/member/MemberDashboard'
import MemberProfile from './pages/member/MemberProfile'
import MemberCardPage from './pages/member/MemberCardPage'
import MemberDirectory from './pages/member/MemberDirectory'
import MemberDetail from './pages/member/MemberDetail'
import MemberShell from './layouts/MemberShell'

import CommandCenter from './pages/org/CommandCenter'
import OrganisasiExplorer from './pages/org/OrganisasiExplorer'
import CommandShell from './layouts/CommandShell'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminRegistrasi from './pages/admin/AdminRegistrasi'
import AdminAnggota from './pages/admin/AdminAnggota'
import AdminOrganisasi from './pages/admin/AdminOrganisasi'
import AdminKegiatan from './pages/admin/AdminKegiatan'
import AdminBerita from './pages/admin/AdminBerita'
import AdminPengaturan from './pages/admin/AdminPengaturan'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/sejarah" element={<Sejarah />} />
          <Route path="/nilai" element={<Nilai />} />
          <Route path="/kegiatan" element={<Kegiatan />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/berita/:id" element={<BeritaDetail />} />
          <Route path="/sebaran" element={<Sebaran />} />
          <Route path="/bergabung" element={<Bergabung />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route path="/verifikasi/:id" element={<Verifikasi />} />
        </Route>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        {/* MEMBER */}
        <Route path="/anggota" element={<MemberShell />}>
          <Route index element={<MemberDashboard />} />
          <Route path="profil" element={<MemberProfile />} />
          <Route path="kartu" element={<MemberCardPage />} />
          <Route path="direktori" element={<MemberDirectory />} />
          <Route path="direktori/:id" element={<MemberDetail />} />
        </Route>

        {/* ORGANIZATION */}
        <Route path="/komando" element={<CommandShell />}>
          <Route index element={<CommandCenter />} />
          <Route path="organisasi" element={<OrganisasiExplorer />} />
        </Route>

        {/* ADMIN */}
        <Route path="/admin" element={<CommandShell admin />}>
          <Route index element={<AdminDashboard />} />
          <Route path="registrasi" element={<AdminRegistrasi />} />
          <Route path="anggota" element={<AdminAnggota />} />
          <Route path="organisasi" element={<AdminOrganisasi />} />
          <Route path="kegiatan" element={<AdminKegiatan />} />
          <Route path="berita" element={<AdminBerita />} />
          <Route path="pengaturan" element={<AdminPengaturan />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}