
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider } from '@/contexts/WalletContext';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import NetworkPage from './pages/NetworkPage';
import NotFound from './pages/NotFound';
import CopyTradePage from './pages/CopyTradePage';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/copy-trade" element={<CopyTradePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
