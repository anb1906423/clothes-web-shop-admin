import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fakeData = [
    {
        category_id: 1,
        title: 'Áo Nam',
        children: [
            {
                category_id: 3,
                title: 'Áo T-Shirt'
            },
            {
                category_id: 4,
                title: 'Áo Polo'
            }
        ]
    },
    {
        category_id: 2,
        title: 'Quần Nam',
        children: [
            {
                category_id: 5,
                title: 'Quần Short'
            },
            {
                category_id: 6,
                title: 'Quần Jeans'
            }
        ]
    }
];

const Category = ({ category_id, setCategory_id }) => {
    const [listCategory, setListCategory] = useState([])

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const result = await axios.get('http://localhost:8080/api/category/list-all');
                setListCategory(result.data)
            } catch(err) {
                console.log(err);
                setListCategory(fakeData);
            }
        }

        fetchCategory()
    }, [])

    return (
        <div className='category col-6'>
            <div className="">
                <select value={category_id} onChange={(e) => setCategory_id(e.target.value)}>
                <option disabled={true} value="">--Chọn danh mục sản phẩm--</option>
                    {
                        listCategory && listCategory.map((item, index) => {
                            return (
                                <optgroup key={index} label={item.title}>
                                    {
                                        item.children.map((child, i) => {
                                            return (
                                                <option className="" key={i} value={child.category_id}>{child.title}</option>
                                            )
                                        })
                                    }
                                </optgroup>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )
}

export default Category