import React, { useState, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { swalert, swtoast, showPriceInputDialog } from "../mixins/swal.mixin";
import { FaTrash, FaPencilAlt } from "react-icons/fa"
import { Switch } from 'antd';
import Swal from "sweetalert2";

const ProductAdmin = (props) => {

    const addPointToPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

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

    const handleUpdatePrice = async () => {
        const { value: newPrice } = await Swal.fire({
            title: 'Nhập giá mới',
            input: 'number',
            inputLabel: '',
            inputPlaceholder: 'Giá mới..',
            showCloseButton: true,
        })
        if (!newPrice) {
            swtoast.fire({
                text: "Giá sản phẩm chưa được cập nhật!"
            })
            return
        }
        if (newPrice) {
            try {
                await axios.put('http://localhost:8080/api/product-variant/update-price',
                    {
                        product_variant_ids: [props.product_variant_id],
                        price: newPrice
                    })
                props.refreshProductVariantTable()
                swtoast.success({
                    text: 'Cập nhật giá mới thành công!'
                })
            } catch (e) {
                console.log(e)
                swtoast.error({
                    text: 'Xảy ra lỗi khi cập nhật giá vui lòng thử lại!'
                })
            }
        }
    }

    const handleUpdateQuantity = async () => {
        const { value: newQuantity } = await Swal.fire({
            title: 'Nhập tồn kho mới',
            input: 'number',
            inputLabel: '',
            inputPlaceholder: 'Tồn kho mới..',
            showCloseButton: true,
        })
        if (!newQuantity) {
            swtoast.fire({
                text: "Tồn kho sản phẩm chưa được cập nhật!"
            })
            return
        }
        if (newQuantity) {
            try {
                await axios.put('http://localhost:8080/api/product-variant/update-quantity',
                    {
                        product_variant_ids: [props.product_variant_id],
                        quantity: newQuantity
                    })
                props.refreshProductVariantTable()
                swtoast.success({
                    text: 'Cập nhật tồn kho mới thành công!'
                })
            } catch (e) {
                console.log(e)
                swtoast.error({
                    text: 'Xảy ra lỗi khi cập nhật tồn kho vui lòng thử lại!'
                })
            }
        }
    }

    const [disabledInputState, setDisabledInputState] = useState(false);

    const handleUpdateState = async (state) => {
        if (state) {
            try {
                setDisabledInputState(true)
                await axios.put('http://localhost:8080/api/product-variant/on',
                    { product_variant_ids: [props.product_variant_id] })
                setDisabledInputState(false)
                props.refreshProductVariantTable()
            } catch (e) {
                console.log(e)
                props.refreshProductVariantTable()
                setDisabledInputState(false)
                swtoast.error({ text: 'Xảy ra lỗi khi mở bán vui lòng thử lại!' })
            }
        } else {
            try {
                setDisabledInputState(true)
                await axios.put('http://localhost:8080/api/product-variant/off',
                    { product_variant_ids: [props.product_variant_id] })
                setDisabledInputState(false)
                props.refreshProductVariantTable()
            } catch (e) {
                console.log(e)
                props.refreshProductVariantTable()
                setDisabledInputState(false)
                swtoast.error({ text: 'Xảy ra lỗi khi tắt sản phẩm vui lòng thử lại!' })
            }
        }
    };

    const handleDelete = async () => {
        swalert
            .fire({
                title: "Xóa biến thể sản phẩm",
                icon: "warning",
                text: "Bạn muốn xóa biến thể sản phẩm này?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete('http://localhost:8080/api/product-variant/delete',
                            { data: { product_variant_ids: [props.product_variant_id] }})
                        props.refreshProductVariantTable()
                        swtoast.success({
                            text: 'Xóa biến thể sản phẩm thành công!'
                        })
                    } catch (err) {
                        console.log(err)
                        swtoast.error({
                            text: 'Xảy ra lỗi khi xóa biến thể sản phẩm vui lòng thử lại!'
                        })
                    }
                }
            })
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
                            <img src={props.product_image} />
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
                        <td className="text-danger fw-bold col-quantity">
                            <p className='d-flex align-items-center justify-content-center'>
                                {props.quantity}
                                <a href="#" onClick={handleUpdateQuantity}>
                                    <span className="edit-price-button text-premium">
                                        <FaPencilAlt />
                                    </span>
                                </a>
                            </p>
                        </td>
                        <td className="col-createAt">
                            <p>{convertTime(props.created_at)}</p>
                        </td>
                        <td className="text-danger fw-bold col-state">
                            <Switch checked={props.state} onChange={handleUpdateState} disabled={disabledInputState} />
                        </td>
                        <td className="col-action manipulation">
                            <a href="#">Chỉnh sửa</a>
                            <br />
                            <FaTrash style={{cursor: "pointer"}} title='Xóa' className="text-danger" onClick={() => handleDelete()} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductAdmin