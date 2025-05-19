import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ProductPagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        for (let page = 1; page <= totalPages; page++) {
            items.push(
                <PaginationItem key={page}>
                    <PaginationLink
                        
                        isActive={page === currentPage}
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(page);
                        }}>
                        {page}
                    </PaginationLink>
                </PaginationItem>,
            );
        }
        return items;
    };

    return (
        <Pagination className="my-10">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePrevious();
                        }}
                    />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleNext();
                        }}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default ProductPagination;
