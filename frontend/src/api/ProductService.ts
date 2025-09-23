import axiosInstance from './AxiosInstance';

export class ProductService {

    API_BASE_URL = process.env.REACT_APP_API_URL + '/search' || 'http://localhost:3001/search';

    searchByCode = async (code: string): Promise<any> => {
        const response = await axiosInstance.get(`${this.API_BASE_URL}/${code}`);
        return response.data;
    };

}
