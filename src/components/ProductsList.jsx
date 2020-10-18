import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../redux/product/productActions";
import Pagination from './Pagination';

const ProductsList = (props) => {
  const productData = useSelector((state) => state.productList);
  const { loading, products, count, limit, error } = productData;
  const dispatch = useDispatch();
  
  
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";

 //For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage]= useState(6);



  useEffect(() => {

    dispatch(listProducts(category, searchKeyword, sortOrder, currentPage, postsPerPage));

  }, [category, searchKeyword, sortOrder, currentPage, postsPerPage]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   setCurrentPage(1);
  //   dispatch(listProducts(category, searchKeyword, sortOrder, currentPage, postsPerPage));
  // };

  const sortHandler = (e) => {
    e.preventDefault();
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder, currentPage, postsPerPage));
  };

  const searchKeyWordHandler = (e) => {
    // setPostsPerPage(count);
    e.preventDefault();
    setSearchKeyword(e.target.value);
    setCurrentPage(1);
    console.log("products size ", products)
    dispatch(listProducts(category, searchKeyword, sortOrder, currentPage, postsPerPage));
  };


  const itemsPerPageHandler = (e) => {
    e.preventDefault();
    const {value} = e.target;
    setPostsPerPage(value);
    setCurrentPage(1);

    dispatch(listProducts(category, searchKeyword, sortOrder, currentPage, postsPerPage));
  };

  const handlePageChange =(pageNumber)=>{
    setCurrentPage(pageNumber);
    dispatch(listProducts(category,searchKeyword, sortOrder, currentPage, postsPerPage));
 }


  return (
    <>
      {category && <h2>{category}</h2>}
      <ul className="filter">
        <li>
          <form>
            <input
              name="searchKeyword"
              onChange={searchKeyWordHandler}
              placeholder="Search"
            />
            {/* <button type="submit">Search</button> */}
          </form>
        </li>
        <li>
          <select value={sortOrder} name="sortOrder" onChange={sortHandler}>
            <option defaultValue>Sort By </option>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
        <li>
          <select value={postsPerPage} name="itemsPerPage"  style={{textAlign:"center"}} onChange={ itemsPerPageHandler}>
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div> Loading...</div>
      ) : error ? (
        <div>Error!</div>
      ) : (
        <div>
          <ul className="products">
            {productData &&
              productData.products &&
              products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <Link to={"/product/" + product._id}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt={product.name}
                      />
                    </Link>
                    <div className="product-name">
                      <Link to={"/product/" + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">
                      {Number(product.rating.toFixed(2))} Stars (
                      {product.numReviews} reviews)
                    </div>
                  </div>
                </li>
              ))}
          </ul>
           <Pagination postsPerPage={limit} totalPosts ={count}  currentPage={currentPage}
            paginate={(currentPage) =>handlePageChange(currentPage)}></Pagination>
        </div>
      )}
    </>
  );
};

export default ProductsList;
