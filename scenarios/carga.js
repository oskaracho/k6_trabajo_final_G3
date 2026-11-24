import { THRESHOLDS } from '../config/config.js';
import { flujoComprobante } from '../lib/flujo.js';

export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '1m', target: 10 },
        { duration: '20s', target: 0 },
    ],
    thresholds: THRESHOLDS,
};

export default function () {
    flujoComprobante();
}
