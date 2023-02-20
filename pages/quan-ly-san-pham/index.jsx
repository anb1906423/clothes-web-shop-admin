import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Heading from '@/components/Heading'
import ProductAdmin from '@/components/ProductAdmin'
import Router from 'next/router'
import axios from 'axios'
import { productsList } from '../../data/data'

const fakeData = [
    {
        product_id: 1, product_variant_id: 1, product_name: 'Áo Thun Active ProMax', 
        product_image: 'https://media.istockphoto.com/id/991436974/vi/vec-to/m%E1%BB%99t-s%E1%BB%91-th%C3%B9ng-h%C3%A0ng-gi%E1%BA%A5y-%C4%91%C6%B0%E1%BB%A3c-v%E1%BA%ADn-chuy%E1%BB%83n-b%E1%BA%B1ng-tr%E1%BB%B1c-th%C4%83ng-h%C3%ACnh-minh-h%E1%BB%8Da-vector.jpg?s=2048x2048&w=is&k=20&c=fEuc9_188HXkaeQdyWa6mVA4EUuAk4eyxia8-0x4Tg8=',
        colour_name: 'Trắng', size_name: 'S',
        price: 0, quantity: 0, state: true, created_at: '22/12/2022'
    }
];

const ProductManager = () => {
    //console.log(productsList);
    let [listProductVariant, setListProductVariant] = useState(fakeData);

    useEffect(() => {
        const getListProductVariant = async () => {
            const result = await axios.get('http://localhost:8080/api/product/admin/list')
            console.log(result.data)
            setListProductVariant(result.data)
        }
        getListProductVariant()
    }, [])

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
                        listProductVariant && listProductVariant.map((productVariant, index) => {
                            return (
                                <ProductAdmin
                                    key={index}
                                    product_id={productVariant.product_id}
                                    product_variant_id={productVariant.product_variant_id}
                                    product_name={productVariant.product_name}
                                    product_image={productVariant.product_image}
                                    colour_name={productVariant.colour_name}
                                    size_name={productVariant.size_name}
                                    price={productVariant.price}
                                    quantity={productVariant.quantity}
                                    state={productVariant.state}
                                    created_at={productVariant.created_at}
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