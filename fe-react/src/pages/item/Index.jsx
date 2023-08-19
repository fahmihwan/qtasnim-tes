import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemService from "../../services/ItemService";
import { Pagination } from "../../components/Pagination";
const Home = () => {
    const [data, setData] = useState({});
    const [linkPage, setLinkPage] = useState("/item");

    const fetchData = () => {
        ItemService.getAll(linkPage)
            .then((res) => setData(res?.data?.data))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        fetchData();
    }, [linkPage]);

    const handleDelete = async (id) => {
        let isConfirm = confirm("apakah anda yakin ingin menghapus?");
        if (isConfirm) {
            await ItemService.remove(id);
            fetchData();
        }
    };
    return (
        <div className="container mx-auto  py-5">
            <div className="flex justify-between mb-5">
                <h1>List Barang</h1>
                <Link to="/item/create" className="btn btn-primary">
                    Tambah data
                </Link>
            </div>
            <div className="w-full">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-neutral">
                                <th></th>
                                <th>Nama Barang</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((d, i) => (
                                <tr key={i}>
                                    <th>{data?.from + i}</th>
                                    <td>{d?.item_name}</td>
                                    <td>
                                        <div className="flex">
                                            <Link
                                                to={`/item/${d?.id}/edit`}
                                                className="btn btn-sm btn-warning mr-2"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-sm btn-error"
                                                onClick={() => handleDelete(d?.id)}
                                            >
                                                delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination links={data?.links} totals={data?.total} setLinkPage={setLinkPage} />
                </div>
            </div>
        </div>
    );
};

export default Home;
