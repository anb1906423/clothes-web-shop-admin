import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Heading from '@/components/Heading'
import ProductAdmin from '@/components/ProductAdmin'
import Router from 'next/router'
import { productsList } from '../../data/data'

const ProductManager = () => {
    console.log(productsList);
    return (
        <div className="product-manager">
            <Header title="Product Management" />
            <div className="wrapper manager-box">
                <div className="to-add-product-page">
                    <button onClick={() => Router.push('/quan-ly-san-pham/tao-san-pham')} className="to-add-product-page-btn">
                        Thêm sản phẩm
                    </button>
                </div>
                <Heading title="Tất cả sản phẩm" />
                <div className="wrapper-product-admin">
                    <table className='table product-admin w-100'>
                        <thead className="w-100 text-center">
                            <tr className="fs-6 w-100 d-flex align-items-center justify-content-around">
                                <th title='' className="">Chọn</th>
                                <th title='Tên sản phẩm' className="name">Tên</th>
                                <th title='Giá sản phẩm' className="">Giá</th>
                                <th title='Tồn kho' className="">Tồn kho</th>
                                <th title="Thời gian tạo" className="createAt">Thời gian tạo</th>
                                <th title="Trạng thái" className="state">Trạng thái</th>
                                <th title="Thao tác" className="manipulation">Thao tác</th>
                            </tr>
                        </thead>
                    </table>
                    {
                        productsList && productsList.map((item, index) => {
                            return (
                                <ProductAdmin
                                    key={index}
                                    product_name={item.product_name}
                                    product_image={item.product_image}
                                    price={item.price}
                                    quantity={item.quantity}
                                    created_at={item.created_at}
                                    state={item.state}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductManager