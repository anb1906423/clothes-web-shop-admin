import React, { useState, useEffect, useRef } from 'react'
import Header from '@/components/Header'
import ColourBox from '@/components/ColourBox'
import SizeBox from '@/components/SizeBox'
import Category from '@/components/Category'
import RowItem from '@/components/RowItem'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateNewProduct = () => {
    const [nameProduct, setNameProduct] = useState('')
    const [selectedColour, setSelectedColour] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);
    const [description, setDescription] = useState('')
    
    const nameProductRef = useRef();

    const selectedSizeItem = selectedSize.map((size, index) => {
        return size.size_name
    })

    useEffect(() => {
        // nameProductRef.current.focus();
        console.log(selectedColour);
        console.log(selectedSize);
    })

    const showColourList = () => {
        console.log(selectedColour);
    }

    const showSizeList = () => {
        console.log(selectedSize);
    }

    return (
        <div className='add-product-page'>
            <Header title="Add Product" />
            {/* // Input Ten san pham */}
            <form action="" className="add-product-form">
                <div className="row name-product-box">
                    <label htmlFor='enter-name' className="fw-bold">Tên sản phẩm:</label>
                    <div className="col-6">
                        <input
                            id='enter-name'
                            type="text"
                            className="w-100"
                            placeholder='Nhập tên sản phẩm'
                            value={nameProduct}
                            ref={nameProductRef}
                            onChange={(e) => setNameProduct(e.target.value)}
                        />
                    </div>
                </div>
                {/* // Component danh muc */}
                <div className="category-box row">
                    <label htmlFor='enter-name' className="fw-bold">Danh mục:</label>
                    <Category />
                </div>
                {/* // Mo ta san pham = CKEditor */}
                <div className="description">
                    <label htmlFor='enter-name' className="fw-bold">Mô tả sản phẩm:</label>
                    <div className="ckeditor-box">
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <ColourBox selectedColour={selectedColour} setSelectedColour={setSelectedColour} />
                        {/* <div>
                            <button onClick={() => showColourList()}>Show Selected Colour in Create Page</button>
                        </div> */}
                    </div>
                    <div className="col-6">
                        <SizeBox selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                        {/* <div>
                            <button onClick={() => showSizeList()}>Show Selected Size in Create Page</button>
                        </div> */}
                    </div>
                </div>
                {/* dung Selected colour va Seleted size de tao bang Product-Variant */}
                <div className="selected-table">
                    <label htmlFor='enter-name' className="fw-bold">Danh sách lựa chọn:</label>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Màu</th>
                                <th scope="col">Size</th>
                                <th scope="col">Giá bán</th>
                                <th scope="col">Tồn kho</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedColour.map((color, index) => {
                                    return (
                                        <RowItem
                                            key={index}
                                            colorItem={color.colour_name}
                                            sizeItem={selectedSizeItem}
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="btn-box text-left">
                    <button className='text-light' type='submit'>Thêm sản phẩm</button>
                </div>
            </form>
        </div>
    )
}

export default CreateNewProduct