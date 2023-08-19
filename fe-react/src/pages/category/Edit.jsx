import React, { useEffect, useState } from "react";
import { InputCompt } from "../../components/InputCompt";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CategoryService from "../../services/CategoryService";

const Edit = () => {
    const params = useParams();
    const [category, setCategory] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        CategoryService.update(params?.id, {
            category_name: category,
        })
            .then((res) => {
                navigate("/category");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        CategoryService.findByid(params?.id)
            .then((res) => {
                setCategory(res?.data?.data?.category_name);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container mx-auto  py-5">
            <div className="flex justify-between mb-5">
                <h1>Edit Jenis Barang</h1>
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

export default Edit;
