const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/WelcomeTest.vue") }],
  },
  {
    path: "/todo-list",
    component: () => import("src/pages/TodoList.vue"),
  },
  {
    path: "/cadastro",
    component: () => import("src/pages/DynamicForm.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("src/pages/DashboardT.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
