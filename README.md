# Frontend Docs (LEIA)

O que estou usando:
Linguagem: Javascript
Framework: Vue 3 + Quasar v2.13.1 <br>
Node: v20.8.0
Npm: v10.1.0

Bibliotecas usadas integrada ao Quasar:

```bash
  # Pinia
  https://pinia.vuejs.org/
  # Axios
  https://axios-http.com/docs/intro
```

```bash
  # Criado camada de services juntamente com a Store do Pinia para realizar chamada a api.

  # routes-dictionary espera receber o endpoint a ser consumido, exemplo:

  export const route = {
    getPosts: "/posts", exemplo de get
    doMakePostUser: "/post/{id}" exemplo de post
  };

  #Exemplo service + store

  export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    loadingPost: false,
    posts: [],
  }),

  actions: {
    clearState() {
      this.posts = []
    },

    async doGetPosts() {

        this.loadingPost = true;
        const resp = await api.get(`${api.defaults.baseURL}${route.getPosts}`);

        if (resp.status === 200) {
          this.loadingPost = false;
          this.posts = resp.data;
        }

        if (resp.status !== 200) {
          this.loadingPost = false;
        }
    },
  },
});

# Como fica no component:
  import { useDashboardStore } from "src/stores/DashboardTStore";
  const DashboardT = useDashboardStore();

  onMounted(async () => {
    await DashboardT.doGetPosts();
  });

  <q-table
      title="Postagens"
      :rows="DashboardT.posts" <- Caminho feliz ;)
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      class="table-custom"
  />

  Essa é uma previa da documentação, não consegui dar muita atenção a detalhes, porque meu dia foi bem corrido muitas reuniões para apagar incêndio de prod, iniciei os testes as 23:30 do dia 09/11/2023 e finalizei as 10/11/2023 04:50 da manhã, e as 09:00 tenho que estar de pé para Daily. :X
  Só faltou os loading ai meu patrão, é isso, desde já obrigado.
```

## Como rodar o projeto

Certifique-se de instalar as dependências:

```bash
# npm
npm install

# yarn
yarn install
```

## Rodar o projeto

Inicie o servidor de desenvolvimento em `http://localhost:9000/`:

```bash
# npm
npm run dev

# yarn
yarn dev
```

## Production

Crie o aplicativo para produção:

```bash
# npm
npm run build

# yarn
yarn build
```
