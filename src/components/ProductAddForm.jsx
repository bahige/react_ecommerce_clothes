import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../redux/product/productActions";
import Modal from "react-modal";
import Pagination from "./Pagination";
import axios from 'axios';

Modal.setAppElement("#root");


function ProductAddForm(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  // For image uploading
  const [uploading, setUploading] = useState(false);

     //For pagination
     const [currentPage, setCurrentPage] = useState(1);
     const [postsPerPage, setPostsPerPage]= useState(10);
     const [cat, setCat]= useState();
     const [searchKeyword, setSearchKeyWord]= useState();
     const [sortOrder, setSortOrder]= useState();

     const url = "http://localhost:3200/api";


  const productList = useSelector((state) => state.productList);
  const { products, count, limit } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  const dispatch = useDispatch();

  const handlePageChange =(pageNumber)=>{
    setCurrentPage(pageNumber);
    dispatch(listProducts(cat, searchKeyword, sortOrder, currentPage, postsPerPage));

 }

  useEffect(() => {
    setPostsPerPage(10);
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts(cat, searchKeyword, sortOrder, currentPage, postsPerPage));
    
    return () => {
      //
    };
  }, [successDelete, productSave, currentPage]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
    setModalVisible(false);
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };


  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post(url + '/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  //////////////////////////////////////////////////////////

  return (
    <div className="content content-margined ">
      <div className="product-header">
        <h3>Products</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Create Product
        </button>
      </div>
      <Modal
        isOpen={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <div className="form modal-margin">
          <form onSubmit={submitHandler} >
            <ul className="form-container">
              <li>
                <h2>Create Product</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name || ""}
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  value={price || ""}
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  required
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                {/* <input
                  type="text"
                  name="image"
                  value={image || ""}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                  required
                ></input> */}
                <input type="file" id="image" required 
                name="image"  onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={brand || ""}
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                  required
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock || ""}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                  required
                ></input>
              </li>
              <li>
                <label htmlFor="name">Category</label>
                <input
                  type="text"
                  name="category"
                  value={category || ""}
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description || ""}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
              </li>
            </ul>
          </form>
        </div>
      </Modal>

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {productList &&
              productList.products &&products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className="button" onClick={() => openModal(product)}>
                    Edit
                  </button>{" "}
                  <button
                    className="button"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {<Pagination postsPerPage={limit} totalPosts ={count} currentPage={currentPage}
            paginate={(currentPage) =>handlePageChange(currentPage)}></Pagination>}
    </div>
  );
}
export default ProductAddForm;
