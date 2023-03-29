import React, { useState, useEffect } from 'react'
import { homeAPI } from '@/config'
import axios from 'axios'
import Heading from '../Heading'
import { PlusOutlined } from '@ant-design/icons'
import { swtoast } from '@/mixins/swal.mixin'
import Swal from "sweetalert2";

const ColourManage = () => {
    const [colourList, setColourList] = useState([])

    useEffect(() => {
        const getColourList = async () => {
            const result = await axios.get(`${homeAPI}/colour/list`)
            setColourList(result.data)
        }

        getColourList()
        console.log(colourList);
    }, [])

    const refreshProductVariantTable = async () => {
        const result = await axios.get(homeAPI + '/colour/list')
        setColourList(result.data)
    }

    const handleCreateNewColour = async () => {
        const { value: newColour } = await Swal.fire({
            title: 'Nhập tên màu mới',
            input: 'text',
            inputLabel: '',
            inputPlaceholder: 'Tên màu mới..',
            showCloseButton: true,
        })
        if (!newColour) {
            swtoast.fire({
                text: "Thêm màu mới không thành công!"
            })
            return
        }
        if (newColour) {
            try {
                await axios.post(homeAPI + '/colour/create',
                    {
                        colour_name: newColour
                    })
                refreshProductVariantTable()
                swtoast.success({
                    text: 'Thêm màu mới thành công!'
                })
            } catch (e) {
                console.log(e)
                swtoast.error({
                    text: 'Xảy ra lỗi khi thêm màu mới vui lòng thử lại!'
                })
            }
        }
    }

    return (
        <div className="colour-management">
            <Heading title="Quản lý màu" />
            <div style={{ overflowY: 'scroll', maxHeight: "220px" }}>
                <table className='table table-striped table-hover table-bordered'>
                    <thead className='sticky-top bg-light'>
                        <tr>
                            <th>STT</th>
                            <th className='d-flex justify-content-between align-items-center'>
                                Tên màu
                                <div onClick={() => handleCreateNewColour()}>
                                    <button className="btn btn-dark d-flex justify-content-start align-items-center">
                                        <PlusOutlined />
                                    </button>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {
                        colourList.map((item, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td>{index + 1}</td>
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

export default ColourManage