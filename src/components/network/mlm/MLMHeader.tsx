
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const MLMHeader: React.FC = () => {
  return (
    <header className="border-b border-white/10 backdrop-blur-xl bg-black/80">
      <div className="container mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-300 hover:bg-white/10 hover:text-white rounded-2xl font-medium transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500 to-gray-700 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-gray-500 to-gray-700 p-2 rounded-2xl shadow-lg">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-light text-white tracking-tight">Matriz Unilevel</h1>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <Badge 
              variant="outline" 
              className="relative border-emerald-400/30 text-emerald-400 bg-emerald-400/10 backdrop-blur-sm rounded-2xl px-6 py-3 font-medium shadow-lg"
            >
              Sistema VastCopy
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MLMHeader;
