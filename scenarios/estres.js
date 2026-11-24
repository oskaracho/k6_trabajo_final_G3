import { THRESHOLDS } from '../config/config.js';
import { flujoComprobante } from '../lib/flujo.js';

export const options = {
    stages: [
        { duration: '1m', target: 50 },
        { duration: '2m', target: 150 },
        { duration: '2m', target: 300 },
        { duration: '30s', target: 0 },
    ],
    thresholds: THRESHOLDS,
};

export default function () {
    flujoComprobante();
}
