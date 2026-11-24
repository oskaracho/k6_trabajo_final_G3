export const BASE_URL = 'http://srv1311911.hstgr.cloud/financierodiplomado';

export const USUARIO = 'admin';
export const PASSWORD = 'admin*123';

export const GRUPO = 'GRUPO 3';

export const THRESHOLDS = {
    http_req_duration: ['p(95)<1500', 'p(99)<2500'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.99'],
};
