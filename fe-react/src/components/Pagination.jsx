import React from "react";
import { Link } from "react-router-dom";

export const Pagination = ({ links, totals, setLinkPage }) => {
    function getClassName(active) {
        if (active) {
            return "join-item btn btn-primary";
        } else {
            return "join-item btn";
        }
    }

    const getLabel = (text) => {
        let changeLabel = "";
        if (text == "&laquo; Previous") {
            changeLabel = "Previous";
        } else if (text == "Next &raquo;") {
            changeLabel = " Next";
        } else {
            changeLabel = text;
        }
        return changeLabel;
    };

    return (
        links?.length > 3 && (
            <div className="mb-4 pt-10 px-5 flex justify-between items-center ">
                <p className="text-sm text-gray-400">{totals} items </p>
                <div className="join">
                    {links?.map((link, key) =>
                        link?.url === null ? (
                            <button key={key} className="join-item btn btn-disabled">
                                {getLabel(link.label)}
                            </button>
                        ) : (
                            <button
                                key={key}
                                onClick={() => setLinkPage(link?.url)}
                                className={getClassName(link?.active)}
                            >
                                {getLabel(link.label)}
                            </button>
                        )
                    )}
                </div>
            </div>
        )
    );
};
