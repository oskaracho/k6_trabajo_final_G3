import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, USUARIO, PASSWORD } from '../config/config.js';

export function login() {
    const res = http.post(`${BASE_URL}/session.php`, { user: USUARIO, password: PASSWORD }, { redirects: 0 });

    check(res, {
        'Login redirige a index (302)': (r) => r.status === 302,
        'Login responde en menos de 2s': (r) => r.timings.duration < 2000,
    });
}
