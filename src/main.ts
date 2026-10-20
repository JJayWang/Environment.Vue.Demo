import { createApp } from "vue";
import App from "./App.vue";
import { loadAppConfig } from "./utils/config-util.ts";

async function bootstrap() {
  await loadAppConfig();

  createApp(App).mount("#app");
}

bootstrap();
