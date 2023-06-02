import config from '~/config';
import { logOutSuccess } from '~/redux/authSlice';

export const getAllCategories = async (dispatch, navigate, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/v1/category', {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
        dispatch(logOutSuccess());
        navigate(config.routes.auth);
    }
};

export const addCategory = async (formData, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/v1/category/add`, formData, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
    }
};

export const deleteCategory = async (id, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.delete(`/v1/category/delete/${id}`, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
    }
};

export const updateCategory = async (id, formData, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(`/v1/category/update/${id}`, formData, {
            headers: { token: `Bearer ${accessToken}` },
        });

        return res;
    } catch (err) {
        console.log(err);
    }
};
