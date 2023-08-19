import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { InputCompt, SelectCompt, SelectEditCompt } from "../../components/InputCompt";
import { useEffect } from "react";
import ItemService from "../../services/ItemService";
import CategoryService from "../../services/CategoryService";
import DetailItemService from "../../services/DetailItemService";

const Edit = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [listItem, setListItem] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [itemId, setItemId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [stock, setStock] = useState("");
    const [salesQty, setSalesQty] = useState("");
    const [transactionDate, setTransactionDate] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            item_id: itemId,
            category_id: categoryId,
            stock: stock,
            sales_qty: salesQty,
            transaction_date: transactionDate,
        });
        // setIsSubmitting(true);
        // DetailItemService.create({
        //     item_id: itemId,
        //     category_id: itemId,
        //     stock: stock,
        //     sales_qty: salesQty,
        //     transaction_date: transactionDate,
        // })
        //     .then((res) => {
        //         navigate("/");
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setIsSubmitting(false);
        //     });
    };
    const fetchItem = async () => {
        try {
            const response = await ItemService.getAllList();
            // return response;
            setListItem(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchCategory = async () => {
        try {
            const response = await CategoryService.getAllList();
            setListCategory(response?.data?.data);
            // setCategoryId(response.data.data?.id);
        } catch (error) {
            console.log(error);
        }
    };
    const fetDetail = async () => {
        // await fetchItem()
        //     .then((res) => setListItem(res?.data?.data))
        //     .catch((err) => console.log(err));
        // await fetchCategory()
        //     .then((res) => setListCategory(res?.data?.data))
        //     .catch((err) => console.log(err));
        await fetchItem();
        await fetchCategory();
        await DetailItemService.findByid(params?.id)
            .then((res) => {
                let data = res?.data?.data;
                console.log(data);
                setCategoryId(data?.category_id);
                setItemId(data?.item_id);
                setStock(data?.stock);
                setSalesQty(data?.sales_qty);
                setTransactionDate(data?.transaction_date);
                // setCategory(res?.data?.data?.category_name);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetDetail();
    }, []);

    return (
        <div className="container mx-auto  py-5">
            <div className="flex justify-between mb-5">
                <h1>Tambah Transaksi</h1>
                <Link to="/transaction" className="btn btn-primary">
                    Kembali
                </Link>
            </div>
            <div className="w-full ">
                <div className="card w-2/3 p-5 shadow-2xl bg-base-300">
                    <div className="card-body ">
                        <form onSubmit={handleSubmit}>
                            <div className="w-full flex">
                                <div className="w-1/2 mr-10">
                                    <SelectEditCompt
                                        title="Nama Barang"
                                        options={listItem}
                                        onChange={(e) => setItemId(e.target.value)}
                                        value={itemId}
                                    />
                                    <SelectEditCompt
                                        title="Jenis Barang"
                                        options={listCategory}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        value={categoryId}
                                    />
                                    <InputCompt
                                        title="Stok"
                                        onChange={(e) => setStock(e.target.value)}
                                        value={stock}
                                        type="number"
                                    />
                                </div>
                                <div className="w-1/2">
                                    <InputCompt
                                        title="Jumlah Terjual"
                                        onChange={(e) => setSalesQty(e.target.value)}
                                        value={salesQty}
                                        type="number"
                                    />
                                    <InputCompt
                                        title="Tanggal Transaksi"
                                        onChange={(e) => setTransactionDate(e.target.value)}
                                        value={transactionDate}
                                        type="date"
                                    />
                                    <div className="form-control mt-6">
                                        <button disabled={isSubmitting} className="btn btn-primary">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
