import React from 'react'
import Header from '@/components/Header'
import Heading from '@/components/Heading'
import Router from 'next/router'

const ProductManager = () => {
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
            </div>
        </div>
    )
}

export default ProductManager