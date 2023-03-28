import * as httpRequest from '~/utils/httpRequest';

export const getAllProducts = async () => {
    try {
        const res = await httpRequest.get('v1/product');
        return res;
    } catch (error) {
        console.log(error);
    }
};
