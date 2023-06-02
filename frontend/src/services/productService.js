import config from '~/config';
import { logOutSuccess } from '~/redux/authSlice';

export const getAllProducts = async (dispatch, navigate, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/v1/product', {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
        dispatch(logOutSuccess());
        navigate(config.routes.auth);
    }
};

export const getProductBySlug = async (slug, dispatch, navigate, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(`/v1/product/${slug}`, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
        dispatch(logOutSuccess());
        navigate(config.routes.auth);
    }
};

export const addProduct = async (formData, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/v1/product/add`, formData, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
    }
};

export const deleteProduct = async (id, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.delete(`/v1/product/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
    }
};

export const updateProduct = async (id, formData, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(`/v1/product/update/${id}`, formData, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
    }
};
