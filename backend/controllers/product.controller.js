 
import Product from '../models/product.model.js';
export const createProduct = async (req, res) => {
    try {
        const { name, description, category, brand, price } = req.body;
        const newProduct = new Product({ name, description, category, brand, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
export const getProducts = async (req, res) => {
    try{
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||10;
        const search=req.query.search||"";
        const searchQuery=search?{
            $or:[
                {name:{$regex:search,$options:"i"}},
                {description:{$regex:search,$options:"i"}},
                {category:{$regex:search,$options:"i"}},
                {brand:{$regex:search,$options:"i"}},
            ],
        }:{};
         
        const total=await Product.countDocuments(searchQuery);
        const products=await Product.find(searchQuery).limit(limit);
        res.status(200).json({
            page,
            limit,
            totalPages:Math.ceil(total/limit),
            totalProducts:total,
            products,
        }); 
    }
    catch(error){
        res.status(500).json({message:"Server Error",error});
    }
};
export const getproductmeta=async(req,res)=>{
    try{
        const search=req.query.search||"";
        const searchQuery=search?{
            $or:[
                {name:{$regex:search,$options:"i"}},
                 
                {category:{$regex:search,$options:"i"}},
                {brand:{$regex:search,$options:"i"}},
            ],
        }:{};
        const total=await Product.countDocuments(searchQuery);
        const categories=await Product.distinct("category",searchQuery);
        const brands=await Product.distinct("brand",searchQuery);
        res.status(200).json({
            totalProducts:total,
            categories,
            brands,
        });
    }
    catch(error){
        res.status(500).json({message:"Server Error",error});
    }
};