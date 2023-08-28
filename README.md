# Talker Manager 🚧⏳

## Intro

Inspirado no projeto [**Talker Manager**](https://github.com/davidrogger/trybe-project-talker-manager), realizado na trybe, usando typescript e desenvolvendo um frontend testando nextjs.

## Tecnologias e ferramentas

![Node.js](https://img.shields.io/badge/-Nodejs-339933?&logo=Node.js&logoColor=ffffff)
![Next.js](https://img.shields.io/badge/-Nextjs-000?&logo=Next.js)
![TypeScript](https://img.shields.io/badge/-TypeScript-235a97?&logo=typescript&logoColor=ffffff)
![Docker](https://img.shields.io/badge/-Docker-fff?&logo=docker)
![Express.js](https://img.shields.io/badge/-Express-339999?&logo=express&logoColor=ffffff)
![Mocha](https://img.shields.io/badge/-Mocha-896446?&logo=mocha&logoColor=ffffff)
![Chai](https://img.shields.io/badge/-Chai-a40802?&logo=chai)
![Sinon](https://img.shields.io/badge/-Sinon-1?logo=sinon)
![Jest](https://img.shields.io/badge/-Jest-C63D15?&logo=jest)
![React Testing Library](https://img.shields.io/badge/-RTL-242526?&logo=testing-library)
![MySQL](https://img.shields.io/badge/-MySQL-EAA221?&logo=mysql&logoColor=1e4c68)

# Versão - 00

<div style="text-align: center">

  [![Thumb Image](https://img.youtube.com/vi/5j2_DD0e708/0.jpg)](https://www.youtube.com/watch?v=5j2_DD0e708)

</div>

## Proposta do projeto

Criar um painel onde é possível pessoas não logadas a consulta de título e datas de palestras com o nome dos palestrantes, e pessoas cadastradas, podem criar,  ver, atualizar e remover palestrantes e palestras(CRUD).

## Escolha das tecnologias

Visando a primeira seção do módulo de backend da trybe, abordando mais o conceito de TDD que não fazia parte do módulo e o desenvolvimento de frontend, e como nunca havia usado nextjs, queria entender seu funcionamento, juntamente com aplicação de testes.

## Desafios

Principal desafio foi focar no TDD, principalmente do lado do frontend.

O Backend, foi mais fluido que o frontend durante o desenvolvimento, pois os TDD era bem mais definido na minha cabeça como ir criando o fluxo onde "batia" em um endpoint, e esperava um determinado retorno de "status" e corpo.

O Frontend, foram várias horas pesquisando como o nextjs usa o app router usando provider para conseguir redirecionar as rotas do endereço, demorei um bom tempo para encontrar material explicando que era necessário criar um provider "mockando" o useRouter, e não me recordo em qual versão em específico o nextjs, atualizou o uso da importação de next/router para next/navigation, mesclei conhecimento de pesquisa com do curso, e no fim, conseguir realizar os testes de redirecionamento, mas ainda minha abordagem de teste, meio que tentando simular o caso de uso de integração entre componentes e redirecionamento, provavelmente não foi o mais apropriado para o teste usando React Testing library, cheguei a conclusão que melhor uso do RTL, seria mais focado para teste unitários, e o uso de algum outro framework para testes de caso de uso, como cypress indicado na documentação do nextjs.

Controle de rotas, eu também poderia ter usado um middleware do nextjs, mas inicialmente, eu foquei em usar o que eu conseguia com o conhecimento que eu tenho, para em outras versões eu evoluir por branch, para ter uma visão de; assim que eu fazia antes, agora eu consigo melhorar assim.

## Conclusão

Não teve um dia, que não aprendi algo novo nesse projeto, levei mais tempo que esperado para concluir essa primeira versão, mas com ele consegui usar todo conhecimento que eu tenho, agora quero criar outros projetos, e evoluir as versões em conjunto, muita coisa sobre SOLID eu quero implementar, e manter meu código mais limpo e fácil de entender.

## Proximos passos...

Quero melhorar a estrutura de testes,
Frontend segmentando mais os testes por componente na parte do frontend, e simplificando mais os testes de caso de uso, criar funcionalidades de segurança para evitar problemas com bots tentando acessando e criar algo incontrolável dentro da aplicação, para um dia realizar o deploy, e expor no portifólio.
Backend, entender melhor as vulnerabilidades que posso evitar quando requisitando para API, entre muitas outras coisas que eu ainda preciso aprender e entender.