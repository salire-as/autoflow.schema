export const loadEnvs = (envs: Record<string, string>) => {
  Object.entries(envs).forEach(([key, value]) => {
    process.env[key] = value;
  });
};
