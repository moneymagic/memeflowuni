
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { Minus, AlertTriangle } from 'lucide-react';

interface DecreaseAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newAmount: number) => void;
  currentAllocation: number;
}

const DecreaseAllocationModal: React.FC<DecreaseAllocationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentAllocation
}) => {
  const [newAmount, setNewAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected } = useWallet();
  const { toast } = useToast();

  const handleDecrease = async () => {
    if (!isConnected) {
      toast({
        title: "Carteira não conectada",
        description: "Conecte sua Phantom Wallet primeiro",
        variant: "destructive"
      });
      return;
    }

    const targetAmount = parseFloat(newAmount);
    if (isNaN(targetAmount) || targetAmount < 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor válido",
        variant: "destructive"
      });
      return;
    }

    if (targetAmount >= currentAllocation) {
      toast({
        title: "Valor inválido",
        description: "O novo valor deve ser menor que a alocação atual",
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
          const decreaseAmount = currentAllocation - targetAmount;
          console.log(`Requesting transaction approval for decreasing allocation by ${decreaseAmount} SOL`);
          
          // Simulate transaction delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          toast({
            title: "Alocação reduzida com sucesso!",
            description: `${decreaseAmount} SOL retirado. Nova alocação: ${targetAmount} SOL`,
          });
          
          onSuccess(targetAmount);
          onClose();
          setNewAmount('');
        } else {
          throw new Error('Phantom wallet not detected');
        }
      } else {
        throw new Error('Phantom wallet not installed');
      }
    } catch (error) {
      console.error('Error decreasing allocation:', error);
      toast({
        title: "Erro na operação",
        description: "Falha ao processar a transação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setNewAmount('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Minus className="h-5 w-5 text-yellow-400" />
            Diminuir Alocação
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Defina o novo valor da sua alocação para copy trading. O valor reduzido será devolvido para sua carteira.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-sm text-gray-300">Alocação atual: <span className="text-white font-medium">{currentAllocation} SOL</span></p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-amount" className="text-white">
              Nova alocação (SOL)
            </Label>
            <Input
              id="new-amount"
              type="number"
              placeholder={`Ex: ${(currentAllocation / 2).toFixed(1)}`}
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              step="0.1"
              min="0"
              max={currentAllocation - 0.1}
              disabled={isProcessing}
            />
            <p className="text-xs text-gray-400">
              Deve ser menor que {currentAllocation} SOL
            </p>
          </div>

          <div className="bg-yellow-900/30 border border-yellow-500/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-300">
                <p className="font-medium mb-1">Importante:</p>
                <ul className="text-xs space-y-1 text-yellow-200">
                  <li>• O valor reduzido será devolvido para sua carteira</li>
                  <li>• Operações em andamento não serão afetadas</li>
                  <li>• Você pode aumentar a alocação novamente a qualquer momento</li>
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
            onClick={handleDecrease}
            disabled={isProcessing || !newAmount || parseFloat(newAmount) >= currentAllocation}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processando...
              </>
            ) : (
              <>
                <Minus className="h-4 w-4 mr-2" />
                Diminuir para {newAmount || '0'} SOL
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DecreaseAllocationModal;
