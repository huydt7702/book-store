import * as httpRequest from '~/utils/httpRequest';

export const getAllCategories = async () => {
    try {
        const res = await httpRequest.get('v1/category');
        return res;
    } catch (error) {
        console.log(error);
    }
};
