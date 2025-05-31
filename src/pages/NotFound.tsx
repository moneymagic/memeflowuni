
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 via-transparent to-gray-900/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-600/10 via-transparent to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative text-center max-w-2xl mx-auto">
        {/* 404 Icon */}
        <div className="relative group mb-8">
          <div className="absolute -inset-4 bg-gradient-to-r from-gray-500/20 to-gray-700/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <Search className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-8xl font-extralight text-white mb-4 tracking-tighter">404</h1>
          </div>
        </div>
        
        {/* Error Message */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Página não encontrada
          </h2>
          <p className="text-xl text-gray-300 font-light max-w-lg mx-auto leading-relaxed">
            A página que você está procurando não existe ou foi movida para outro local.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <Button className="relative bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-400 hover:to-gray-600 text-white border-0 px-8 py-6 rounded-3xl font-light text-lg flex items-center gap-3 transition-all duration-300 shadow-lg">
                <Home className="w-5 h-5" />
                Ir para Home
              </Button>
            </div>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30 px-8 py-6 rounded-3xl font-light text-lg flex items-center gap-3 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Button>
        </div>
        
        {/* Additional Help */}
        <div className="mt-16 p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
          <h3 className="text-xl font-light text-white mb-4">Precisa de ajuda?</h3>
          <p className="text-gray-300 font-light mb-6">
            Se você acredita que isso é um erro, entre em contato com nosso suporte.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-300">
              Dashboard
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/network" className="text-gray-300 hover:text-white transition-colors duration-300">
              Network
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/copy-trade" className="text-gray-300 hover:text-white transition-colors duration-300">
              Trading
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
