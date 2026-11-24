# k6 - Trabajo Final (Grupo 3)

Pruebas de rendimiento del flujo de generación de comprobantes contables (Traspasos) del sistema financiero.

## Flujo probado

1. Inicio de sesión.
2. Acceso al módulo Contabilidad.
3. Apertura del formulario de comprobantes.
4. Generación de un comprobante.

## Escenarios

- Smoke: 1 usuario para validación rápida.
- Carga: carga sostenida nominal.
- Spike: aumento súbito de usuarios.
- Estrés: búsqueda del punto de quiebre.

## Ejecución

```bash
k6 run scenarios/smoke.js
k6 run scenarios/carga.js
k6 run scenarios/spike.js
k6 run scenarios/estres.js
```

Los parámetros se configuran en `config/config.js`.
