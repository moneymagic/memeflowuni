
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, AlertTriangle } from 'lucide-react';

interface WithdrawAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  currentAllocation: number;
}

const WithdrawAllModal: React.FC<WithdrawAllModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentAllocation
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected } = useWallet();
  const { toast } = useToast();

  const handleWithdrawAll = async () => {
    if (!isConnected) {
      toast({
        title: "Carteira não conectada",
        description: "Conecte sua Phantom Wallet primeiro",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsProcessing(true);

      // Check if Phantom is available
      if (typeof window !== 'undefined' && 'solana' in window) {
        const solana = (window as any).solana;
        
        if (solana.isPhantom) {
          console.log(`Requesting transaction approval for withdrawing all ${currentAllocation} SOL`);
          
          // Simulate transaction delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          toast({
            title: "Retirada realizada com sucesso!",
            description: `${currentAllocation} SOL devolvido para sua carteira`,
          });
          
          onSuccess();
          onClose();
        } else {
          throw new Error('Phantom wallet not detected');
        }
      } else {
        throw new Error('Phantom wallet not installed');
      }
    } catch (error) {
      console.error('Error withdrawing all funds:', error);
      toast({
        title: "Erro na retirada",
        description: "Falha ao processar a transação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-red-400" />
            Retirar Todos os Fundos
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Tem certeza que deseja retirar toda a alocação de copy trading? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-300 mb-2">Valor a ser retirado:</p>
            <p className="text-2xl font-bold text-white">{currentAllocation} SOL</p>
          </div>

          <div className="bg-red-900/30 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-300">
                <p className="font-medium mb-1">Atenção:</p>
                <ul className="text-xs space-y-1 text-red-200">
                  <li>• Todo o capital alocado será devolvido para sua carteira</li>
                  <li>• O copy trading será automaticamente desativado</li>
                  <li>• Operações em andamento podem ser afetadas</li>
                  <li>• Você pode realocar fundos a qualquer momento</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isProcessing}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleWithdrawAll}
            disabled={isProcessing}
            className="bg-red-600 hover:bg-red-700"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processando...
              </>
            ) : (
              <>
                <DollarSign className="h-4 w-4 mr-2" />
                Confirmar Retirada
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawAllModal;
