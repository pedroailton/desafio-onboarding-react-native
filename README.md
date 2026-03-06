# 🍳 CookBuddy

O **CookBuddy** é um aplicativo mobile desenvolvido em [**React Native**](https://reactnative.dev/) com [**Expo**](https://expo.dev/home), criado para ser o seu assistente de cozinha pessoal. Ele permite que os usuários explorem diversas receitas, visualizem ingredientes e modos de preparo detalhados, e salvem seus pratos favoritos para acesso rápido.

Este projeto foi construído como um desafio de *onboarding* em [React Native](https://reactnative.dev/) da **Trilha Front-End** da [Seed A Bit Tecnologia](https://seedabit.org.br/), focando em boas práticas de arquitetura, responsividade, roteamento moderno e consumo de API externa.

## 🚀 Tecnologias Utilizadas

* **React Native & Expo**: Framework base para construção da interface nativa multiplataforma. O desenvolvimento e os testes visuais foram facilitados pelo uso do **Expo Go**.
* **Expo Router**: Sistema de roteamento moderno baseado na estrutura de arquivos e diretórios.
* **TypeScript**: Utilizado para garantir tipagem estática, oferecendo maior previsibilidade no consumo da API (como nas interfaces `RecipeProps` e `RecipeDetailsProps`).
* **AsyncStorage**: Solução (`@react-native-async-storage/async-storage`) para persistência de dados localmente no dispositivo.
* **TheMealDB API**: Consumo de API pública RESTful para busca e detalhamento dos pratos.

## 🏗️ Arquitetura e Estrutura do Projeto

O projeto foi estruturado separando claramente a lógica de roteamento (telas) da construção de interface (componentes).

### Componentização (`/components`)
A interface foi componentizada para manter o código limpo, reaproveitável e de fácil manutenção:
* **`RecipeCard`**: Um componente de cartão isolado, que exibe a imagem e o título da receita. É reaproveitado de forma dinâmica tanto na lista principal quanto na aba de receitas salvas.
* **`IngredientList`**: Componente dedicado exclusivamente a renderizar as linhas de ingredientes e suas respectivas medidas com base nos dados tratados da API.
* **`SavingButton`**: Componente de botão responsável por acionar a lógica de persistência e indicar ao usuário se a receita já encontra-se armazenada.
* **`LoginInput`**: Componente de input responsável por exibir o componente <TextInput> do React-Native.
* **`LoginButton`**: Componente de botão responsável por acionar a lógica de validação de senha e uso do expo router para avançar para a tela Home.

### Roteamento Avançado (`/app`)
O aplicativo utiliza o Expo Router para gerenciar a navegação de forma intuitiva:
* **Navegação em Abas (Tab Navigation)**: A raiz principal conta com a aba exploratória (`recipes.tsx`) e a aba de favoritos (`saved.tsx`).
* **Rotas Dinâmicas**: O arquivo `app/recipe/[id].tsx` funciona como um molde. Ao clicar em um cartão (utilizando o `useRouter` e `router.push`), o aplicativo navega capturando o `idMeal` específico na URL invisível e busca os dados detalhados apenas daquele prato.

## 🧩 Tratamento e Normalização de Dados

Um desafio arquitetural importante deste aplicativo é o consumo do payload da `TheMealDB API`. A API retorna os detalhes dos pratos com ingredientes e medidas espalhados em chaves estáticas achatadas (de `strIngredient1` a `strIngredient20`).

Para garantir uma renderização elegante e limpa, foi implementado um algoritmo de normalização na tela de detalhes:
* O sistema utiliza um laço de repetição (`for` de 1 a 20) que avalia dinamicamente as chaves `strIngredient${i}` e `strMeasure${i}`.
* Strings vazias ou espaços em branco são filtrados (`ingredient.trim() !== ""`).
* Os dados válidos são transformados em um array de objetos estruturados, sendo facilmente consumidos pelo componente `<IngredientList />`.

## 💾 Persistência de Dados (AsyncStorage)

O aplicativo guarda os pratos preferidos do usuário utilizando a memória do dispositivo (`AsyncStorage` sob a chave `@cookbuddy_saved`).
* **Prevenção de Duplicatas**: Antes de salvar, a aplicação checa através da função `.some()` se a receita selecionada já existe no cofre.
* **Ciclo de Vida Otimizado**: Na aba de receitas salvas (`saved.tsx`), os dados são buscados através do hook `useFocusEffect` atrelado ao `useCallback`. Isso garante que, ao navegar de volta para a aba, as informações sejam recarregadas sem comprometer a performance do React Native com loops de renderização infinitos.

## 📏 Responsividade e Adaptação de Tela

Para garantir uma experiência de usuário consistente e fluida em diferentes tamanhos de dispositivos (desde smartphones compactos até tablets), o aplicativo conta com técnicas nativas de responsividade:
* **Layouts Fluidos:** Utilização do hook `useWindowDimensions` do React Native para ler a largura da tela em tempo real e calcular o tamanho de elementos dinamicamente (como a imagem de destaque da receita, que mantém proporções perfeitas sem quebrar o layout).
* **Tipografia Escalável:** Em vez de utilizar fontes com tamanhos fixos absolutos, o projeto implementa uma lógica de escalonamento baseada nas dimensões da tela do usuário. Isso garante que os textos (`fontSize`) cresçam ou diminuam proporcionalmente, mantendo a legibilidade e a harmonia visual em qualquer resolução.

## 📱 Como executar o projeto localmente

1. Clone este repositório.
2. Navegue até a pasta do projeto e instale as dependências:
   ```
   npm install
   ```
3. Rode o seguinte script no terminal no repositório clonado:
   ```
   npx expo start
   ```
4. Use um emulador mobile como o `Android Studio` ou use o app `Expo Go` para exibir a interface do programa seguindo as orientações do terminal.  
   Obs.: Se usar o Expo Go, use a mesma conexão wi-fi do seu computador. Para mais orientações e soluções sobre o Expo, acesse a [Documentação do Expo](https://docs.expo.dev/)
