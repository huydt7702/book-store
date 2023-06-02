import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await httpRequest.post(path, options);
    return response;
};

export const deleteOne = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response;
};

export const update = async (path, formData) => {
    const response = await httpRequest.put(path, formData);
    return response;
};

export default httpRequest;
