import React from 'react'
import { useEffect } from 'react'
 import api from '../../axios/axios.js'
import ProductCard from '../components/ProductCard.jsx'
import { useState } from 'react'
export const fetchProduct=async(params)=>{
    try{
        const response=await api.get('/products',params);
        console.log("Products fetched successfully:",response.data);
        return response.data;
    }catch(error){
        console.error("Error fetching products:",error);
        return [];
    }
}
export const fetchProductMeta=async(params)=>{
    try{
        const response=await api.get('/products/meta/search',params);
        console.log("Product meta fetched successfully:",response.data);
        return response.data;
    }catch(error){
        console.error("Error fetching product meta:",error);
        return {};
    }
}
function viewproduct() {
  const [products,setProducts]=useState([]);
  const [meta,setMeta]=useState({});
  const [loading,setLoading]=useState(false);
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(10);
  const [search,setSearch]=useState("");
  useEffect(()=>{
    fetchProduct({params:{page,limit,search}}).then((data)=>{
        setProducts(data.products);
    });
    fetchProductMeta({params:{search}}).then((data)=>{
        setMeta(data);
    });
  },[page,limit,search]);
    
  return (
    <div>
      <h1>View Product</h1>
      <input type="text" placeholder="Search products..." value={search} onChange={(e)=>setSearch(e.target.value)} />
      {loading?(
        <p>Loading...</p>
      ):(
        <div>
          {products.map((product)=>(
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <div>
        <button disabled={page<=1} onClick={()=>setPage(page-1)}>Previous</button>
        <span>Page {page}</span>
        <button disabled={products.length<limit} onClick={()=>setPage(page+1)}>Next</button>
      </div>
      <div>
        <h3>Product Meta</h3>
        <p>Total Products: {meta.totalProducts}</p>
        <p>Categories: {meta.categories&&meta.categories.join(", ")}</p>
        <p>Brands: {meta.brands&&meta.brands.join(", ")}</p>
      </div>  
    </div>
  )
}

export default viewproduct
