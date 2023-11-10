<script setup>
import { ref, onMounted } from "vue";
import { useDashboardStore } from "src/stores/DashboardTStore";
import { useRouter } from "vue-router";

const DashboardT = useDashboardStore();
const loading = ref(false);
const filter = ref("");
const router = useRouter();
const columns = [
  {
    name: "title",
    required: true,
    label: "Título",
    align: "left",
    field: "title",
    sortable: true,
  },
  {
    name: "body",
    label: "Conteúdo",
    field: "body",
    sortable: true,
    align: "left",
  },
];

function backInitial() {
  router.back();
}

onMounted(async () => {
  await DashboardT.doGetPosts();
});
</script>

<template>
  <div class="q-p-xl w-full">
    <q-btn
      flat
      round
      color="primary"
      icon="arrow_back_ios_new"
      @click="backInitial"
      class="q-mt-md q-ml-md"
    />
    <h3 class="flex justify-center">Tabela</h3>
    <q-table
      title="Postagens"
      :rows="DashboardT.posts"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
      class="table-custom"
    >
      <template v-slot:top="">
        <q-input
          debounce="300"
          v-model="filter"
          placeholder="Digite para filtrar"
          clearable
        />
      </template>
    </q-table>
  </div>
</template>
<style scoped>
.table-custom {
  width: auto;
  margin: 1rem;
}
</style>
