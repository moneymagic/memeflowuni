
import React from "react";
import Layout from "@/components/Layout";
import WalletConnect from "@/components/WalletConnect";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Network, Shield, Zap, Infinity, Play, Sparkles, TrendingUp } from "lucide-react";

const Index = () => {
  const { isConnected } = useWallet();

  const features = [
    {
      icon: Bot,
      title: "IA Trading Automatizado",
      description: "Algoritmos avançados de machine learning que operam 24/7 para maximizar seus retornos no mercado de criptomoedas.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Network,
      title: "Sistema Multinível V1-V8",
      description: "Construa sua rede e escale seus ganhos com um sistema de comissões transparente e verificável on-chain.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Transparência Blockchain",
      description: "Cada transação e comissão registrada permanentemente na Solana para auditabilidade completa.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Zap,
      title: "Acesso Instantâneo Web3",
      description: "Conecte sua Phantom Wallet e comece imediatamente. Zero burocracia, máxima segurança.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Conecte sua carteira",
      description: "Use Phantom ou qualquer carteira Solana compatível",
      icon: "🔗"
    },
    {
      number: "02", 
      title: "Configure estratégias de IA",
      description: "Personalize o bot conforme seu perfil de risco",
      icon: "🧠"
    },
    {
      number: "03",
      title: "Monitore resultados",
      description: "Acompanhe lucros e comissões em tempo real",
      icon: "📊"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Hero Section with Enhanced Visual Impact */}
        <section className="relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="relative max-w-7xl mx-auto px-8 py-40">
            <div className="text-center">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 mb-12">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <span className="text-sm font-medium text-white/90">Powered by Solana Blockchain</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              
              {/* Main Title */}
              <h1 className="text-8xl md:text-9xl font-extralight text-white mb-8 tracking-tighter leading-[0.85]">
                <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  MemeMoon
                </span>
                <br />
                <span className="font-light bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Flow
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-purple-200 mb-6 font-extralight max-w-4xl mx-auto leading-relaxed">
                A primeira plataforma de trading com IA
              </p>
              <p className="text-xl md:text-2xl text-purple-300 mb-16 font-extralight max-w-3xl mx-auto">
                e marketing multinível completamente descentralizada
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative">
                    <WalletConnect />
                  </div>
                </div>
                
                {isConnected && (
                  <a href="/dashboard">
                    <Button className="bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 px-10 py-6 rounded-3xl font-light text-lg flex items-center gap-3 transition-all duration-300">
                      Acessar Dashboard
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </a>
                )}
              </div>

              {/* Stats Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-light text-purple-400 mb-2">24/7</div>
                  <div className="text-purple-300 text-sm">Trading Automatizado</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-blue-400 mb-2">V1-V8</div>
                  <div className="text-purple-300 text-sm">Níveis de Comissão</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-light text-emerald-400 mb-2">100%</div>
                  <div className="text-purple-300 text-sm">Transparente</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Demo Section with Enhanced Styling */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent"></div>
          <div className="relative max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-extralight text-white mb-6">
                Veja o poder da
                <br />
                <span className="font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  IA em ação
                </span>
              </h2>
              <p className="text-xl text-purple-200 font-light">
                Trading automatizado gerando resultados reais
              </p>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden aspect-video flex items-center justify-center border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
                
                {/* Play Button */}
                <div className="relative group/play">
                  <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl opacity-0 group-hover/play:opacity-100 transition duration-300"></div>
                  <Button className="relative bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white border border-white/20 w-24 h-24 rounded-full transition-all duration-300 group-hover/play:scale-110">
                    <Play className="w-10 h-10 ml-1" />
                  </Button>
                </div>
                
                {/* Video Info */}
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-purple-200">Demo em tempo real</span>
                  </div>
                  <h3 className="text-2xl font-light">IA executando trades automaticamente</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with Enhanced Cards */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-extralight text-white mb-8">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Tecnologia que
                </span>
                <br />
                <span className="font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  revoluciona
                </span>
              </h2>
              <p className="text-xl text-purple-200 font-light max-w-2xl mx-auto">
                A convergência perfeita entre inteligência artificial e blockchain
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden">
                  <CardContent className="p-10 relative">
                    {/* Background Gradient */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className="mb-8">
                        <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-${feature.gradient.split(' ')[1]}/20`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-purple-200 text-lg font-extralight leading-relaxed group-hover:text-purple-100 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-6xl md:text-7xl font-extralight text-white mb-8">
                <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Simples.
                </span>
                <br />
                <span className="font-light bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Revolucionário.
                </span>
              </h2>
              <p className="text-xl text-purple-200 font-light max-w-2xl mx-auto">
                Três passos para transformar sua carteira em uma máquina de lucros
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-16">
              {steps.map((step, index) => (
                <div key={index} className="text-center group relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 right-0 transform translate-x-8 z-0">
                      <div className="w-16 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div className="mb-8">
                      {/* Step Number with Enhanced Styling */}
                      <div className="text-8xl font-extralight text-transparent bg-gradient-to-br from-purple-500/40 to-blue-500/40 bg-clip-text mb-4 group-hover:from-purple-400/60 group-hover:to-blue-400/60 transition-all duration-500">
                        {step.number}
                      </div>
                      
                      {/* Step Icon */}
                      <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                      
                      <h3 className="text-2xl font-light text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-purple-200 text-lg font-extralight group-hover:text-purple-100 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent"></div>
          
          <div className="relative max-w-5xl mx-auto px-8 text-center">
            <h2 className="text-6xl md:text-7xl font-extralight text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Pronto para
              </span>
              <br />
              <span className="font-light bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                transformar
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                seu futuro?
              </span>
            </h2>
            
            <p className="text-xl text-purple-200 font-light mb-16 max-w-3xl mx-auto leading-relaxed">
              Junte-se aos traders que escolheram a descentralização,<br />
              a inteligência artificial e o crescimento exponencial
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <WalletConnect />
                </div>
              </div>
              
              <Button variant="outline" className="border-white/20 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30 px-10 py-6 rounded-3xl font-light text-lg transition-all duration-300">
                Explorar Documentação
              </Button>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-20 border-t border-white/10 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-8 sm:mb-0">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg">
                  <Infinity className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-extralight text-white">MemeMoon Flow</span>
              </div>
              
              <div className="text-center sm:text-right">
                <p className="text-purple-200 text-sm mb-2">
                  © 2024 MemeMoon Flow. Powered by Solana blockchain.
                </p>
                <p className="text-purple-300 text-xs">
                  Construído para o futuro descentralizado
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Index;
