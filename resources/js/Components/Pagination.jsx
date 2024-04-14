import React from "react";
import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-10">
            {links.map((link, index) => {
                return (
                    <Link
                        preserveScroll="true"
                        key={index}
                        href={link.url || ""}
                        className={clsx(
                            "inline-block py-2 px-4 rounded-xl bg-gray-50 text-gray-700 text-lg",
                            link.active
                                ? "bg-gray-950 cursor-not-allowed text-white"
                                : "",
                            !link.url
                                ? "text-gray-500 cursor-not-allowed"
                                : "hover:bg-gray-300"
                        )}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    ></Link>
                );
            })}
        </nav>
    );
}
