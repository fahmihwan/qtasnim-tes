import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DetailItemService from "../../services/DetailItemService";
import { Pagination } from "../../components/Pagination";

const Home = () => {
    const [data, setData] = useState({});
    const [linkPage, setLinkPage] = useState("/detail-item");
    const [search, setSearch] = useState("");
    const [sortItem, setSortItem] = useState("");
    const [sortDateTransaction, setSortDateTransaction] = useState("");

    const fetchData = () => {
        DetailItemService.getAll(linkPage)
            .then((res) => setData(res?.data?.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, [linkPage]);

    const handleDelete = async (id) => {
        let isConfirm = confirm("apakah anda yakin ingin menghapus?");
        if (isConfirm) {
            await DetailItemService.remove(id);
            fetchData();
        }
    };

    const handleSortItem = (value) => {
        // let link = "";
        // if (linkPage.includes("sort-item")) {
        //     link = linkPage + "?sort-item=" + value;
        // } else {
        //     link = link.replace("/detail-item/");
        // }
        // setLinkPage(link);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        setLinkPage(`/detail-item/?search=${search}`);
    };
    return (
        <div className="container mx-auto  py-5">
            <div className="flex justify-between mb-5">
                <h1>Transaksi</h1>
                <Link to="/transaction/create" className="btn btn-primary">
                    Tambah data
                </Link>
            </div>
            <div className="w-full">
                <div className="join mb-5">
                    <form onSubmit={handleSearch}>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-bordered join-item"
                            placeholder="Search"
                        />
                        <button className="btn join-item ">Search</button>
                    </form>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className="bg-neutral">
                                <th></th>
                                <th>
                                    <div className="flex justify-between items-center">
                                        <span>Nama Barang</span>
                                        <div className="flex flex-col">
                                            <button
                                                onClick={() => handleSortItem("asc")}
                                                className="btn-success mb-1"
                                            >
                                                &#9650;
                                            </button>
                                            <button
                                                onClick={() => handleSortItem("desc")}
                                                className="btn-success"
                                            >
                                                &#9660;
                                            </button>
                                        </div>
                                    </div>
                                </th>
                                <th>Stock</th>
                                <th>Jumlah Terjual</th>
                                <th>
                                    <div className="flex justify-between items-center">
                                        <span>Tanggal Transaksi</span>
                                        <div className="flex flex-col">
                                            <button className="btn-success mb-1">&#9650;</button>
                                            <button className="btn-success">&#9660;</button>
                                        </div>
                                    </div>
                                </th>
                                <th>Jenis Barang</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((d, i) => (
                                <tr key={i}>
                                    <th>{data?.from + i}</th>
                                    <td>{d?.item_name}</td>
                                    <td>{d?.stock}</td>
                                    <td>{d?.sales_qty}</td>
                                    <td>{d?.transaction_date}</td>
                                    <td>{d?.category_name}</td>
                                    <td>
                                        <div className="flex">
                                            <Link
                                                to={`/transaction/${d?.id}/edit`}
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
