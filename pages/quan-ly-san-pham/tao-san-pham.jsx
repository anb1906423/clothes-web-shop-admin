import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '@/components/Header'
import ColourBox from '@/components/ColourBox'
import SizeBox from '@/components/SizeBox'
import Category from '@/components/Category'
import RowProductVariant from '@/components/RowProductVariant'
import CKeditor from '@/components/CKEditor'

const CreateNewProduct = () => {
    const [product_id, setProduct_id] = useState('');
    const [product_name, setProduct_name] = useState('');
    const [category_id, setCategory_id] = useState('');
    const [description, setDescription] = useState('')
    const [selectedColour, setSelectedColour] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [editorLoaded, setEditorLoaded] = useState(false);

    const createProduct = async () => {
        try {
            let newProduct = {
                product_name,
                category_id,
                description
            }
            let product = await axios.post('http://localhost:8080/api/product/create', newProduct);
            console.log(product.data);
            setProduct_id(product.data.product_id);
            setIsSubmit(true);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    const rowProductVariant = []

    for (let i in selectedColour) {
        for (let y in selectedSize) {
            rowProductVariant.push(<RowProductVariant key={i+'-'+y} product_id={product_id} colour={selectedColour[i]} size={selectedSize[y]} isSubmit={isSubmit}/>)
        }
    }

    return (
        <div className='add-product-page'>
            <Header title="Add Product" />
            {/* // Input Ten san pham */}
            <div className="add-product-form">
                <div className="row name-product-box">
                    <label htmlFor='enter-name' className="fw-bold">Tên sản phẩm:</label>
                    <div className="col-6">
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
                    <label htmlFor='enter-name' className="fw-bold">Danh mục:</label>
                    <Category category_id={category_id} setCategory_id={setCategory_id} />
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
                        <ColourBox selectedColour={selectedColour} setSelectedColour={setSelectedColour} />
                    </div>
                    <div className="col-6">
                        <SizeBox selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                    </div>
                </div>
                {/* dung Selected colour va Seleted size de tao bang Product-Variant */}
                <div className="selected-table">
                    <label htmlFor='enter-name' className="fw-bold">Danh sách lựa chọn:</label>
                    <table className="table table-hover">
                        <thead>
                            <tr className=''>
                                <th scope="col">Màu</th>
                                <th scope="col">Size</th>
                                <th scope="col">Giá bán</th>
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