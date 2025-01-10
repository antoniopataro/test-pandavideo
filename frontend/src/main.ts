import { createApp } from "vue";

import { router } from "./router/index";
import { store } from "./stores";
import { vuetify } from "./plugins/vuetify";

import App from "./app.vue";

import "./styles/fonts.scss";
import "./styles/reset.scss";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.mount("#app");
