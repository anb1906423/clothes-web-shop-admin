import React, { useState, useRef } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { swalert, swtoast, showPriceInputDialog } from "../mixins/swal.mixin";
import { FaTrash, FaPencilAlt } from "react-icons/fa"
import { Switch } from 'antd';
import Swal from "sweetalert2";

const OrderRow = (props) => {
    const { order_id, state, created_at, total_order_value } = props;

    return (
        <div className="table-responsive">
            <table className="table align-middle order-manage-table w-100">
                <tbody className='w-100 text-center'>
                    <tr className="w-100">
                        <td className="col-checkbox">
                            <input type="checkbox" name="" id="" />
                        </td>
                        <td className='col-order-id'>
                            <p className="name">
                                {order_id}
                            </p>
                            <img src={props.product_image} />
                        </td>
                        <td className="text-danger fw-bold col-state">
                            <p className='d-flex align-items-center justify-content-center'>
                                {state}
                            </p>
                        </td>
                        <td className="text-danger fw-bold col-create-at">
                            <p className='d-flex align-items-center justify-content-center'>
                                {created_at}
                            </p>
                        </td>
                        <td className="col-total-value">
                            <p>{total_order_value}</p>
                        </td>
                        <td className="col-action manipulation">
                            <a href="#">Xác nhận đơn hàng</a>
                            <br />
                            <a href="#">Xem chi tiết</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default OrderRow