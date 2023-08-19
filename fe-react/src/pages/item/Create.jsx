import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputCompt } from "../../components/InputCompt";
import ItemService from "../../services/ItemService";

const Create = () => {
    const [item, setItem] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        ItemService.create({
            item_name: item,
        })
            .then((res) => {
                navigate("/item");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mx-auto  py-5">
            <div className="flex justify-between mb-5">
                <h1>Tambah Barang</h1>
                <Link to="/item" className="btn btn-primary">
                    Kembali
                </Link>
            </div>
            <div className="w-full ">
                <div className="card w-full max-w-xl shadow-2xl bg-base-300">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <InputCompt
                                title="Nama Barang"
                                onChange={(e) => setItem(e.target.value)}
                                value={item}
                            />
                            <div className="form-control mt-6">
                                <button disabled={isSubmitting} className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
