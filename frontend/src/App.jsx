import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ChecksPage from './pages/ChecksPage'
import ComplianceResultPage from './pages/ComplianceResultPage'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'
import UploadGuidelinePage from './pages/UploadGuidelinePage'
import UploadProposalPage from './pages/UploadProposalPage'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/guidelines/create" element={<UploadGuidelinePage />} />
        <Route path="/proposals/create" element={<UploadProposalPage />} />
        <Route path="/checks" element={<ChecksPage />} />
        <Route path="/checks/result/:proposalId" element={<ComplianceResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
