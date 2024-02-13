import React, { useState } from "react";
import styles from './styles.module.scss'
import IconButton from "shared/ui/iconButton";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
interface PaginationProps {
    currentPage: number,
    onNextPageClick: (page: number) => void;
    onPrevPageClick: (page: number) => void;
    onChangePage: (page: number) => void
    totalItems: number,
    itemsPerPage: number,
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const { currentPage, onNextPageClick, onPrevPageClick, totalItems, itemsPerPage, onChangePage } = props;

    const handleNextPageClick = () => {
        onNextPageClick(currentPage + 1);
    };
    const handlePrevPageClick = () => {
        onPrevPageClick(currentPage - 1);
    };
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    console.log('totalPages ' + totalPages);

    const maxPageNumbersToShow = totalPages == 0 ? 1 : totalPages;
    let startPage = currentPage - 5 < 1 ? 1 : currentPage - 5;
    let endPage = startPage + maxPageNumbersToShow - 1 > totalPages ? totalPages : startPage + maxPageNumbersToShow - 1;

    if (endPage - startPage + 1 < maxPageNumbersToShow && startPage > 1) {
        startPage = endPage - maxPageNumbersToShow + 1;
    }

    const onPageClick = (pageNumber: number) => {
        onChangePage(pageNumber);
    };
    return (
        <div className={styles.paginator}>
            <IconButton className={styles.paginator__btn} onClick={handlePrevPageClick}>
                <IoIosArrowUp size={'1.5rem'} color="#fff"></IoIosArrowUp>
            </IconButton>
            <div className={styles.pageNumberContainer}>
                {Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx).map(pageNumber => (
                    <button
                        key={pageNumber}
                        className={`${styles.pageNumber} ${currentPage === pageNumber ? styles.active : ''}`}
                        onClick={() => onPageClick(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                {
                    totalPages < 10 && Array.from({ length: 10 - totalPages }, (_, idx) => startPage + idx).map(pageNumber => (
                        <button
                            key={pageNumber}
                            className={`${styles.pageNumber} ${styles.inactive} `}
                            onClick={() => onPageClick(pageNumber)}
                        >
                            {pageNumber+1  }
                        </button>
                    ))
                }
                
            </div>
            <IconButton className={styles.paginator__btn} onClick={handleNextPageClick}>
                <IoIosArrowDown size={'1.5rem'} color="#fff"></IoIosArrowDown>
            </IconButton>
        </div>
    );
};

export default Pagination