import React, { useState } from 'react'
import Header from '@/components/Header'
import ColourBox from '@/components/ColourBox'

const CreateNewProduct = () => {
    const [listColour, setListColour] = useState(['ưdcdc']);

    const handleData = (value) => {
        setListColour(value);
    };

    return (
        <div>
            <Header title="Tạo sản phẩm" />
            <div className="row">
                <div className="col-6">
                    <ColourBox handleData={handleData} />
                </div>
                <div className="col-6">
                    <ColourBox handleData={handleData} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewProduct