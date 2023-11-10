import { defineStore } from "pinia";

export const useDynamicStore = defineStore("dynamicStore", {
  state: () => ({
    isOpen: false,
  }),
});
