import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class ProductsRepository {
    constructor() {
        if (!ProductsRepository.instance)
            ProductsRepository.instance = this
        return ProductsRepository.instance
    }
    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/productos?populate=deep&sort[0]=existencia:asc')
            return data.map(product => ({
                id: product.id,
                sku: product.attributes.codigo,
                name: product.attributes.nombre,
                description: product.attributes.descripcion,
                discount: product.attributes.descuento,
                quantity: product.attributes.existencia,
                price: product.attributes.precio_venta,
                cost: product.attributes.precio_compra,
                subcategory: product.attributes.subcategorias.data,
                status: product.attributes.activo,
            }))
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    async getById(id) {
        try {
            const { data } = await fetchDataFromAPI(`/productos/${id}?filters[activo]=true&populate=deep`)
            return ({
                sku: data.attributes.codigo,
                name: data.attributes.nombre,
                description: data.attributes.descripcion,
                quantity: data.attributes.existencia,
                subcategory: data.attributes.subcategorias.data,
                img: (data.attributes.img.data.attributes.formats) ? data.attributes.img.data.attributes.formats.thumbnail.url : data.attributes.img.data.attributes.url,
                status: data.attributes.activo,
                priceC: data.attributes.precio_compra,
                priceV: data.attributes.precio_venta,
                model: data.attributes.modelo,
                tax: data.attributes.isv,
                discount: data.attributes.descuento,
                existence: data.attributes.existencia,
                brand: data.attributes.marca.data.attributes.nombre,
                asset: data.attributes.activo,
            })
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    async getByCodigo(sku) {
        try {
            const { data } = await fetchDataFromAPI(`/productos?filters[activo]=true&filters[codigo][$eq]=${sku}`);
            console.log('data', data[0].attributes)
            return ({
                id: data[0].id,
                sku: data[0].attributes.codigo,
                name: data[0].attributes.nombre,
                quantity: data[0].attributes.existencia,
                discount: data[0].attributes.descuento,
                price: data[0].attributes.precio_venta,
                cost: data[0].attributes.precio_compra,
                status: data[0].attributes.activo,
            })
        } catch (error) {
            // Maneja errores de red o del servidor
            console.log('Error al obtener el producto repo:', error.message);
        }
    }

    async update(data, id) {
        try {
            const response = await fetchDataFromAPI(`/productos/${id}`, 'PUT', sessionStorage.getItem('daiswadod'), data);
            if (!response) console.error('Error en repo: No se pudo actualizar producto')
        } catch (error) {
            // Maneja errores de red o del servidor
            console.error('Error al actualizar el producto:', error.message);
        }
    }

    async report(max = 1000) {
        try {
            const { data } = await fetchDataFromAPI(`/productos?pagination[limit]=${max}`)
            return data.map(product => ({
                id: product.id,
                'Código Producto': 'P' + product.attributes.codigo,
                'Nombre Producto': product.attributes.nombre,
                'Descripción': product.attributes.descripcion,
                Descuento: product.attributes.descuento,
                ISV: product.attributes.isv,
                'Existencia Actual': product.attributes.existencia,
                'Precio Unitario': parseFloat(product.attributes.precio_venta).toFixed(2).replace('.', ','),
                'Precio Compra': parseFloat(product.attributes.precio_compra).toFixed(2).replace('.', ','),
                Modelo: product.attributes.modelo,
                Estado: product.attributes.activo ? 'Activo' : 'Inactivo',
            }))
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }
}