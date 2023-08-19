import httpCommon from "../http-common";

const getAll = (url) => httpCommon.get(url);

const getAllList = () => httpCommon.get("/item/list");

const remove = (id) => httpCommon.delete(`/item/${id}`);

const create = (data) => httpCommon.post(`/item`, data);

const findByid = (id) => httpCommon.get(`/item/${id}`);

const update = (id, data) => httpCommon.put(`/item/${id}`, data);

const ItemService = {
    getAll,
    getAllList,
    remove,
    create,
    findByid,
    update,
};

export default ItemService;
