# MemeFlow - Sistema de Copy Trading na Blockchain Solana

MemeFlow é uma plataforma de copy trading na blockchain Solana que permite aos usuários replicar automaticamente as operações de uma carteira mestre. O sistema utiliza um contrato inteligente para permitir que os seguidores deleguem permissão de negociação à plataforma uma única vez, eliminando a necessidade de assinar cada transação de cópia.

## Características

- **Delegação única de autoridade**: Os usuários assinam apenas uma vez para autorizar a plataforma a operar em seu nome
- **Copy trading automático**: Replicação automática das operações da carteira mestre
- **Integração com Jupiter**: Execução de swaps otimizados via Jupiter
- **Sistema de comissões**: Distribuição de taxas entre plataforma e rede de afiliados
- **Interface minimalista**: Design inspirado no estilo Jonathan Ive e Phantom Wallet

## Estrutura do Projeto

O projeto é dividido em três componentes principais:

1. **Contrato Inteligente (On-chain)**: Programa Solana desenvolvido com Anchor que gerencia delegações e executa swaps via Jupiter
2. **Backend (Off-chain)**: Serviços que monitoram operações do master trader, calculam proporções e lucros, e orquestram a execução de swaps delegados
3. **Frontend**: Interface para usuários delegarem autorização, visualizarem operações e gerenciarem suas configurações

## Pré-requisitos

- Node.js 20+
- Solana CLI 1.18+
- Anchor 0.29+ (para desenvolvimento do contrato)

## Configuração

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

## Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

```
npm run dev
```

## Build

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

## Fluxo de Operação

1. **Delegação de Autoridade (Única)**
   - O usuário acessa a plataforma e configura quanto deseja alocar para copy trading
   - O sistema gera uma transação de delegação que o usuário assina com sua carteira
   - Esta transação cria uma conta `DelegatedAuthority` associada ao usuário

2. **Monitoramento e Cópia de Trades**
   - O backend monitora continuamente as operações da carteira mestre
   - Quando uma operação lucrativa é detectada, o sistema executa swaps proporcionais para todos os seguidores

3. **Execução de Swaps Delegados**
   - Para cada seguidor, o backend obtém cotação do Jupiter e executa o swap via contrato inteligente
   - O contrato verifica a delegação e executa o swap via CPI para o Jupiter

4. **Cálculo de Lucro e Taxas**
   - Após cada swap bem-sucedido, o sistema calcula o lucro e distribui as comissões

## Segurança

- A chave privada do `swap_executor_authority` deve ser mantida em segurança extrema
- O contrato valida rigorosamente as contas e autoridades em cada instrução
- A instrução `execute_swap` só pode operar em nome de usuários com delegação ativa

## Limitações

- A delegação é por token, então múltiplos tokens requerem múltiplas delegações
- O contrato usa CPI manual para Jupiter devido a limitações de compatibilidade de dependências
- O slippage deve ser configurado adequadamente para evitar falhas em mercados voláteis

## Contribuição

Para contribuir com o projeto, por favor abra uma issue ou envie um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
