import React, { useState, useEffect } from 'react'
import { homeAPI } from '@/config'
import axios from 'axios'
import Heading from '../Heading'
import { PlusOutlined } from '@ant-design/icons'
import { swtoast } from '@/mixins/swal.mixin'
import Swal from "sweetalert2";

const Category = () => {
    const [allCategory, setAllCategory] = useState([])

    useEffect(() => {
        const getAllCategory = async () => {
            const result = await axios.get(`${homeAPI}/category/list-all`)
            setAllCategory(result.data)
        }

        getAllCategory()
        console.log(allCategory);
    }, [])

    const refreshProductVariantTable = async () => {
        const result = await axios.get(homeAPI + '/category/list-all')
        setAllCategory(result.data)
    }

    // const handleCreateNewColour = async () => {
    //     const { value: newColour } = await Swal.fire({
    //         title: 'Nhập tên màu mới',
    //         input: 'text',
    //         inputLabel: '',
    //         inputPlaceholder: 'Tên màu mới..',
    //         showCloseButton: true,
    //     })
    //     if (!newColour) {
    //         swtoast.fire({
    //             text: "Thêm màu mới không thành công!"
    //         })
    //         return
    //     }
    //     if (newColour) {
    //         try {
    //             await axios.post(homeAPI + '/colour/create',
    //                 {
    //                     colour_name: newColour
    //                 })
    //             refreshProductVariantTable()
    //             swtoast.success({
    //                 text: 'Thêm màu mới thành công!'
    //             })
    //         } catch (e) {
    //             console.log(e)
    //             swtoast.error({
    //                 text: 'Xảy ra lỗi khi thêm màu mới vui lòng thử lại!'
    //             })
    //         }
    //     }
    // }

    return (
        <div className="colour-management">
            <Heading title="Quản lý danh mục" />
            <div style={{ overflowY: 'scroll', maxHeight: "220px" }}>
                <table className='table table-striped table-hover table-bordered'>
                    <thead className='sticky-top bg-light'>
                        <tr>
                            <th>STT</th>
                            <th>
                                Tên danh mục
                            </th>
                            <th>Level</th>
                            <th className='d-flex justify-content-between align-items-center'>
                                Danh mục cha
                                <div onClick={() => handleCreateNewColour()}>
                                    <button className="btn btn-dark d-flex justify-content-start align-items-center">
                                        <PlusOutlined />
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {
                        allCategory.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.colour_name}</td>
                                        <td>{item.colour_name}</td>
                                    </tr>
                                </tbody>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default Category