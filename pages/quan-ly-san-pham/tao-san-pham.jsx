import React, { useState } from 'react'
import Header from '@/components/Header'
import ColourBox from '@/components/ColourBox'
import SizeBox from '@/components/SizeBox'

const CreateNewProduct = () => {
    const [selectedColour, setSelectedColour] = useState([]);
    const [selectedSize, setSelectedSize] = useState([]);

    const showColourList = () => {
        console.log(selectedColour);
    }

    const showSizeList = () => {
        console.log(selectedSize);
    }

    return (
        <div>
            <Header title="Tạo sản phẩm" />
            <div className="row">
                <div className="col-6">
                    <ColourBox selectedColour={selectedColour} setSelectedColour={ setSelectedColour } />
                    <div>
                        <button onClick={() => showColourList()}>Show Selected Colour in Create Page</button>
                    </div>
                </div>
                <div className="col-6">
                    <SizeBox selectedSize={selectedSize} setSelectedSize={ setSelectedSize } />
                    <div>
                        <button onClick={() => showSizeList()}>Show Selected Size in Create Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewProduct