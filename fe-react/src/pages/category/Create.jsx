import React, { useState } from "react";
import { InputCompt } from "../../components/InputCompt";
import { Link, useNavigate } from "react-router-dom";
import CategoryService from "../../services/CategoryService";

const Create = () => {
    const [category, setCategory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        CategoryService.create({
            category_name: category,
        })
            .then((res) => {
                navigate("/category");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mx-auto  py-5">
            <div className="flex justify-between mb-5">
                <h1>Tambah Jenis Barang</h1>
                <Link to="/category" className="btn btn-primary">
                    Kembali
                </Link>
            </div>
            <div className="w-full ">
                <div className="card w-full max-w-xl shadow-2xl bg-base-300">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <InputCompt
                                title="Nama Kategori"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
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
