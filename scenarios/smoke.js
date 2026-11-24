import { THRESHOLDS } from '../config/config.js';
import { flujoComprobante } from '../lib/flujo.js';

export const options = {
    vus: 1,
    duration: '10s',
    thresholds: THRESHOLDS,
};

export default function () {
    flujoComprobante();
}
