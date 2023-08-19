import httpCommon from "../http-common";

const getAll = (url) => httpCommon.get(url);

const HomeService = {
    getAll,
};

export default HomeService;
