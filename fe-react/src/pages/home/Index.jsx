import React, { useState } from "react";
import { useEffect } from "react";
import HomeService from "../../services/HomeService";
import { Pagination } from "../../components/Pagination";

import { InputCompt } from "../../components/InputCompt";
const Index = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [linkPage, setLinkPage] = useState("/home");

    const fetchData = () => {
        HomeService.getAll(linkPage)
            .then((res) => {
                setData(res?.data?.data);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchData();
    }, [linkPage]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLinkPage(`/home?start-date=${startDate}&end-date=${endDate}`);
    };
    return (
        <div className="container mx-auto  py-5">
            <div className="flex justify-between mb-5">
                <h1>Home</h1>
            </div>
            <div className="w-full flex">
                <div className="overflow-x-auto w-2/3 p-5">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className="bg-neutral">
                                <th></th>
                                <th>Jenis Barang</th>
                                <th>Transaksi Terbanyak</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((d, i) => (
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <td>{d?.category_name}</td>
                                    <td>{d?.qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination links={data?.links} totals={data?.total} setLinkPage={setLinkPage} />
                </div>
                <div className="w-1/3 p-5">
                    <div className="card bg-base-300">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <InputCompt
                                    title="Tanggal Mulai"
                                    onChange={(e) => setStartDate(e.target.value)}
                                    value={startDate}
                                    type="date"
                                />
                                <InputCompt
                                    title="Tanggal Selesai"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={endDate}
                                    type="date"
                                />
                                <button className="btn btn-primary mt-5">cari</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
