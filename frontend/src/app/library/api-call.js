import axios from "axios";
import {AxiosAPI} from "./helper"


const getCategory= async()=>{
    const res = await AxiosAPI('/category');
    return res.data.category
}

const getCategoryById = async(id)=>{
    const res  =await AxiosAPI(`/category/${id}`)
    return res.data
}

const getColor= async()=>{
    const res = await AxiosAPI('/color');
    return res.data.colors
}
const getColoryById = async(id)=>{
    const res  =await AxiosAPI(`/color/${id}`)
    return res.data
}

const getBrand= async()=>{
    const res = await AxiosAPI('/brand');
    return res.data.brand
}
const getbrandById = async(id)=>{
    const res  =await AxiosAPI(`/brand/${id}`)
    return res.data
}

const getProduct = async (categorySlug = null, colorSlug = null,brandSlug = null,min =null, max=null) => {
    const query = new URLSearchParams();

    if (categorySlug) query.append("categorySlug", categorySlug);
    if (colorSlug) query.append("colorSlug", colorSlug);
    if(brandSlug) query.append("brandSlug",brandSlug);
    if(min) query.append("min",min)
    if(max) query.append("max",max)

    const res = await AxiosAPI(`/product?${query.toString()}`);
    return res.data.product;
};


const getProductById = async(id)=>{
    const res  =await AxiosAPI(`/product/${id}`)
    return res.data
}

export {getCategory,getCategoryById ,getColor,getColoryById,getBrand,getbrandById,getProduct,getProductById}