import { defineStore } from "pinia";
import axiosInstances from "src/services/api";
import { route } from "src/services/routes-dictionary";

export const useDashboardStore = defineStore("dashboardStore", {
  state: () => ({
    loadingPost: false,
    posts: [],
  }),
  actions: {
    clearState() {
      this.loadingPost = false;
      this.posts = [];
    },

    async doGetPosts() {
      try {
        this.loadingPost = true;
        const resp = await axiosInstances.api.get(
          `${axiosInstances.api.defaults.baseURL}${route.getPosts}`
        );

        if (resp.status === 200) {
          this.loadingPost = false;
          this.posts = resp.data;
        }
      } catch (err) {
        console.log("err_____", err);
        if (err.response.status != 200) {
          this.loadingPost = false;
        }
      }
    },
  },
});
