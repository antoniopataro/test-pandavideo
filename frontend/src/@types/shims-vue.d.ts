import { Router } from "vue-router";
import { Store } from "vuex";

import { State } from "../stores/index";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
    $router: Router;
  }
}
