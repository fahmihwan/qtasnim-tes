import httpCommon from "../http-common";

const getAll = (url) => httpCommon.get(url);

const getAllList = () => httpCommon.get("/category/list");

const remove = (id) => httpCommon.delete(`/category/${id}`);

const create = (data) => httpCommon.post(`/category`, data);

const findByid = (id) => httpCommon.get(`/category/${id}`);

const update = (id, data) => httpCommon.put(`/category/${id}`, data);

const CategoryService = {
    getAll,
    getAllList,
    remove,
    create,
    findByid,
    update,
};

export default CategoryService;
