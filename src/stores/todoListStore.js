import { defineStore } from "pinia";

export const useTodoList = defineStore("todolist", {
  state: () => ({
    tasks: [],
  }),
});
