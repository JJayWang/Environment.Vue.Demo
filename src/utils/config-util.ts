import axios from "axios";

let appConfig: AppConfig | undefined;

export async function loadAppConfig() {
  const response = await axios.get("/app-config.json");
  if (response.status === 200) {
    appConfig = response.data;
  }
}

export function getAppConfig() {
  if (!appConfig) {
    throw new Error("App config has not been loaded");
  }

  return appConfig;
}

export interface AppConfig {
  host: "dev" | "sit" | "prod";
  apiUrl: string;
}
