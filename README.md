# MemeFlow - Sistema de Copy Trading na Blockchain Solana

![MemeFlow Logo](https://hbntevlm.manus.space/favicon.ico)

## Visão Geral

MemeFlow é uma plataforma de copy trading na blockchain Solana que permite aos usuários replicar automaticamente as operações de uma carteira mestre. O sistema utiliza um contrato inteligente para permitir que os seguidores deleguem permissão de negociação à plataforma uma única vez, eliminando a necessidade de assinar cada transação de cópia.

## Características Principais

- **Delegação única de autoridade**: Os usuários assinam apenas uma vez para autorizar a plataforma
- **Copy trading automático**: Replicação automática das operações da carteira mestre
- **Integração com Jupiter**: Execução de swaps otimizados via Jupiter
- **Sistema de comissões baseado em lucro**: Distribuição de taxas entre plataforma e rede de afiliados
- **Interface minimalista**: Design inspirado no estilo Jonathan Ive e Phantom Wallet

## Arquitetura Otimizada

O código foi completamente refatorado para eliminar redundâncias e centralizar a lógica de negócio:

### 1. Serviços Centralizados

- **CommissionService**: Toda a lógica de comissões e ranking em um único serviço
- **SupabaseService**: Chamadas ao backend centralizadas para evitar duplicação

### 2. Hooks Unificados

- **useNetworkData**: Dados de rede, comissões e ranking em um único hook
- **useCommissionTester**: Testes funcionais para validar a lógica de comissões

### 3. Componentes Refatorados

- Interface simplificada e focada na usabilidade
- Componentes reutilizáveis e bem documentados

## Sistema de Comissões e Ranking

### Distribuição do Lucro

- 30% do lucro é retido como taxa (10% para master trader, 20% para rede)
- 70% do lucro permanece com o seguidor

### Distribuição na Rede

- Cada ranking (V1-V8) tem um percentual máximo de comissão
- A distribuição segue um sistema diferencial onde cada upline recebe a diferença entre seu percentual e o do upline abaixo
- O residual vai para a plataforma

### Progressão de Ranking

- Baseada no **lucro da rede**, não no volume de transações
- Cada ranking tem requisitos de lucro da rede e estrutura

### Percentuais por Ranking

| Ranking | Percentual |
|---------|------------|
| V1      | 2%         |
| V2      | 4%         |
| V3      | 6%         |
| V4      | 8%         |
| V5      | 12%        |
| V6      | 14%        |
| V7      | 16%        |
| V8      | 20%        |

## Instalação e Uso

### Pré-requisitos

- Node.js 20+
- Solana CLI 1.18+
- Anchor 0.29+ (para desenvolvimento do contrato)

### Configuração

1. Clone o repositório:
```
git clone https://github.com/moneymagic/memeflowuni.git
cd memeflowuni
```

2. Instale as dependências:
```
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
VITE_SUPABASE_URL="https://fndkivztnbkzuqosmbdx.supabase.co"
VITE_SUPABASE_ANON_KEY="sua_chave_anon_do_supabase"
VITE_MEMEFLOW_PROGRAM_ID="HX3Ex4icMLJFwqSDJ9vsLe87ZNd7UyrBxPiUHj78rKLm"
VITE_JUPITER_PROGRAM_ID="JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"
```

### Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

```
npm run dev
```

### Build

Para compilar o projeto para produção:

```
npm run build
```

## Contrato Inteligente

O contrato Memeflow implementa as seguintes instruções:

- `initialize`: Configura parâmetros iniciais da plataforma
- `update_config`: Permite ao admin atualizar configurações
- `delegate_authority`: Permite ao usuário delegar autoridade de swap
- `revoke_authority`: Permite ao usuário revogar a autoridade delegada
- `execute_swap`: Executa um swap em nome do usuário via Jupiter

Para compilar o contrato:

```
cd memeflow_contract
anchor build
```

## Acesso Online

O site está disponível em:

**[https://hbntevlm.manus.space](https://hbntevlm.manus.space)**

## Contribuição

Para contribuir com o projeto, por favor abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
