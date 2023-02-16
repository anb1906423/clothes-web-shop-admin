import React, { useState, useEffect } from 'react'
import axios from 'axios'

const fakeData = [
    {
        category_id: '001',
        title: 'Áo Nam',
        children: [
            {
                category_id: '011',
                title: 'Áo T-Shirt'
            },
            {
                category_id: '012',
                title: 'Áo Polo'
            }
        ]
    },
    {
        category_id: '002',
        title: 'Quần Nam',
        children: [
            {
                category_id: '021',
                title: 'Quần Short'
            },
            {
                category_id: '022',
                title: 'Quần Jeans'
            }
        ]
    }
];

const Category = ({ category_id, setCategory_id }) => {
    const [category, setCategory] = useState(fakeData)

    useEffect(() => {
        const fetchCategory = async () => {
            const result = await axios.get('http://localhost:8080/api/category/list-all');
            setCategory(result.data)
        }

        fetchCategory()
    }, [])

    return (
        <div className='category col-6'>
            <div className="">
                <select value={category_id} onChange={(e) => setCategory_id(e.target.value)}>
                <option disabled={true} value="">--Chọn danh mục sản phẩm--</option>
                    {
                        category && category.map((item, index) => {
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