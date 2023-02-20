import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { swalert, swtoast } from "../mixins/swal.mixin";
import { homeAPI } from "../config"
import { FaTrash, FaEdit, FaClipboardList } from "react-icons/fa"

const ProductAdmin = (props) => {
    const [isState, setIsState] = useState(true)

    const handleToggle = () => {
        setIsState(prevState => !prevState);
        console.log(isState);
    };

    return (
        <div className="table-responsive">
            <table className="table align-middle product-admin w-100">
                <tbody className='w-100 text-center'>
                    <tr className="w-100 d-flex align-items-center justify-content-between">
                        <td className="name">
                            <input type="checkbox" name="" id="" />
                        </td>
                        <td className="name">
                            <p>
                                {props.product_name + '-' + props.colour_name + '-' + props.size_name}
                            </p>
                            <img src={'http://localhost:8080/static' + props.product_image} alt="" />
                        </td>
                        <td className="text-danger fw-bold"><p>{props.price}</p></td>
                        <td className="text-danger fw-bold"><p>{props.quantity}</p></td>
                        <td className="createAt"><p>{props.created_at}</p></td>
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
                            <FaEdit className="text-dark" />
                            <FaTrash title='Xóa' className="text-dark" onClick={() => deleteProduct(props.href)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ProductAdmin