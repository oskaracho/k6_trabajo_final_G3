import { SharedArray } from 'k6/data';

export const movimientos = new SharedArray('movimientos', () => {
    return JSON.parse(open('./movimientos.json'));
});
