import React from 'react'
import './pagination.css'

const Pagination = (props) => {

    const {postsPerPage, totalPosts, paginate, currentPage} =props;

    const pageNumbers=[];
    const length =Math.ceil(totalPosts/postsPerPage);
  
    for(let i=1; i<=length;i++){
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className="pagination"> 
                {pageNumbers.map(number=>(
                    <li key={number} className="page-item">
                        <div onClick={(e)=> paginate(number)} 
                        className={(currentPage === number ? 'active' : '')}>{number}</div>
                    </li>
                ))}
            </ul>  
        </div>
    )
}

export default Pagination
