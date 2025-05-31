
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWallet } from "@/contexts/WalletContext";
import { useToast } from "@/hooks/use-toast";
import { Wallet, AlertTriangle } from 'lucide-react';

interface AllocateCapitalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
  currentBalance: number;
}

const AllocateCapitalModal: React.FC<AllocateCapitalModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  currentBalance
}) => {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { isConnected } = useWallet();
  const { toast } = useToast();

  const handleAllocate = async () => {
    if (!isConnected) {
      toast({
        title: "Carteira não conectada",
        description: "Conecte sua Phantom Wallet primeiro",
        variant: "destructive"
      });
      return;
    }

    const allocAmount = parseFloat(amount);
    if (isNaN(allocAmount) || allocAmount <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, insira um valor válido em SOL",
        variant: "destructive"
      });
      return;
    }

    if (allocAmount < 0.1) {
      toast({
        title: "Valor muito baixo",
        description: "O valor mínimo para alocação é 0.1 SOL",
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
          // In a real implementation, you would create a transaction here
          // For now, we'll simulate the transaction approval
          console.log(`Requesting transaction approval for ${allocAmount} SOL allocation`);
          
          // Simulate transaction delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          toast({
            title: "Alocação realizada com sucesso!",
            description: `${allocAmount} SOL alocado para copy trading`,
          });
          
          onSuccess(allocAmount);
          onClose();
          setAmount('');
        } else {
          throw new Error('Phantom wallet not detected');
        }
      } else {
        throw new Error('Phantom wallet not installed');
      }
    } catch (error) {
      console.error('Error allocating capital:', error);
      toast({
        title: "Erro na alocação",
        description: "Falha ao processar a transação. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      setAmount('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-400" />
            Alocar Capital para Copy Trading
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Defina o valor em SOL que deseja alocar para operações de copy trading.
            Esta transação será processada via Phantom Wallet.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sol-amount" className="text-white">
              Valor em SOL
            </Label>
            <Input
              id="sol-amount"
              type="number"
              placeholder="Ex: 1.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              step="0.1"
              min="0.1"
              disabled={isProcessing}
            />
            <p className="text-xs text-gray-400">
              Valor mínimo: 0.1 SOL
            </p>
          </div>

          <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-300">
                <p className="font-medium mb-1">Como funciona:</p>
                <ul className="text-xs space-y-1 text-blue-200">
                  <li>• O valor será transferido via smart contract</li>
                  <li>• Taxa de performance: 30% sobre lucros</li>
                  <li>• Você pode ajustar a alocação a qualquer momento</li>
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
            onClick={handleAllocate}
            disabled={isProcessing || !amount || parseFloat(amount) < 0.1}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processando...
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4 mr-2" />
                Alocar {amount || '0'} SOL
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AllocateCapitalModal;
