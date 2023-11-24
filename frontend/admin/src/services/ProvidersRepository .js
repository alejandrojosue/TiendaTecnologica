import { fetchDataFromAPI } from './api/context';

export default class ProvidersRepository {
    async getProviders() {
        try {
          const response = await fetchDataFromAPI('/proveedors', 'GET', sessionStorage.getItem('daiswadod'));
      
          if (!Array.isArray(response.data)) {
            throw new Error('La propiedad "data" en la respuesta del servidor no es un array');
          }
      
          return response.data.map(provider => ({
            id: provider.id,
            name: provider.attributes.nombre,
            rtn: provider.attributes.RTN,
          }));
        } catch (error) {
          console.log('Error al obtener Proveedor', error);
        }
      }      
}
