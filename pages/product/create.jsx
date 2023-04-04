import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { Input, InputNumber, Empty } from 'antd'

import Header from '@/components/Header';
import Category from '@/components/Category';
import ColourBox from '@/components/ColourBox';
import SizeBox from '@/components/SizeBox';
import CKeditor from '@/components/CKEditor';
import RowProductVariant from '@/components/RowProductVariant';
import { swtoast } from "@/mixins/swal.mixin";

const CreateProductPage = () => {
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('')
    const [selectedColours, setSelectedColours] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [editorLoaded, setEditorLoaded] = useState(false);

    const [productVariantList, setProductVariantList] = useState([]);
    const [rowProductVariant, setRowProductVariant] = useState([]);
    // const [globalQuantity, setGlobalQuantity] = useState('')

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        let productVariantListTemp = [];
        for (let i in selectedColours) {
            for (let y in selectedSizes) {
                let productVariant = {
                    colour_id: selectedColours[i].colour_id,
                    colour_name: selectedColours[i].colour_name,
                    size_id: selectedSizes[y].size_id,
                    size_name: selectedSizes[y].size_name,
                    quantity: '',
                    fileList: []
                }
                productVariantListTemp.push(productVariant);
            }
        }
        setProductVariantList(productVariantListTemp);

    }, [selectedColours, selectedSizes]);

    useEffect(() => {
        let rowProductVariantTemp = [];
        for (let i in productVariantList) {
            rowProductVariantTemp.push(
                <RowProductVariant
                    key={i}
                    index={i}
                    productVariantList={productVariantList}
                    setProductVariantList={setProductVariantList}
                />
            );
        }
        setRowProductVariant(rowProductVariantTemp);
    }, [productVariantList]);

    const createProduct = async () => {
        if (Validate()) {
            try {
                let newProduct = {
                    product_name: productName,
                    price,
                    category_id: categoryId,
                    description
                }
                let result = await axios.post('http://localhost:8080/api/product/create', newProduct);
                console.log(result.data);
                let product_id = result.data.product_id;
                for (let productVariant of productVariantList) {
                    let dataProductVariant = new FormData();
                    dataProductVariant.append('product_id', product_id);
                    dataProductVariant.append('colour_id', productVariant.colour_id);
                    dataProductVariant.append('size_id', productVariant.size_id);
                    dataProductVariant.append('quantity', productVariant.quantity);
                    for (let file of productVariant.fileList)
                        dataProductVariant.append('product_images', file.originFileObj);
                    let result = await axios.post(
                        'http://localhost:8080/api/product-variant/create',
                        dataProductVariant,
                        {
                            headers: { 'Content-Type': 'multipart/form-data' }
                        }
                    );
                    console.log(result.data);
                }
                Router.push('/product/manage')
            } catch (err) {
                console.log(err);
            }
        }
    }

    const Validate = () => {
        if (!productName) {
            swtoast.error({ text: 'Tên sản phẩm không được bỏ trống' })
            return false
        }
        if (!categoryId) {
            swtoast.error({ text: 'Danh mục sản phẩm không được bỏ trống' })
            return false
        }
        if (!price) {
            swtoast.error({ text: 'Giá sản phẩm không được bỏ trống' })
            return false
        }
        if (!description) {
            swtoast.error({ text: 'Mô tả sản phẩm không được bỏ trống' })
            return false
        }
        if (!productVariantList.length) {
            swtoast.error({ text: 'Sản phẩm phải có ít nhất 1 biến thể' })
            return false
        }
        for (const productVariant of productVariantList) {
            if (!productVariant.quantity) {
                swtoast.error({ text: 'Biến thể sản phẩm phải có ít nhất một tồn kho' })
                return false
            }
            if (!productVariant.fileList.length) {
                swtoast.error({ text: 'Biến thể sản phẩm phải có ít nhất một ảnh' })
                return false
            }
        }
        return true
    }

    // useEffect(() => {
    //     for (let productVariant of listProductVariant) {
    //         productVariant.quantity = globalQuantity
    //         console.log(productVariant);
    //     }
    // }, [globalQuantity])

    return (
        <div className='create-product-page'>
            <Header title="Thêm sản phẩm" />
            <div className="create-product-form">
                {/* // Input Ten san pham */}
                <div className="row">
                    <div className="col-6">
                        <label htmlFor='product-name' className="fw-bold">Tên sản phẩm:</label>
                        <Input
                            id='product-name' placeholder='Nhập tên sản phẩm'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                </div>
                {/* // Component danh muc */}
                <div className="row">
                    <div className="col-6">
                        <label htmlFor='product-category' className="fw-bold">Danh mục:</label>
                        <Category setCategoryId={setCategoryId} />
                    </div>
                    <div className="col-6">
                        <label htmlFor='product-price' className="fw-bold">Giá sản phẩm:</label>
                        <br />
                        <InputNumber
                            id='product-price' placeholder='Nhập giá sản phẩm'
                            value={price === 0 ? null : price}
                            style={{ width: '100%' }}
                            onChange={setPrice}
                        />
                    </div>
                </div>
                {/* // Mo ta san pham = CKEditor */}
                <div className="description">
                    <label htmlFor='description' className="fw-bold">Mô tả sản phẩm:</label>
                    <div className="ckeditor-box">
                        <CKeditor
                            Placeholder={{ placeholder: "Mô tả ..." }}
                            name="description"
                            id="description"
                            form="add-product-form"
                            data={description}
                            onChange={(data) => {
                                setDescription(data);
                            }}
                            editorLoaded={editorLoaded}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <ColourBox selectedColours={selectedColours} setSelectedColours={setSelectedColours} />
                    </div>
                    <div className="col-6">
                        <SizeBox selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes} />
                    </div>
                </div>
                {/* dung Selected colour va Seleted size de tao bang Product-Variant */}
                <div>
                    <label htmlFor='enter-name' className="fw-bold">Danh sách lựa chọn:</label>
                    {/* <div className="row">
                        <div className="col-6">
                            {
                                rowProductVariant.length > 0 ?
                                    <div className="d-flex">
                                        <label className="col-6 fw-bold" htmlFor="global-quantity-input">Nhập tồn kho:</label>
                                        <Input
                                            className='col-6'
                                            id='global-quantity-input'
                                            placeholder="Nhập tồn kho"
                                            value={globalQuantity}
                                            type="number"
                                            onChange={(e) => setGlobalQuantity(e.target.value)}
                                            style={{
                                                margin: "0 0 16px"
                                            }}
                                        />
                                    </div> : ''
                            }
                        </div>
                    </div> */}
                    <table className="table w-100 table-hover align-middle table-bordered">
                        <thead>
                            <tr className='row-product-variant'>
                                <th className='col-checkbox text-center' scope="col"><input type="checkbox" /></th>
                                <th className='col-colour text-center' scope="col">Màu</th>
                                <th className='col-size text-center' scope="col">Size</th>
                                <th className='col-quantity text-center' scope="col">Tồn kho</th>
                                <th className='col-image text-center' scope="col">Ảnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowProductVariant.length ? rowProductVariant : <tr><td colSpan={5}><Empty /></td></tr>}
                        </tbody>
                    </table>
                </div>
                <div className="btn-box text-left">
                    <button className='text-light bg-dark' onClick={() => createProduct()}>
                        Thêm sản phẩm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateProductPage