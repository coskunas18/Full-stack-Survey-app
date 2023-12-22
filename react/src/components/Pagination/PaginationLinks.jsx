import React from 'react'
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";


export default function PaginationLinks({ meta, onPageClick }) {

    const onClick = (ev, link) => {
        ev.preventDefault();

        if (!link.url) {
            return;
        }

        onPageClick(link)
    }

    return (
        <div className='mt-10 w-1/2 mx-auto'>
            <div className='bg-slate-300/25 rounded shadow-md p-3'>
                <div className='flex justify-center font-semibold'>
                    Showing {meta.from} to {meta.to} of {meta.total}
                </div>

                {meta.total > meta.per_page && (
                    <div className='flex justify-center item-center gap-3 mt-3 '>
                        {meta.links && meta.links.map((link, index) => (
                            <a onClick={ev => onClick(ev, link)} href="#" aria-current="page" key={index}
                                className={link.active ? "bg-slate-700 text-white border-2 px-2 cursor-pointer"
                                    : 'border-2 px-2 hover:bg-slate-300 cursor-pointer'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            >
                            </a>
                        ))}
                    </div>
                )}


            </div>
        </div>
    )
}
