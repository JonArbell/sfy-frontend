const isProduction = true;

const production = 'https://sfy-tnqq.onrender.com';

const local = 'http://localhost:8000';

export const environment = {
  production: false,
  backendBaseUrlAPI: isProduction ? `${production}/api` : `${local}/api`,
  backendBaseUrlCopy: isProduction ? production : local,
};
