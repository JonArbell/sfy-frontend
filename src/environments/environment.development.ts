const isProduction = false;

const production = 'https://sfy-tnqq.onrender.com/api';

const local = 'http://localhost:8000/api';

export const environment = {
  production: false,
  backendBaseUrlAPI: isProduction ? production : local,
};
