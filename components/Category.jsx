import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Category = () => {
    const [category, setCategory] = useState([])

    useEffect(() => {
        const fetchCategory = async () => {
            const result = await axios.get('http://localhost:8080/api/category/list-all')
            setCategory(result.data)
        }

        fetchCategory()
    }, [])

    useEffect(() => {
        console.log(category);
    }, [category])
    return (
        <div className='category col-6'>
            <div className="">
                <select className='' name="category" id="">
                    {
                        category && category.map((item, index) => {
                            return (
                                <optgroup key={index} label={item.title}>
                                    {
                                        item.children.map((child, i) => {
                                            return (
                                                <option className="" key={i} value={child.title}>{child.title}</option>
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