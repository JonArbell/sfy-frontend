const isProduction = true;

const production = 'https://sfy-tnqq.onrender.com/api';

const local = 'http://localhost/api';

export const environment = {
  production: false,
  backendBaseUrlAPI: isProduction ? production : local,
};
