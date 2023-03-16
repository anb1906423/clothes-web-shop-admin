import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router'
import axios from 'axios'

import Header from '@/components/Header';
import Heading from '@/components/Heading';
import OrderRow from '@/components/OrderRow';
import * as actions from '../../store/actions';

let fakeOrderList = [
    {
        order_id: "71852912157786",
        state: "Chờ Xác Nhận",
        created_at: "22/12/2022",
        total_order_value: "13.450.000"
    },
    {
        order_id: "71852912157786",
        state: "Chờ Xác Nhận",
        created_at: "22/12/2022",
        total_order_value: "13.450.000"
    },
    {
        order_id: "71852912157786",
        state: "Chờ Xác Nhận",
        created_at: "22/12/2022",
        total_order_value: "13.450.000"
    },
];

const OrderManage = () => {
    let [orderList, setOrderList] = useState(fakeOrderList);
    const dispatch = useDispatch();

    useEffect(() => {
        const getOrderList = async () => {
            try {
                const result = await axios.get('http://localhost:8080/api/order/admin/list')
                setOrderList(result.data)
            } catch (err) {
                console.log(err);
                setOrderList(fakeOrderList);
            }
        }
        getOrderList();
    }, [])

    // const refreshProductVariantTable = async () => {
    //     const result = await axios.get('http://localhost:8080/api/product/admin/list')
    //     setListProductVariant(result.data)
    // }

    return (
        <div className="">
            <Header title="Quản Lý Đơn Hàng" />
            <div className="wrapper manager-box">
                <Heading title="Tất cả đơn hàng" />
                <div className="wrapper-product-admin table-responsive">
                    <table className='table order-manage-table w-100'>
                        <thead className="w-100 align-middle text-center">
                            <tr className="fs-6 w-100">
                                <th title='' className="col-checkbox">
                                    <input type="checkbox" />
                                </th>
                                <th title='Mã đơn hàng' className="col-order-id">
                                    Mã đơn hàng
                                </th>
                                <th title='Trạng thái' className="col-state">Trạng thái</th>
                                <th title="Ngày tạo" className="col-create-at">Ngày tạo</th>
                                <th title='Tổng giá trị' className="col-total-value">Tổng giá trị</th>
                                <th title="Thao tác" className="col-action manipulation">Thao tác</th>
                            </tr>
                        </thead>
                    </table>
                    {
                        orderList && orderList.map((order, index) => {
                            return (
                                <OrderRow
                                    key={index}
                                    order_id={order.order_id}
                                    state={order.state}
                                    created_at={order.created_at}
                                    total_order_value={order.total_order_value}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderManage