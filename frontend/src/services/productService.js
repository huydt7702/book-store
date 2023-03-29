import * as httpRequest from '~/utils/httpRequest';

export const getAllProducts = async () => {
    try {
        const res = await httpRequest.get('v1/product');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addProduct = async (formData) => {
    try {
        const res = await httpRequest.post('v1/product/add', formData);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await httpRequest.deleteOne(`v1/product/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = async (id, formData) => {
    try {
        const res = await httpRequest.update(`v1/product/update/${id}`, formData);
        return res;
    } catch (error) {
        console.log(error);
    }
};
