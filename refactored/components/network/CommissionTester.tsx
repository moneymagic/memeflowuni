import React from 'react';
import { useCommissionTester } from '../../hooks/useCommissionTester';

/**
 * Componente para testar a lógica de comissões e ranking
 * Permite simular operações e verificar se a distribuição está correta
 * 
 * @param userId ID do usuário para teste
 * @returns Componente React
 */
export const CommissionTester: React.FC<{ userId: string }> = ({ userId }) => {
  const {
    testResults,
    loading,
    error,
    simulateTrade,
    testRankProgression
  } = useCommissionTester(userId);

  const [profitAmount, setProfitAmount] = React.useState<number>(1);

  const handleSimulateTrade = () => {
    simulateTrade(profitAmount);
  };

  return (
    <div className="p-6 rounded-lg bg-primary-900/20">
      <h3 className="text-xl font-bold mb-4">Teste de Comissões e Ranking</h3>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Simular Operação Lucrativa</h4>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm mb-1">Valor do Lucro (SOL)</label>
            <input
              type="number"
              value={profitAmount}
              onChange={(e) => setProfitAmount(Number(e.target.value))}
              min="0.1"
              step="0.1"
              className="w-full p-2 rounded border border-primary-700 bg-primary-950"
            />
          </div>
          <button
            onClick={handleSimulateTrade}
            disabled={loading}
            className="px-4 py-2 bg-primary-700 hover:bg-primary-600 rounded"
          >
            {loading ? 'Simulando...' : 'Simular'}
          </button>
          <button
            onClick={testRankProgression}
            disabled={loading}
            className="px-4 py-2 bg-primary-700 hover:bg-primary-600 rounded"
          >
            {loading ? 'Testando...' : 'Testar Ranking'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="p-4 mb-4 rounded bg-destructive/20 text-destructive-foreground">
          {error}
        </div>
      )}
      
      {testResults && (
        <div className="border border-primary-700 rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Resultados do Teste</h4>
            <span className={`px-3 py-1 rounded text-sm ${testResults.testPassed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {testResults.testPassed ? 'PASSOU' : 'FALHOU'}
            </span>
          </div>
          
          {testResults.profitAmount && (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">Valores Esperados</h5>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Taxa de Performance:</span>
                      <span>{testResults.expectedValues.performanceFee.toFixed(4)} SOL</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Taxa Master:</span>
                      <span>{testResults.expectedValues.masterFee.toFixed(4)} SOL</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Taxa de Rede:</span>
                      <span>{testResults.expectedValues.networkFee.toFixed(4)} SOL</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-2">Valores Reais</h5>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Taxa Master:</span>
                      <span>{testResults.actualValues?.masterFee.toFixed(4)} SOL</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Taxa de Rede:</span>
                      <span>{testResults.actualValues?.networkFee.toFixed(4)} SOL</span>
                    </li>
                    <li className="flex justify-between">
                      <span>% Distribuído:</span>
                      <span>{testResults.actualValues?.distributedPercentage.toFixed(2)}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>% Residual:</span>
                      <span>{testResults.actualValues?.remainingPercentage.toFixed(2)}%</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Uplines na cadeia:</span> {testResults.uplineCount}
              </div>
            </>
          )}
          
          {testResults.currentStats && (
            <>
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">Estatísticas Atuais</h5>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Ranking Atual:</span>
                    <span>V{testResults.currentStats.currentRank}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lucro da Rede:</span>
                    <span>{testResults.currentStats.totalNetworkProfit.toFixed(2)} SOL</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Ganhos Totais:</span>
                    <span>{testResults.currentStats.totalEarnings.toFixed(2)} SOL</span>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-sm font-medium mb-2">Progressão de Ranking</h5>
                <div className="flex justify-between mb-2">
                  <span>Ranking Possível:</span>
                  <span className="font-medium">V{testResults.possibleRank}</span>
                </div>
                {testResults.progressHistory && testResults.progressHistory.length > 0 && (
                  <div>
                    <h6 className="text-xs font-medium mb-1">Histórico Recente</h6>
                    <ul className="space-y-1 text-xs">
                      {testResults.progressHistory.map((progress: any, index: number) => (
                        <li key={index} className="flex justify-between">
                          <span>{new Date(progress.timestamp).toLocaleDateString()}</span>
                          <span>V{progress.previous_rank} → V{progress.new_rank}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommissionTester;
