import React, { useEffect, useState } from "react";
import { InputCompt } from "../../components/InputCompt";
import { Link, useNavigate, useParams } from "react-router-dom";
import ItemService from "../../services/ItemService";

const Edit = () => {
    const params = useParams();
    const [item, setItem] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        ItemService.update(params?.id, {
            item_name: item,
        })
            .then((res) => {
                navigate("/item");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        ItemService.findByid(params?.id)
            .then((res) => {
                setItem(res?.data?.data?.item_name);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="container mx-auto  py-5">
            <div className="flex justify-between mb-5">
                <h1>Edit Barang</h1>
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

export default Edit;
