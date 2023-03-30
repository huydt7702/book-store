import * as httpRequest from '~/utils/httpRequest';

export const getAllCategories = async () => {
    try {
        const res = await httpRequest.get('v1/category');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addCategory = async (formData) => {
    try {
        const res = await httpRequest.post('v1/category/add', formData);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteCategory = async (id) => {
    try {
        const res = await httpRequest.deleteOne(`v1/category/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const updateCategory = async (id, formData) => {
    try {
        const res = await httpRequest.update(`v1/category/update/${id}`, formData);
        return res;
    } catch (error) {
        console.log(error);
    }
};
