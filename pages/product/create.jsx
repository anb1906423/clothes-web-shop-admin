import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Router from 'next/router';

import Header from '@/components/Header';
import ColourBox from '@/components/ColourBox';
import SizeBox from '@/components/SizeBox';
import Category from '@/components/Category';
import RowProductVariant from '@/components/RowProductVariant';
import CKeditor from '@/components/CKEditor';

const CreateNewProduct = () => {
    const [product_name, setProduct_name] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('')
    const [selectedColours, setSelectedColours] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [editorLoaded, setEditorLoaded] = useState(false);

    const [listProductVariant, setListProductVariant] = useState([]);
    const [rowProductVariant, setRowProductVariant] = useState([]);

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        let listProductVariantTemp = [];
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
                listProductVariantTemp.push(productVariant);
            }
        }
        setListProductVariant(listProductVariantTemp);
        
    }, [selectedColours, selectedSizes]);

    useEffect(() => {
        let rowProductVariantTemp = [];
        for (let i in listProductVariant) {
            rowProductVariantTemp.push(
                <RowProductVariant 
                    key={i} 
                    index={i}
                    listProductVariant={listProductVariant}
                    setListProductVariant={setListProductVariant}
                />
            );
        }
        setRowProductVariant(rowProductVariantTemp);
    }, [ listProductVariant ]);

    const createProduct = async () => {
        try {
            let newProduct = {
                product_name,
                price,
                category_id,
                description
            }
            let result = await axios.post('http://localhost:8080/api/product/create', newProduct);
            console.log(result.data);
            let product_id = result.data.product_id;
            for (let productVariant of listProductVariant) {
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
            Router.push('/quan-ly-san-pham');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='add-product-page'>
            <Header title="Add Product" />
            {/* // Input Ten san pham */}
            <div className="add-product-form">
                <div className="name-product-box row">
                    <div className="col-6">
                        <label htmlFor='enter-name' className="fw-bold">Tên sản phẩm:</label>
                        <input
                            id='enter-name'
                            type="text"
                            className="w-100"
                            placeholder='Nhập tên sản phẩm'
                            onChange={(e) => setProduct_name(e.target.value)}
                        />
                    </div>
                </div>
                {/* // Component danh muc */}
                <div className="category-box row">
                    <div className="col-6">
                        <label htmlFor='enter-name' className="fw-bold">Danh mục:</label>
                        <Category category_id={category_id} setCategory_id={setCategory_id} />
                    </div>
                    <div className="col-6">
                        <label htmlFor='enter-price' className="fw-bold">Giá sản phẩm:</label>
                        <input
                            id='enter-name'
                            type="number" min={0} max={10000000}
                            className="w-100"
                            placeholder='Nhập giá sản phẩm'
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                {/* // Mo ta san pham = CKEditor */}
                <div className="description">
                    <label htmlFor='enter-name' className="fw-bold">Mô tả sản phẩm:</label>
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
                <div className="selected-table">
                    <label htmlFor='enter-name' className="fw-bold">Danh sách lựa chọn:</label>
                    <table className="table table-hover">
                        <thead>
                            <tr className=''>
                                <th scope="col"><input type="checkbox"/></th>
                                <th scope="col">Màu</th>
                                <th scope="col">Size</th>
                                <th scope="col">Tồn kho</th>
                                <th scope="col">Ảnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowProductVariant}
                        </tbody>
                    </table>
                </div>
                <div className="btn-box text-left">
                    <button className='text-light' onClick={() => createProduct()}>
                        Thêm sản phẩm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateNewProduct