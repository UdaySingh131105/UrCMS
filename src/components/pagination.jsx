"use client";
import { useRouter } from "next/navigation"

export default function Pagination({ currPage, perPage, totalItems, ...props }) {
    const router = useRouter();
    const totalPage = Math.ceil(totalItems / perPage);

    const handlePageChange = (page) => {
        console.log(currPage, page, ' curr page, page');
        if (page < 1 || page > totalPage) return;
        router.push(`?page=${page}`)
    }
    return <div {...props}>
        <div className="flex gap-2 justify-center">
            <button
                disabled={currPage == 1}
                onClick={() => handlePageChange(parseInt(currPage) - 1)}
                className={`px-2 py-1 border text-gray-400 rounded-md ${currPage == 1 ? "text-gray-700 cursor-not-allowed" : ""}`}
            >
                Prev
            </button>

            {Array.from({ length: totalPage }, (_, index) => {
                const pageNum = index + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => handlePageChange(parseInt(pageNum))}
                        className={`px-2 py-1 text-sm rounded-md hover:bg-gray-400/10 transition-all delay-75 ${currPage == pageNum ? "bg-gray-400/10 border" : ""}`}
                    >
                        {pageNum}
                    </button>
                )
            })}

            <button
                disabled={currPage == totalPage}
                onClick={() => handlePageChange(parseInt(currPage) + 1)}
                className={`px-2 py-1 border text-gray-400 rounded-md ${currPage == totalPage ? "text-gray-700 cursor-not-allowed" : ""}`}
            >
                Next
            </button>

        </div>
    </div>
}