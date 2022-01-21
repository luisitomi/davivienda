import { ApiService } from "../services/api.service";
export const EnvironmentServiceFactory = (): any => {
  // Create env
  const env: any = new ApiService();
  const envt: any = '__env';

  // Read environment variables from browser window
  const browserWindow = window || {};
  const browserWindowEnv = browserWindow[envt] || {};
  // Assign environment variables from browser window to env
  // In the current implementation, properties from env.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
      if (browserWindowEnv.hasOwnProperty(key)) {
          env[key] = window[envt][key];
      }
  }
  
  return env;
};

export const EnvironmentServiceProvider = {
  provide: ApiService,
  useFactory: EnvironmentServiceFactory,
  deps: [],
};