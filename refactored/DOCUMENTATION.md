# MemeFlow - Documentação do Código Refatorado

## Visão Geral

O código do MemeFlow foi completamente refatorado para eliminar redundâncias, centralizar a lógica de negócio e garantir que o sistema de comissões e ranking seja baseado no lucro da rede, não no volume de transações.

## Principais Mudanças

### 1. Centralização de Serviços

- **CommissionService**: Serviço único que centraliza toda a lógica de comissões e ranking
- **SupabaseService**: Centraliza todas as chamadas ao Supabase para evitar duplicação

### 2. Hooks Otimizados

- **useNetworkData**: Hook unificado para dados de rede, comissões e ranking

### 3. Componentes Refatorados

- **RankingProgress**: Utiliza o hook centralizado e reflete corretamente o lucro da rede

### 4. Correções de Lógica de Negócio

- Substituição de "volume" por "lucro da rede" como critério para progressão de ranking
- Ajuste dos cálculos de comissão para seguir o sistema diferencial corretamente

## Estrutura do Código

```
/services
  - CommissionService.ts (Serviço centralizado para comissões e ranking)
  - SupabaseService.ts (Centraliza chamadas ao backend)
  
/hooks
  - useNetworkData.ts (Hook unificado para dados de rede)
  
/components
  - network/RankingProgress.tsx (Componente refatorado)
```

## Sistema de Comissões

O sistema de comissões do MemeFlow segue a seguinte lógica:

1. **Distribuição do Lucro**:
   - 30% do lucro é retido como taxa (10% para master trader, 20% para rede)
   - 70% do lucro permanece com o seguidor

2. **Distribuição na Rede**:
   - Cada ranking (V1-V8) tem um percentual máximo de comissão
   - A distribuição segue um sistema diferencial onde cada upline recebe a diferença entre seu percentual e o do upline abaixo
   - O residual vai para a plataforma

3. **Progressão de Ranking**:
   - Baseada no lucro da rede, não no volume
   - Cada ranking tem requisitos de lucro da rede e estrutura

## Percentuais por Ranking

- V1: 2%
- V2: 4%
- V3: 6%
- V4: 8%
- V5: 12%
- V6: 14%
- V7: 16%
- V8: 20%

## Próximos Passos

1. Implementar testes automatizados para validar a lógica refatorada
2. Revisar a interface para garantir consistência com o novo modelo
3. Documentar APIs e endpoints para facilitar integrações futuras
