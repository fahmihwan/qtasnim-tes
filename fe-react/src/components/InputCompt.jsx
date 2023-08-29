import React, { useState } from "react";

export const InputCompt = ({ title, onChange, value, type = "text" }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <input
                type={type}
                placeholder={title}
                onChange={onChange}
                value={value}
                required={true}
                className="input input-bordered"
            />
        </div>
    );
};

export const SelectCompt = ({ title, options, onChange, value }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <select
                className="select select-bordered w-full "
                defaultValue={value == null ? "disabled" : value}
                onChange={onChange}
                required={true}
            >
                <option disabled value={"disabled"}>
                    -- Pilih --
                </option>
                {options?.map((d, i) => (
                    <option key={i} value={d.id}>
                        {d?.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
export const SelectEditCompt = ({ title, options, onChange, value }) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">{title}</span>
            </label>
            <select
                className="select select-bordered w-full "
                value={value}
                onChange={onChange}
                required={true}
            >
                {options?.map((d, i) => (
                    <option key={i} value={d.id}>
                        {d?.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
