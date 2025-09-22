// src/apiService.ts
import axiosInstance from './AxiosInstance';

export class ProductService {

    API_BASE_URL = 'http://localhost:3000/api/search';

    searchByCode = async (code: string): Promise<any> => {
        const response = await axiosInstance.get(`${this.API_BASE_URL}/${code}`);
        return response.data;
    };

}
