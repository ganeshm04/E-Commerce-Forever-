import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter((item) => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    const toggleSubCategory = (e) => {
        if (subcategory.includes(e.target.value)) {
            setSubcategory(prev => prev.filter((item) => item !== e.target.value));
        } else {
            setSubcategory(prev => [...prev, e.target.value]);
        }
    }

    const applyFilter = () => {
        let productsCopy = products.slice();
        if (showSearch && search) {
            productsCopy = productsCopy.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (category.length > 0) {
            productsCopy = productsCopy.filter((product) => category.includes(product.category));
        }
        if (subcategory.length > 0) {
            productsCopy = productsCopy.filter((product) => subcategory.includes(product.subCategory));
        }
        setFilteredProducts(productsCopy);

    }

    useEffect(() => {
        setFilteredProducts(products);
    }, []);


    const sortProducts = (e) => {
        let filteredProductsCopy = filteredProducts.slice();
        switch (sortType) {
            case 'low-high':
                setFilteredProducts(filteredProductsCopy.sort((a, b) => a.price - b.price));
                break;
            case 'high-low':
                setFilteredProducts(filteredProductsCopy.sort((a, b) => b.price - a.price));
                break;
            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, subcategory, search, showSearch, products]);

    useEffect(() => {
        sortProducts();
    }, [sortType]);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* filter options */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>
                {/* category filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}  sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Men"} onChange={toggleCategory} />Men
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Women"} onChange={toggleCategory} />Women
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Kids"} onChange={toggleCategory} />Kids
                        </p>
                    </div>
                </div>
                {/* subcategory filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'}  sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Topwear"} onChange={toggleSubCategory} />Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Bottomwear"} onChange={toggleSubCategory} />Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Winterwear"} onChange={toggleSubCategory} />Winterwear
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className="flex-1 ">
                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    {/* Product sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low-High</option>
                        <option value="high-low">Sort by: High-Low</option>
                    </select>
                </div>

                {/* map products */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {filteredProducts.map((product, index) => (
                        <ProductItem key={index} id={product._id} image={product.images[0]} name={product.name} price={product.price} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Collection