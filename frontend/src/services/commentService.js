import * as httpRequest from '~/utils/httpRequest';

export const getAllCommentOfProductId = async (productId) => {
    try {
        const res = await httpRequest.get(`v1/comment/${productId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const addComment = async (formData) => {
    try {
        const res = await httpRequest.post('v1/comment/add', formData);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const deleteComment = async (id) => {
    try {
        const res = await httpRequest.deleteOne(`v1/comment/delete/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
