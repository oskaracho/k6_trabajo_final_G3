import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, GRUPO } from '../config/config.js';

export function entrarContabilidad() {
    http.get(`${BASE_URL}/modulo.php?codigo=3`, { redirects: 0 });
}

export function abrirRegistro() {
    const res = http.get(`${BASE_URL}/comprobantes/register.php`);

    check(res, {
        'Registro status 200': (r) => r.status === 200,
        'Es el formulario de comprobante': (r) => r.body.includes('formRegComp'),
    });

    const gestion = res.body.match(/name="global_gestion"[^>]*value="([^"]*)"/);
    const mes = res.body.match(/name="global_mes"[^>]*value="([^"]*)"/);
    const unidad = res.body.match(/name="unidad_organizacional"[^>]*value="([^"]*)"/);
    const configIva = res.body.match(/name="cod_cuenta_configuracion_iva"[^>]*value="([^"]*)"/);

    const cabecera = {
        gestion: gestion ? gestion[1] : '',
        mes: mes ? mes[1] : '',
        unidad: unidad ? unidad[1] : '',
        configIva: configIva ? configIva[1] : '',
    };

    console.log(`Cabecera correlacionada -> gestion: ${cabecera.gestion}, mes: ${cabecera.mes}`);
    return cabecera;
}

function construirComprobante(cab, mov) {
    const mes = cab.mes.length < 2 ? '0' + cab.mes : cab.mes;
    const fecha = `${cab.gestion}-${mes}-01`;

    return {
        validacion_libretas: '1',
        cantidad_filas: '2',
        codigo_comprobante: '0',
        codigo_iva_direfido: '0',
        cod_cuenta_configuracion_iva: cab.configIva,
        cod_sis_configuracion: '0',
        global_gestion: cab.gestion,
        global_mes: cab.mes,
        gestion: cab.gestion,
        unidad_organizacional: cab.unidad,
        tipo_comprobante: '3',
        nro_correlativo: '0',
        fecha: fecha,
        pagado_a: `PRUEBA ${GRUPO}`,
        glosa: `COMPROBANTE DEMO ${GRUPO} - PRUEBA PERFORMANCE`,
        validar_factura: 'on',
        nit_fac: '',
        unidad1: '1', area1: '1', cuenta1: `${mov.cuentaDebe}`,
        cuenta_auxiliar1: '0', cod_detallelibreta1: '0', cod_detallesolicitudsis1: '0',
        cod_actividadproyecto1: '0', cod_accnum1: '0',
        debe1: `${mov.monto}`, haber1: '0',
        cod_tipo_cheque1: '', nro_cheque1: '', glosa_detalle1: `TRASPASO ${GRUPO} DEBE`,
        unidad2: '1', area2: '1', cuenta2: `${mov.cuentaHaber}`,
        cuenta_auxiliar2: '0', cod_detallelibreta2: '0', cod_detallesolicitudsis2: '0',
        cod_actividadproyecto2: '0', cod_accnum2: '0',
        debe2: '0', haber2: `${mov.monto}`,
        cod_tipo_cheque2: '', nro_cheque2: '', glosa_detalle2: `TRASPASO ${GRUPO} HABER`,
        totaldeb: `${mov.monto}.00`, totalhab: `${mov.monto}.00`, total_dif: '0.00',
        tipo_documento_otro: '-100', cantidad_archivosadjuntos: '0',
    };
}

export function generarComprobante(cab, mov) {
    const res = http.post(`${BASE_URL}/comprobantes/save.php`, construirComprobante(cab, mov));

    const match = res.body.match(/imp\.php\?comp=(\d+)/);
    const idComprobante = match ? match[1] : null;
    console.log(`Comprobante generado -> id: ${idComprobante}`);

    check(res, {
        'Guardar status 200': (r) => r.status === 200,
        'Comprobante creado (devuelve id)': () => idComprobante !== null,
        'Comprobante responde en menos de 3s': (r) => r.timings.duration < 3000,
    });
}
