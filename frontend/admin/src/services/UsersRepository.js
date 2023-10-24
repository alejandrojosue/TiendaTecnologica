import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class UsersRepository {
    async getCustomersByRTN(rtn) {
        try {
            const data =
                await fetchDataFromAPI(`/users?populate=deep&filters[role][name][$eq]=Clientes&filters[RTN][$eq]=${rtn}`,
                    'GET',
                    sessionStorage.getItem('daiswadod'))
            if (data.length)
                return ({
                    id: data[0].id,
                    name: `${data[0].nombre} ${data[0].apellido}`,
                    isLegal: data[0].jurado,
                })
        } catch (error) {
            console.log('Error al obtener Cliente', error);
        }
    }
}