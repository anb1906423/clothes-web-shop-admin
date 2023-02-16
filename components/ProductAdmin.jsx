import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { swalert, swtoast } from "../mixins/swal.mixin";
import { homeAPI } from "../config"
import { FaTrash, FaEdit, FaClipboardList } from "react-icons/fa"

const ProductAdmin = (props) => {
    const [products, setProducts] = useState([])
    const [isState, setIsState] = useState(true)
    const time = new Date(props.created_at)
    const createAt = time.toLocaleDateString()

    const handleToggle = () => {
        setIsState(prevState => !prevState);
        console.log(isState);
    };

    // const makeNewPrice = (price) => {
    //     if(price.includes('0')) {
    //         return price + ' VNĐ'
    //     } return price
    // }

    const deleteProduct = async (id) => {
        const body = {
            id: id,
            isDeleteAll: false
        }
        console.log(id);
        swalert
            .fire({
                title: "Xác nhận xóa xe",
                icon: "warning",
                text: "Bạn chắc chắn muốn xóa xe?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post(`${homeAPI}/admin/delete`, body);
                        const productsList = products.filter(product => product.id !== id)
                        setProducts(productsList);
                        swtoast.success({
                            text: "Xe đã được xóa!!",
                        });
                    } catch (err) {
                        if (err.response.status === 400) {
                            console.log("Product id is required!")
                        }
                        console.log(`Error: ${err.message}`);
                        swtoast.error({
                            text: "Đã xảy ra lỗi khi xóa xe. Vui lòng reload lại trang!",
                        });
                    }
                }
            })
    }

    const propsId = (id) => {
        const url = 'http://localhost:3000/'
        return url + id
    }
    return (
        <div className="table-responsive">
            <table className="table align-middle product-admin w-100">
                <tbody className='w-100 text-center'>
                    <tr className="w-100 d-flex align-items-center justify-content-between">
                        <td className="name">
                            <input type="checkbox" name="" id="" />
                        </td>
                        {/* <td className=""><img src={props.src} alt={props.name} /></td> */}
                        <td className="name">
                            <p>
                                {props.product_name}
                            </p>
                            <img src={props.product_image} alt="" />
                        </td>
                        <td className="text-danger fw-bold"><p>{props.price}</p></td>
                        <td className="text-danger fw-bold"><p>{props.quantity}</p></td>
                        <td className="createAt"><p>{createAt}</p></td>
                        <td className="text-danger fw-bold">
                            <input type="checkbox" className="btn-check" id="btn-check-outlined" autoComplete="" />
                            <label onClick={() => handleToggle()} className={props.state == true ? 'btn bg-success text-light btn-outline-success' : 'btn bg-danger text-light btn-outline-danger'}>
                                {
                                    props.state ? 'On' : 'Off'
                                }
                            </label>
                            <br />
                        </td>
                        <td className="d-none d-sm-flex justify-content-around align-items-center manipulation">
                            {/* <Link title='Chi tiết xe' href={propsId(props.product_image)}> */}
                            <FaClipboardList className="text-dark" />
                            {/* </Link> */}
                            {/* <Link title='Cập nhật thông tin xe' href={props.product_image}> */}
                            <FaEdit className="text-dark" />
                            {/* </Lin</tr>k> */}
                            <FaTrash title='Xóa' className="text-dark" onClick={() => deleteProduct(props.href)} />
                            {/* <button onClick={() => deleteProduct(props.href)} className="btn btn-danger manipulation-btn">Xóa</button> */}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductAdmin