import { group, sleep } from 'k6';
import { movimientos } from '../data/movimientos.js';
import { login } from './auth.js';
import { entrarContabilidad, abrirRegistro, generarComprobante } from './comprobante.js';

export function flujoComprobante() {
    group('Login', function () {
        login();
        entrarContabilidad();
    });

    let cabecera;
    group('Abrir registro', function () {
        cabecera = abrirRegistro();
    });

    const mov = movimientos[Math.floor(Math.random() * movimientos.length)];

    group('Generar comprobante', function () {
        generarComprobante(cabecera, mov);
    });

    sleep(1);
}
