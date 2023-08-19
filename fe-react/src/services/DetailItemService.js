import httpCommon from "../http-common";

const getAll = (url) => httpCommon.get(url);

const remove = (id) => httpCommon.delete(`/detail-item/${id}`);

const create = (data) => httpCommon.post(`/detail-item`, data);

const findByid = (id) => httpCommon.get(`/detail-item/${id}`);

const update = (id, data) => httpCommon.put(`/detail-item/${id}`, data);

const DetailItemService = {
    getAll,
    remove,
    create,
    findByid,
    update,
};

export default DetailItemService;
