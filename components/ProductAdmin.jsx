import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { swalert, swtoast, showPriceInputDialog } from "../mixins/swal.mixin";
import { homeAPI } from "../config"
import { FaTrash, FaEdit, FaPencilAlt } from "react-icons/fa"
import { Switch } from 'antd';
import Swal from "sweetalert2";

const ProductAdmin = (props) => {

    const convertTime = (created_at) => {
        const date = new Date(created_at);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // tháng (giá trị từ 0 đến 11, nên cộng thêm 1)
        const day = date.getDate(); // ngày trong tháng
        const hours = date.getHours(); // giờ
        const minutes = date.getMinutes(); // phút
        const seconds = date.getSeconds(); // giây
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        const formattedDateTime = `${formattedDate} ${formattedTime}`;
        return formattedDateTime
    }

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };

    const addPointToPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const handleUpdatePrice = async () => {
        const { value: price } = await Swal.fire({
            title: 'Nhập giá mới',
            input: 'text',
            inputLabel: '',
            inputPlaceholder: 'Giá mới..',
            showCloseButton: true,
        })
        if (!price) {
            swtoast.fire({
                text: "Giá sản phẩm chưa được cập nhật!"
            })
            return
        }
        if (price) {
            swtoast.success({
                text: 'Cập nhật giá mới thành công!'
            })
        }
    }

    return (
        <div className="table-responsive">
            <table className="table align-middle product-admin w-100">
                <tbody className='w-100 text-center'>
                    <tr className="w-100">
                        <td className="col-checkbox">
                            <input type="checkbox" name="" id="" />
                        </td>
                        <td className='col-infor-product'>
                            <p className="name">
                                {props.product_name + '-' + props.colour_name + '-' + props.size_name}
                            </p>
                            <img src={'http://localhost:8080/static' + props.product_image} alt="" />
                        </td>
                        <td className="text-danger fw-bold col-price">
                            <p className='d-flex align-items-center justify-content-center'>
                                {addPointToPrice(props.price)}
                                <a href="#" onClick={handleUpdatePrice}>
                                    <span className="edit-price-button text-premium">
                                        <FaPencilAlt />
                                    </span>
                                </a>
                            </p>
                        </td>
                        <td className="text-danger fw-bold col-quantity"><p>{props.quantity}</p></td>
                        <td className="col-createAt">
                            <p>{convertTime(props.created_at)}</p>
                        </td>
                        <td className="text-danger fw-bold col-state">
                            <Switch defaultChecked={props.state} onChange={onChange} />
                        </td>
                        <td className="col-action manipulation">
                            <a href="#">Chỉnh sửa</a>
                            <br />
                            <FaTrash title='Xóa' className="text-danger" onClick={() => deleteProduct(props.href)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductAdmin