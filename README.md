# Sistema de Gerenciamento de Ar-condicionado ❄️
![Status](https://img.shields.io/badge/api-Em%20Desenvolvimento-yellow)

O Sistema de Gerenciamento de Ar-condicionado foi desenvolvido para monitorar e controlar os módulos de ar-condicionado em tempo real. Através de um painel de administração, é possível gerenciar a temperatura, verificar o status de conexão dos módulos ESP32, visualizar logs de atividade e até bloquear ou desbloquear o controle remoto, garantindo o gerenciamento mais seguro e eficiente.

## 🛠️ Funcionalidades
- 🌐 **Listar Módulos Conectados**: Visualize todos os módulos de ar-condicionado conectados ao sistema.
- 🔄 **Status Online/Offline**: Verifique o status de cada módulo (online ou offline).
- 📜 **Log de Atividade**: Acompanhe todas as ações realizadas no sistema.
- 🌡️ **Controle de Temperatura**: Altere a temperatura dos aparelhos remotamente.
- 🔒 **Controle Remoto Bloqueado/Desbloqueado**: Bloqueie ou desbloqueie o controle remoto, permitindo que somente o sistema tenha controle dos aparelhos.
- 🤖 **Automatização**: Implemente ações automáticas com base em parâmetros definidos (ex: alterar temperatura conforme horário).
- ⏰ **Grade Horária**: Automatização dos aparelhos para definir a temperatura de acordo com o horário de uma sala e preferências de um professor. Os usuários podem configurar o sistema para ajustar a temperatura conforme a agenda da sala de aula.

## ⚙️ Tecnologias Utilizadas
- Backend: Node.js (JavaScript)
- Banco de Dados: MySQL
- Módulos ESP32: Comunicação com módulos para controle de ar-condicionado

## 🔒 Segurança
- Autenticação: Implementação de segurança robusta para proteger o acesso ao sistema.
- Controle de Acesso: Gerenciamento de permissões para garantir que apenas usuários autorizados tenham acesso às funcionalidades.
