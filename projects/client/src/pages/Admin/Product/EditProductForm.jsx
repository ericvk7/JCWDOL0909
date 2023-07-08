import AdminLayout from "../../../components/AdminLayout";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

function EditProductForm({ editProductData }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const adminToken = localStorage.getItem("admin_token");

  const HandleSubmit = async (event) => {
    event.preventDefault();
    console.log(category);

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productPrice", price);
    formData.append("productStock", stock);
    formData.append("productDesc", description);
    formData.append("file", image);
    formData.append("id_category", category);

    try {
      //   const response = await Axios.post(
      //     "http://localhost:8000/admin/addProduct",
      //     formData,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${adminToken}`,
      //       },
      //     }
      //   );
      //   if (!response.data.success) {
      //     throw new Error(response.data.message);
      //   } else {
      //     alert(response.data.message);
      //   }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (product && product.image) {
      setPreviewImage(`http://localhost:8000/${product.image}`);
    } else {
      setPreviewImage(""); // Mengubah nilainya menjadi string kosong
    }
  }, [product]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await Axios.get(
          `http://localhost:8000/admin/product/getProductById?idProduct=${id}`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );
        const product = productResponse.data; // Update this line
        setProduct(product);
        setPreviewImage(product.image); // Assuming "image" is the property that contains the image URL

        console.log(product);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (editProductData) {
      setProductName(editProductData.productName);
      setPrice(editProductData.productPrice);
      setStock(editProductData.productStock);
      setDescription(editProductData.productDesc);
      setCategory(editProductData.id_category);
    }
  }, [editProductData]);

  useEffect(() => {
    Axios.get("http://localhost:8000/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AdminLayout>
      <section className="p-6 mx-4 bg-white border-2 rounded-lg shadow-md mt-2">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-black">Edit product</h2>
          <form onSubmit={HandleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type product name"
                  value={productName || (product && product.name) || ""}
                  onChange={(event) => setProductName(event.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="RP 10.000,00"
                  value={price || (product && product.price) || ""}
                  onChange={(event) => setPrice(event.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="stock"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter product stock"
                  value={stock || (product && product.stock) || ""}
                  onChange={(event) => setStock(event.target.value)}
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Category
                </label>
                <select
                  name="category"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  required
                >
                  <option value="">{product && product.category_name}</option>
                  {categories.map((category) => (
                    <option
                      key={category.id_category}
                      value={category.id_category}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 resize-none"
                  placeholder="Type product description"
                  value={description || (product && product.description) || ""}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={handleImageChange}
                  required
                />
                {!previewImage ? (
                  <img
                    src={previewImage}
                    alt="Product Preview"
                    className="mt-2 h-40 w-auto object-contain"
                  />
                ) : (
                  <img
                    src={`http://localhost:8000/${product.image}`}
                    alt="Product Preview"
                    className="mt-2 h-40 w-auto object-contain"
                  />
                )}
              </div>
            </div>
            <div className="mt-8 text-right sm:mt-6">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 hover:text-black border border-transparent text-sm font-medium rounded-md text-black bg-[#EDA415] hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </section>
    </AdminLayout>
  );
}

export default EditProductForm;
