import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';

const Brands = () => {
    const loadingCategory = useSelector(state => state.product.loadingCategory);
    const categoryData = useSelector(state => state.product.allCategory);
    const subCategoryData = useSelector(state => state.product.allSubCategory);
    const navigate = useNavigate();

    const handleRedirectProductListpage = (id, cat) => {
        const subcategory = subCategoryData.find(sub => sub._id === id);
        if (!subcategory) return console.error('Subcategory Not Found for ID:', id);

        const category = subcategory.category?.[0];
        if (!category) return console.error('No Parent Category Found for Subcategory ID:', id);

        const url = `/${valideURLConvert(category.name)}-${category._id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
        navigate(url);
    };

    // Group subcategories by their category
    const groupedSubcategories = {};
    subCategoryData.forEach(sub => {
        const category = sub.category?.[0];
        if (category) {
            if (!groupedSubcategories[category.name]) {
                groupedSubcategories[category.name] = [];
            }
            groupedSubcategories[category.name].push(sub);
        }
    });

    return (
        <div className='bg-white'>
            {categoryData.length > 0 && categoryData.map(category => (
                groupedSubcategories[category.name] ? (
                    <div key={category._id} className="mb-6 ">
                        <h1 className="container p-3 mx-auto md:text-2xl font-bold md:p-3 text-black capitalize">{category.name}</h1>
                        <div className=" container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-2 gap-4">
                            {loadingCategory
                                ? new Array(12).fill(null).map((_, index) => (
                                    <div key={index} className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse">
                                        <div className="bg-blue-100 min-h-24 rounded"></div>
                                        <div className="bg-blue-100 h-8 rounded"></div>
                                    </div>
                                ))
                                : groupedSubcategories[category.name].map(cat => (
                                    <div
                                        key={cat._id}
                                        className=" grid place-items-center p-2 rounded-lg cursor-pointer border-black g-2"
                                        onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                                    >
                                        <img
                                            src={cat.image}
                                            className="object-scale-down md:h-72 h-28 w-64 bg-gray-100"
                                            alt={cat.name}
                                        />
                                        <p className="text-center font-bold text-sm md:text-lg mt-3">{cat.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ) : null
            ))}
        </div>
    );
};

export default Brands;
