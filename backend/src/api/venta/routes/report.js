module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/ventas/report',
            handler: 'venta.report',
            // config: {
            //     auth: true,
            // }
        }
    ]
}