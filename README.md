## **Índice**

1. [Prefácio](#1-prefácio) 
2. [Resumo do projeto](#2-resumo-do-projeto)
3. [Sobre o tema e usuários](#3-sobre-o-tema-e-usuários)
4. [Protótipo](#4-protótipo) 
5. [Testes de usabilidade](#5-testes-de-usabilidade)
6. [Critérios de aceitação](#6-critérios-de-aceitação-mínimos-do-projeto) 
7. [Testes unitários](#7-testes-unitários) 
8. [Tecnologias utilizadas](#8-tecnologias-utilizadas)
9. [Melhorias futuras](#9-melhorias-futuras)
  *  [Créditos](#créditos)
  *  [Autores](#autores)

***
<center>
<img src="src\assets\up_on_logo.png" alt="logo up on" width="200px">
</center>

<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge">

## 1. **Prefácio**

O projeto é a criação de uma rede social com um tema a ser definido pela equipe. O objetivo é aplicar os conhecimento adquiridos em projetos anteriores desenvolvidos no bootcamp da Laboratória, juntamente com o firebase.

O Firebase é uma ferramenta disponibilizada pelo Google, sendo um conjunto de serviços de computação em nuvem de back-end; ele hospeda bancos de dados, serviços, autenticação e integração para uma variedade de aplicativos. A ideia é criar uma rede social utilizando essa ferramenta, visando facilitar o desenvolvimento e garantir uma aplicação intuitiva.

## 2. **Resumo do projeto**

**Bem-vindo à Up_On: A Sua Fonte Confiável de Informações!**

Aqui na Up_On, acreditamos que estar bem informado é mais do que apenas receber notícias; é sobre ter acesso a informações confiáveis e relevantes que realmente importam para você. Criamos esta rede social com o objetivo de trazer clareza e autenticidade à sua experiência de compartilhamento de informações.
O que nos torna diferentes?
* Fontes Autênticas: Na Up_On, acreditamos em dar crédito onde ele é devido. Cada postagem informativa inclui a fonte da informação, permitindo que você saiba de onde vem cada detalhe.
* Categorização Inteligente: Utilizamos hashtags para categorizar informações. Isso significa que você pode personalizar sua experiência, escolhendo apenas as hashtags que interessam a você e recebendo as informações que realmente importam.
* Votos de Relevância: Sua opinião conta! Você pode votar nas informações para indicar sua relevância. Isso ajuda a destacar as informações mais importantes e valiosas para a comunidade.
* Preservando Sua Personalidade: Acreditamos que você deve ser livre para escolher o que é importante para você. A Up_On respeita sua individualidade e prioridades.

Por que o nome "Up_On"?
"Up_On" é uma expressão em inglês que significa "estar por dentro de um assunto". Em um mundo onde a quantidade de informações pode ser avassaladora, estamos aqui para ajudá-lo a se manter atualizado sobre o que realmente importa para você.
Junte-se a nós na Up_On e comece a compartilhar, aprender e crescer com uma comunidade que valoriza a verdade, a transparência e a liberdade de escolha.

## 3. **Sobre o tema e usuários**

Os principais usuários da rede social são pessoas que procuram compartilhar notícias e informações variadas e buscar assuntos de interesse. Criamos as seguintes histórias dos usuários para desenvolver o projeto tendo como base as suas reais necessidades: 

**História usuário 1**

<aside>
📎 Eu como uma usuária, quero criar uma conta escolhendo e-mail, nickname e senha para acessar a rede social

</aside>

**Critérios de aceitação**

O que deve acontecer para considerarmos que esta história satisfaz as necessidades do usuário

- O usuário deve ter a opção de criar uma nova conta utilizando e-mail e senha de sua preferência.
- Após conectar-se com sua conta o usuário será redirecionado para a timeline da aplicação.

**História usuário 2**

<aside>
📎 Eu como usuária quero criar uma conta usando a minha conta do Google para ter um acesso mais rápido à rede social.

</aside>

**Critérios de aceitação**

O que deve acontecer para considerarmos que esta história satisfaz as necessidades do usuário

- O usuário deve ter a opção de criar uma nova conta utilizando autenticação pela sua conta do Google.
- A autenticação deverá ficar em fácil acesso ao usuário, nas telas de login e registro.
- Os dados da conta do Google do usuário devem ser vinculados à conta na aplicação.
- O usuário deve ser redirecionado para a timeline após o login bem-sucedido.

**História usuário 3**

<aside>
📎 Eu como usuária quero acessar a timeline para compartilhar notícias e novidades.

</aside>

**Critérios de aceitação**

O que deve acontecer para considerarmos que esta história satisfaz as necessidades do usuário

- Após conectar sua conta, redirecionar o usuário para a timeline;
- A opção de fazer a postagem deverá aparecer na timeline com um botão de forma intuitiva;
- A publicação deve ser exibida na timeline após ser criada.

**História usuário 4**

<aside>
📎 Eu como usuária quero uma rede social para me atualizar sobre as noticias e quero votar nas publicações para mostrar o que é relevante.

</aside>

Critérios de aceitação

O que deve acontecer para considerarmos que esta história satisfaz as necessidades do usuário

- Eu quero acessar uma timeline que reúna postagens diversas que eu possa acompanhar em tempo real;
- O usuário deve poder votar em publicações na timeline.
- O número de votos deve ser atualizado em tempo real na interface.
- Cada usuário só pode votar uma vez em cada publicação.

**História usuário 5**

<aside>
📎 Eu como usuária da rede social quero editar ou deletar alguma postagem que eu fizer para corrigir erros ou excluir assuntos que não sejam relevantes.

</aside>

**Critérios de aceitação**

O que deve acontecer para considerarmos que esta história satisfaz as necessidades do usuário

- O usuário terá a opção de editar toda a postagem que fizer;
- O usuário terá também a opção de deletar sua postagem, tendo uma confirmação de exclusão.

### **Definição de pronto**

- A página de registro está implementada e acessível;
- O usuário tem a opção de se registrar com um e-mail e senha de sua preferência;
- A aplicação tem a opção de autenticação pelo Google;
- Os dados da conta do Google são corretamente associados à conta na aplicação;
- A opção de criação de publicação está implementada;
- As publicações são exibidas corretamente na timeline;
- O botão de “up vote” está implementado na interface da publicação;
- Os votos são registrados corretamente e atualizam o contador em tempo real;
- O sistema impede que um usuário vote mais de uma vez na mesma publicação;
- As opções de edição e exclusão de publicações estão funcionando;
- O usuário tem uma confirmação antes da exclusão de postagem.

## 4. **Protótipo**

Os protótipos foram desenvolvidos a fim de visualizar a melhor maneira de criar a rede social de forma que fosse uma aplicação amigável e intuitiva. A intenção era que o usuário pudesse ter fácil acesso a todas as funcionalidades definidas.

### Protótipo de baixa fidelidade

<img src="src\assets\home page desktop.png" alt="home page desktop">

<img src="src\assets\home page mobile.png" alt="home page desktop">

### Protótipo de alta fidelidade

Desktop

<img src="src\assets\prototipoDesktop.png" alt="home page desktop">

Mobile

<img src="src\assets\prototipoMobile.png" alt="home page desktop">

## 5. **Testes de usabilidade**

Os testes de usabilidade foram realizados a fim de encontrarmos dificuldades do usuário com a aplicação. Como métrica utilizamos o Google Forms para obter parâmetros do nível de compreensão e dúvidas dos usuários. Como retorno, vimos que os usuários notaram dificuldade em compreender o intuito da rede social. Debatemos em equipe sobre as questões levantadas e definimos a implementação de um “sobre” onde explica resumidamente o que é e para quem é a Up_On, sendo implementado o acesso mobile  feito através de um modal e no desktop a definição colocado logo ao lado do formulário de login.

## 6. **Critérios de aceitação mínimos do projeto**

[✔] Ser uma SPA.

[✔] Ser *responsivo*.

[✔]Faça sessões de teste de usabilidade com o produto em HTML.

[✔] Login com Firebase

[✔] Validações de autenticação: restrição de acesso de um id por usuário, não repetir usuários, e input de senha secreto e se houver erros, mensagens descritivas devem ser exibidas para ajudar o usuário.

[✔] Validações de timeline: verificar se o usuário está *logado* antes de exibir o conteúdo, conseguir publicar, editar e deletar com confirmação um post. Poder dar e remover likes.

## 7. Testes unitários

Os testes unitários cobriram o mínimo 70% de statements, functions, lines e branches conforme critérios mínimos.
<img src="src\assets\tests.png" alt="home page desktop">
 

## 8. **Tecnologias utilizadas**

- GitHub
- Git Bash
- Firebase
- Vite
- Visual Studio Code
- Figma
- Notion
- HTML
- JavaScript
- CSS

## 9. **Melhorias futuras**

-  Implementação de busca através de caracteres e hashtags de interesse.
- Favoritar as Hashtags de interesse.
- Links clicáveis nos posts.
- Criar posts com imagens.
- Permitir comentar ou responder a uma postagem.
- Introduzir menu com opção de editar perfil.

## ****************Créditos****************

**Imagens:**

Icons: <a href="https://icon-icons.com/">Icon-icons</a>

## **Autores**

O projeto foi desenvolvido por:

Erika Peloggia - [@erikapeloggia](https://github.com/erikapeloggia)

Gabriela Faria - [@gabrielafaria608](https://github.com/gabrielafaria608)

Karina Pedra - [@karinapedra](https://github.com/karinapedra)