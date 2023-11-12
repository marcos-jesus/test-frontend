<script setup>
import { useTodoList } from "src/stores/todoListStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const todolist = useTodoList();
const router = useRouter();
const newTask = ref("");

const addTask = () => {
  if (newTask.value.trim()) {
    todolist.tasks.push({
      label: newTask.value,
      done: false,
    });
    newTask.value = "";
  }
};

const markTaskDone = (index) => {
  todolist.tasks[index].done = !todolist.tasks[index].done;
};

const removeTask = (index) => {
  todolist.tasks.splice(index, 1);
};

const backInitial = () => {
  router.back();
};
</script>
<template>
  <div class="q-pa-xl q-m-20">
    <q-btn
      flat
      round
      color="primary"
      icon="arrow_back_ios_new"
      @click="backInitial"
    />
    <h4>Gerenciador de tarefas</h4>
    <q-input
      v-model="newTask"
      placeholder="Digite uma nova tarefa"
      @keyup.enter="addTask"
    />
    <q-list>
      <q-item v-for="(task, index) in todolist.tasks" :key="index">
        <q-item-section>
          <q-item-label
            :style="{ textDecoration: task.done ? 'line-through' : 'none' }"
          >
            {{ task.label }}</q-item-label
          >
        </q-item-section>
        <q-item-section side class="q-flex">
          <q-btn
            dense
            flat
            icon="done"
            @click="markTaskDone(index)"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            :class="{ 'hover-class': hover }"
          />
          <q-btn dense flat icon="delete" @click="removeTask(index)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<style scoped>
.hover-class {
  background-color: blue;
  color: red;
}
</style>
