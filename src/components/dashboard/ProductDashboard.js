import React, { useState, useEffect } from 'react';
import './dashboard.css';
import axios from 'axios';
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem"; 
import "bootstrap/dist/css/bootstrap.min.css";

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
export default function ProductDashboard({ productList }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed
  const [displayedProducts, setDisplayedProducts] = useState([]);
 const [open, setOpen] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
  const now = new Date();
const [success, setSuccess] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    subCategoryName: "",
    subCategoryId: "",
    productName: "",
    productImage: "",
    productColor: "",
    description: "",
    productPrice: 0,
    sku: 0,
    weight: 0,
    addedDate: now,
  });
  const handleEditClick = (product) => {
    setEditingProductId(product.productId);
    setEditedProduct({ ...product }); // Create a copy to avoid mutating original data
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/Products/${editedProduct.productId}`;
      await axios.put(url, editedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Handle success, e.g., show a success message
      setEditingProductId(null);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show an error message
    }
  };

  const handleDiscardChanges = () => {
    setEditingProductId(null);
  };
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          "https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/subcategories"
        ); 
        setSubcategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubcategories();
  }, []);
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedProducts(productList.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, productList]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); 
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const totalPages = Math.ceil(productList.length / itemsPerPage);
const handleDeleteClick = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    const url = `https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/Products/${productId}`;
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSuccess(false);
    setOpen(true); 
  } catch (error) {
    console.error(error);
  }
};
const handleCreateProduct = async () => {
  try {
    const token = localStorage.getItem("token");
    const url = `https://sda-3-online-backend-teamwork-1xdo.onrender.com/api/v1/Products`;
    await axios.post(url, newProduct, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Handle success, e.g., show a success message, clear newProduct state
    setSuccess(true);
  setOpen(true);
    setNewProduct({
      subCategoryName: "",
      subCategoryId: "",
      productName: "",
      productImage: "",
      productColor: "",
      description: "",
      productPrice: "",
      sku: "",
      weight: "",
      addedDate: now,
    });
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <table className="producttable">
        <thead className="theadproduct">
          <tr>
            <th className="trproduct">Sub Category</th>
            <th className="trproduct">Product Name</th>
            <th className="trproduct">Added Date</th>
            <th className="trproduct">Product Image</th>
            <th className="trproduct">Product Color</th>
            <th className="trproduct">Description</th>
            <th className="trproduct">Product Price</th>
            <th className="trproduct">SKU</th>
            <th className="trproduct">Weight</th>
            <th className="trproduct"></th>
            <th className="trproduct"></th>
          </tr>
        </thead>
        <tbody className="tbodyproducts">
          {displayedProducts.map((row) => (
            <tr key={row.productId}>
              <td className="trproduct">{row.subCategoryName}</td>
              <td className="trproduct">{row.productName}</td>
              <td className="trproduct">{row.addedDate}</td>
              <td className="trproduct">
                <img className="productadminimg" src={row.productImage} />
              </td>
              <td className="trproduct">{row.productColor}</td>
              <td className="trproduct">{row.description}</td>
              <td className="trproduct">{row.productPrice}</td>
              <td className="trproduct">{row.sku}</td>
              <td className="trproduct">{row.weight}</td>
              <td className="trproduct">
                {editingProductId === row.productId ? (
                  <>
                    <input
                      type="text"
                      value={editedProduct.subCategoryName}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          productName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.productName}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          productName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.productImage}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          productName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.productColor}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          productName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.description}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          productName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.productPrice}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          productName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.sku}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          productName: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      value={editedProduct.weight}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          productName: e.target.value,
                        })
                      }
                    />

                    <button onClick={handleSaveChanges}>Save Changes</button>
                    <button onClick={handleDiscardChanges}>
                      Discard Changes
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleEditClick(row)}
                    style={{ padding: "3px 10px" }}
                  >
                    Edit
                  </button>
                )}
              </td>
              <td className="trproduct">
                <button
                  className="btn btn-outline-danger"
                  style={{ padding: "3px 10px" }}
                  onClick={() => handleDeleteClick(row.productId)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page
        </button>

        {/* Optionally, add a dropdown for items per page: */}
        <select
          value={itemsPerPage}
          onChange={(event) => handleItemsPerPageChange(event.target.value)}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            {" "}
            Product deleted successfully!
          </Alert>
        </Snackbar>
      </div>
      <h2>Create New Product</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <Select
          value={newProduct.subCategoryId}
          onChange={(e) =>
            setNewProduct({ ...newProduct, subCategoryId: e.target.value })
          }
        >
          <MenuItem value="">Select Subcategory</MenuItem>
          {subcategories.map((subcategory) => (
            <MenuItem
              key={subcategory.subCategoryId}
              value={subcategory.subCategoryId}
            >
              {subcategory.name}
            </MenuItem>
          ))}
        </Select>{" "}
         
        <TextField
          label="Product Name"
          variant="outlined"
          value={newProduct.productName}
          onChange={(e) =>
            setNewProduct({ ...newProduct, productName: e.target.value })
          }
          required
        />
        <TextField
          label="Product Image URL"
          variant="outlined"
          value={newProduct.productImage}
          onChange={(e) =>
            setNewProduct({ ...newProduct, productImage: e.target.value })
          }
          required
        />
        <TextField
          label="Product Color"
          variant="outlined"
          value={newProduct.productColor}
          onChange={(e) =>
            setNewProduct({ ...newProduct, productColor: e.target.value })
          }
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          required
        />
        <TextField
          label="Product Price"
          variant="outlined"
          type="number"
          value={newProduct.productPrice}
          onChange={(e) =>
            setNewProduct({ ...newProduct, productPrice: e.target.value })
          }
          required
        />
        <TextField
          label="SKU"
          variant="outlined"
          value={newProduct.sku}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sku: e.target.value })
          }
          required
        />
        <TextField
          label="Weight"
          variant="outlined"
          value={newProduct.weight}
          onChange={(e) =>
            setNewProduct({ ...newProduct, weight: e.target.value })
          }
          required
        />
        <button type="submit" onClick={handleCreateProduct}>
          Create Product
        </button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={success ? "success" : "info"}>
          {success
            ? "Product created successfully"
            : "Product deleted successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
}