module.exports = () => {
    return async (ctx, next) => {
        // ctx.request.notification = false
        if (ctx.request.url === '/') {
            // Redirige a la URL deseada (por ejemplo, "/mi-pagina-personalizada")
            ctx.response.redirect('/home');
        } else {
            // Si no es una solicitud para el panel de administración, pasa al siguiente middleware
            await next();
        }
    };
};
