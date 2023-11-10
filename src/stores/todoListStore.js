import { defineStore } from "pinia";

export const useCounterStore = defineStore("todolist", {
  state: () => ({
    userActivity: "",
    isChecked: false,
  }),

  actions: {
    increment() {
      this.counter++;
    },
  },
});
