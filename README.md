# Desafio loja de aluguel - React

## Oportunidade

Olá! Temos uma oportunidade para desenvolvedor na Digivox e gostaríamos que você participasse do nosso processo seletivo. Ao fim do processo, você receberá um feedback do nosso time com o resultado do processo 😃.

## Detalhamento do desafio

Criar uma API REST para gerenciamento de uma loja que aluga itens. Através destes serviços a empresa poderá manter o cadastro dos seus tipos de item, itens, clientes, aluguéis e acompanhar em um dashboard o que está sendo devolvido e alugado em tempo real.

## Serviços a serem criados:

 - Manter Tipo de item;
 - Manter Item;
 - Manter cliente;
 - Reservar de item;
 - Cancelar reserva;
 - Alugar item;
 - Devolução de item;
 - Dashboard com informações sobre: 
  - Itens a serem devolvidos no período semanal, com seus valores;
  - Itens alugados no período semanal, com seus valores;

OBS: Para o serviço de reserva, o item será disponibilizado ao cliente em uma data agendada (ou seja, um agendamento) enquanto no de aluguel do item ele é disponibilizado no exato momento da solicitação.

## Tecnologias Obrigatórias

 - JDK 1.8+;
 - Maven 3.3+;
 - Banco de dados Postgres;
 - Framework Spring Boot;
 - React

## O que avaliaremos

 - Coesão do código-fonte
 - Boas práticas e padrões;
 - Aderência aos serviços solicitados;

## Instruções

1. Após o envio do desafio você terá 3 dias para desenvolver. Seja criativo! Utilize as ferramentas e frameworks ao seu favor.
2. Atualize o README.MD do projeto e detalhe as etapas para que a aplicação execute com sucesso.
3. Após finalizado envie um e-mail para dev-challenges@digivox.com.br, indicando onde está hospedado o seu código.

## Instruções para executar projeto

1. Clone repositorio

#### Pré-Requisitos

- JDK 1.8+;
- NodeJs 12.18+;
- yarn 1.22.4;

### API

1. Abrir api-digivox, na IDE Eclipse EE ou IDE de preferência, baixar as dependências Maven.
2. Criar um banco de dados Postegresql, e substituir as credenciais no arquivo src/main/resources/application.properties.
3. Executar projeto Java, e nossa api estará rodando na porta 8080, certifique-se de que a porta está livre.

### Frontend

1. Abrir terminal ir até a pasta frontend-digivox, que está no projeto clonado.
2. No terminal, dentro da pasta executar o comando: yarn.
3. Espere baixar todas as dependências.
4. Execute o comando: yarn start.
5. Nossa aplicação estará rodando na porta 3000, basta ir no navegador (caso não abra sozinho), digitar http://localhost:3000

