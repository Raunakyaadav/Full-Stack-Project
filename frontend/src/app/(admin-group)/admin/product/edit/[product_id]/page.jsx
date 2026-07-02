"use client";
import { AxiosAPI, createSlug, notify } from "@/app/library/helper";
import React, { useEffect, useRef, useState } from "react";
import {
  getCategory,
  getBrand,
  getColor,
  getProductById,
} from "@/app/library/api-call";
import Select from "react-select";
import TextEditor from "@/app/components/admin/text-editor";
import { useParams } from "next/navigation";

const EditProductForm = () => {
  const params = useParams();
  const id = params.product_id;
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectcolors, setSelcolors] = useState([]);
  const [longDescription, setLongDescription] = useState("");
  const [product, setProduct] = useState({});

  async function getProduct() {
    const res = await getProductById(id);
    setProduct(res.data);
    console.log(res.data.categoryId.name);
  }
  useEffect(() => {
    getProduct();
  }, [id]);

  async function getData() {
    const category = await getCategory();
    setCategory(category);

    const brand = await getBrand();
    setBrand(brand);

    const colors = await getColor();
    setColors(colors);
  }

  useEffect(() => {
    getData();
  }, []);

  const nameref = useRef();
  const slugref = useRef();
  const originalPriceRef = useRef();
  const discountRef = useRef();
  const finalPriceRef = useRef();

  function finalPriceConvert() {
    let originalPrice = originalPriceRef.current.value;
    let discount = discountRef.current.value;
    let finalPrice = originalPrice - (originalPrice * discount) / 100;
    finalPriceRef.current.value = finalPrice;
  }

  function slugGenerate() {
    const slug = createSlug(nameref.current.value);
    slugref.current.value = slug;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.thumbnail.files[0]);
    const formData = new FormData();
    formData.append("name", nameref.current.value);
    formData.append("slug", slugref.current.value);
    formData.append("originalPrice", originalPriceRef.current.value);
    formData.append("discountPercentage", discountRef.current.value);
    formData.append("finalPrice", finalPriceRef.current.value);
    formData.append("shortDescription", e.target.shortDescription.value);
    formData.append("longDescription", longDescription);
    formData.append("thumbnail", e.target.thumbnail.files[0]);
    formData.append("categoryId", e.target.categoryId.value);
    formData.append("brandId", e.target.brandId.value);
    formData.append("colors", JSON.stringify(selectcolors));

    AxiosAPI.put(`/product/update/${id}`, formData)
      .then((res) => {
        console.log(res);
        notify(res.data.msg, res.data.success);
        nameref.current.value = "";
        slugref.current.value = "";
      })
      .catch((error) => {
        notify("All field required", false);
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Edit Product</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              onChange={slugGenerate}
              defaultValue={product.name}
              type="text"
              name="name"
              ref={nameref}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              defaultValue={product.slug}
              name="slug"
              ref={slugref}
              placeholder="Enter slug"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description
            </label>
            <textarea
              defaultValue={product.shortDescription}
              rows="3"
              name="shortDescription"
              placeholder="Enter short description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Long Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Description
            </label>
            {/* <textarea
              rows="6"
              name="longDescription"
              placeholder="Enter long description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea> */}
            <TextEditor 
              
              defaultValue={longDescription}
              value={longDescription}
              changeHandler={(data) => setLongDescription(data)}
              placeholder="Enter long description"
            />
          </div>

          <div className="grid grid-cols-3 col-span-2 gap-5">
            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price
              </label>
              <input
                onChange={finalPriceConvert}
                defaultValue={product.originalPrice}
                type="number"
                ref={originalPriceRef}
                name="originalPrice"
                placeholder="Enter original price"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Discount Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Percentage
              </label>
              <input
                onChange={finalPriceConvert}
                defaultValue={product.discountPercentage}
                type="number"
                name="discountPercentage"
                ref={discountRef}
                placeholder="Enter discount percentage"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Final Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Final Price
              </label>
              <input
                type="number"
                defaultValue={product.finalPrice}
                name="finalPrice"
                ref={finalPriceRef}
                readOnly
                placeholder="Enter final price"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-3 gap-5">
            {/* Category ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <Select
                type="text"
                defaultValue={product.categoryId?.name}
                name="categoryId"
                placeholder="Enter category"
                className=""
                options={category.map((cat) => ({
                  value: cat._id,
                  label: cat.name,
                }))}
              />
            </div>

            {/* Brand ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <Select
                name="brandId"
                placeholder="Enter brand"
                options={brand.map((b) => ({
                  value: b._id,
                  label: b.name,
                }))}
             
              />
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Colors
              </label>
              <Select
                
                onChange={(data) => {
                  const colorData = data.map((item) => item.value);
                  setSelcolors(colorData);
                }}
                type="text"
                name="colors"
                placeholder="Enter colors"
                isMulti
                closeMenuOnSelect={false}
                options={colors.map((color) => ({
                  value: color._id,
                  label: color.name,
                }))}
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail
            </label>
            <div>
                <img width="100" height="100" src={process.env.NEXT_PUBLIC_BASE_URL +`/images/product/${product.thumbnail}`} alt="" />
            </div>
            <input
              type="file"
              name="thumbnail"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
