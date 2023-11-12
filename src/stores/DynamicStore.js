import { defineStore } from "pinia";
import axiosInstances from "src/services/api";
import { route } from "src/services/routes-dictionary";
export const useDynamicStore = defineStore("dynamicStore", {
  state: () => ({
    isOpen: false,
    dataCep: [],
  }),

  actions: {
    async doGetCep(cep) {
      try {
        this.loadingPost = true;
        const resp = await axiosInstances.apiViaCep.get(
          `${axiosInstances.apiViaCep.defaults.baseURL}${route.getCep}${cep}/json`
        );

        if (resp.status === 200) {
          this.loadingPost = false;
          this.dataCep = resp.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
