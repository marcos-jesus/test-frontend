<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
function navigateTodoList() {
  router.push({ path: "todo-list" });
}

function navigateDynamicForm() {
  router.push({ path: "cadastro" });
}

function navigateDashboard() {
  router.push({ path: "dashboard" });
}
</script>
<template>
  <q-page padding>
    <q-row>
      <q-cols class="col-xs">
        <h3 class="flex justify-center">Bem vindo</h3>
        <div class="flex justify-center justify-evenly">
          <q-btn color="deep-orange" push @click="navigateTodoList">
            <div class="row items-center no-wrap">
              <q-icon left name="map" />
              <div class="text-center">Todo<br />List</div>
            </div>
          </q-btn>

          <q-btn color="primary" push @click="navigateDynamicForm">
            <div class="row items-center no-wrap">
              <q-icon left name="map" />
              <div class="text-center">Formulário<br />Dinâmico</div>
            </div>
          </q-btn>

          <q-btn color="primary" push @click="navigateDashboard">
            <div class="row items-center no-wrap">
              <q-icon left name="map" />
              <div class="text-center">Dashboard</div>
            </div>
          </q-btn>
        </div>
      </q-cols>
    </q-row>
  </q-page>
</template>
