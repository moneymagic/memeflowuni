
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Network, TrendingUp, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: TrendingUp },
    { path: '/network', label: 'Network', icon: Network },
    { path: '/copy-trade', label: 'Trading', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Enhanced Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-xl font-light text-white tracking-tight group-hover:text-gray-200 transition-colors duration-300">
                memeflow
              </span>
            </div>

            {/* Enhanced Navigation Items */}
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative group flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 overflow-hidden ${
                      active
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {/* Background for active state */}
                    {active && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/80 to-gray-800/80 rounded-2xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl blur opacity-75"></div>
                      </>
                    )}
                    
                    {/* Background for hover state */}
                    {!active && (
                      <div className="absolute inset-0 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                    
                    <div className="relative z-10 flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;
