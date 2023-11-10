import { defineStore } from "pinia";
import api from "src/services/api";
import { route } from "src/services/routes-dictionary";

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    loadingPost: false,
    posts: [],
  }),
  actions: {
    clearState() {},

    async doGetPosts() {
      try {
        this.loadingPost = true;
        const resp = await api.get(`${api.defaults.baseURL}${route.getPosts}`);

        if (resp.status === 200) {
          this.loadingPost = false;
          this.posts = resp.data;
        }
      } catch (err) {
        if (err.response.status != 200 && 204) {
          this.loadingPost = false;
        }
      }
    },
  },
});
