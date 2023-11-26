import { fetchDataFromAPI } from './api/context';

export default class SupplierRepository {
  constructor() {
    if (!SupplierRepository.instance)
      SupplierRepository.instance = this
    return SupplierRepository.instance
  }
  async getAll() {
    try {
      const { data } = await fetchDataFromAPI('/proveedors', 'GET', sessionStorage.getItem('daiswadod'));
      return data.map(supplier => ({
        id: supplier.id,
        name: supplier.attributes.nombre,
        rtn: supplier.attributes.RTN,
      }));
    } catch (error) {
      console.log('Error al obtener Proveedor', error);
    }
  }
}
