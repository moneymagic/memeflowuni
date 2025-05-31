
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  walletAddress: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signMessage: (message: string) => Promise<string | null>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Verificar se já existe uma carteira conectada
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setIsConnected(true);
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Verificar se o Phantom está instalado
      if (typeof window !== 'undefined' && 'solana' in window) {
        const solana = (window as any).solana;
        
        if (solana.isPhantom) {
          const response = await solana.connect();
          const address = response.publicKey.toString();
          
          setWalletAddress(address);
          setIsConnected(true);
          localStorage.setItem('walletAddress', address);
          
          console.log('Carteira conectada:', address);
        }
      } else {
        alert('Phantom wallet não encontrada. Por favor, instale a extensão Phantom.');
      }
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
    localStorage.removeItem('walletAddress');
    console.log('Carteira desconectada');
  };

  const signMessage = async (message: string): Promise<string | null> => {
    try {
      if (typeof window !== 'undefined' && 'solana' in window) {
        const solana = (window as any).solana;
        const encodedMessage = new TextEncoder().encode(message);
        const signedMessage = await solana.signMessage(encodedMessage);
        return signedMessage.signature.toString();
      }
      return null;
    } catch (error) {
      console.error('Erro ao assinar mensagem:', error);
      return null;
    }
  };

  return (
    <WalletContext.Provider value={{
      walletAddress,
      isConnected,
      connectWallet,
      disconnectWallet,
      signMessage
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet deve ser usado dentro de um WalletProvider');
  }
  return context;
};
