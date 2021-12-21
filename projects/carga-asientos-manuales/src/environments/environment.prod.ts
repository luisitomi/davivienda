import { devBackendProvider } from "src/app/core/interceptors/dev-backend.interceptor";

export const environment = {
  production: true
};

export const INTERCEPTORS = [
  devBackendProvider,
];
