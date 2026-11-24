import { THRESHOLDS } from '../config/config.js';
import { flujoComprobante } from '../lib/flujo.js';

export const options = {
    stages: [
        { duration: '10s', target: 5 },
        { duration: '20s', target: 100 },
        { duration: '20s', target: 100 },
        { duration: '15s', target: 5 },
        { duration: '10s', target: 0 },
    ],
    thresholds: THRESHOLDS,
};

export default function () {
    flujoComprobante();
}
