import React, { useState, useEffect } from 'react'
import { homeAPI } from '@/config'
import axios from 'axios'
import Heading from '../Heading'
import { PlusOutlined } from '@ant-design/icons'
import { swtoast, swalert, showPriceInputDialog } from '@/mixins/swal.mixin'
import Swal from "sweetalert2";

const SizeManage = () => {
    const [sizeList, setSizeList] = useState([])

    useEffect(() => {
        const getSizeList = async () => {
            const result = await axios.get(`${homeAPI}/size/list`)
            setSizeList(result.data)
        }

        getSizeList()
        console.log(sizeList);
    }, [])

    const refreshProductVariantTable = async () => {
        const result = await axios.get(homeAPI + '/size/list')
        setSizeList(result.data)
    }

    const handleCreateNewSize = async () => {
        const { value: newSize } = await Swal.fire({
            title: 'Nhập tên size mới',
            input: 'text',
            inputLabel: '',
            inputPlaceholder: 'Tên size mới..',
            showCloseButton: true,
        })
        if (!newSize) {
            swtoast.fire({
                text: "Thêm size mới không thành công!"
            })
            return
        }
        if (newSize) {
            try {
                await axios.post(homeAPI + '/size/create',
                    {
                        size_name: newSize
                    })
                refreshProductVariantTable()
                swtoast.success({
                    text: 'Thêm size mới thành công!'
                })
            } catch (e) {
                console.log(e)
                swtoast.error({
                    text: 'Xảy ra lỗi khi thêm size mới vui lòng thử lại!'
                })
            }
        }
    }

    return (
        <div className="colour-management">
            <Heading title="Quản lý size" />
            <div style={{ overflowY: 'scroll', maxHeight: "220px" }}>
                <table className='table table-striped table-hover table-bordered'>
                    <thead className='sticky-top bg-light'>
                        <tr>
                            <th>STT</th>
                            <th className='d-flex justify-content-between align-items-center'>
                                Tên size
                                <div onClick={() => handleCreateNewSize()}>
                                    <button className="btn btn-dark d-flex justify-content-start align-items-center">
                                        <PlusOutlined />
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {
                        sizeList.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.size_name}</td>
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

export default SizeManage