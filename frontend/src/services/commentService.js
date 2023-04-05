import config from '~/config';
import { logOutSuccess } from '~/redux/authSlice';

export const getAllComments = async (dispatch, navigate, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(`/v1/comment`, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
        dispatch(logOutSuccess());
        navigate(config.routes.auth);
    }
};

export const getAllCommentOfProductId = async (productId, dispatch, navigate, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(`/v1/comment/${productId}`, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
        dispatch(logOutSuccess());
        navigate(config.routes.auth);
    }
};

export const addComment = async (formData, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/v1/comment/add`, formData, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
    }
};

export const deleteComment = async (id, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.delete(`/v1/comment/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
    }
};
