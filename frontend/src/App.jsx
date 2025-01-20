import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout"
import ModalProvider from "./context/ModalContext"
import { Analytics } from '@vercel/analytics/react'
import AdminLogin from './pages/AdminLogin'
import FeatureFlagsPanel from './components/admin/FeatureFlagsPanel'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/features" element={<FeatureFlagsPanel />} />
        </Routes>
        <Analytics />
      </ModalProvider>
    </BrowserRouter>
  );
}

export default App;
