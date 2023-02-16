import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios'
let fakeData = [{ size_id: '001', size_name: 'S' }, { size_id: '002', size_name: 'M' },
{ size_id: '003', size_name: 'L' }, { size_id: '001', size_name: 'XL' },];

const SizeBox = ({ selectedSize, setSelectedSize }) => {

    let [listSize, setListSize] = useState(fakeData);

    useEffect(() => {
        const getSizeList = async () => {
            const result = await axios.get('http://localhost:8080/api/size/list')
            setListSize(result.data)
        }
        getSizeList()
    }, [])

    return (
        <div className="colour-box">
            <label htmlFor="enter-size" className="fw-bold">Size:</label>
            <Multiselect
                options={listSize}
                selectedValues={selectedSize}
                onSelect={setSelectedSize}
                onRemove={setSelectedSize}
                displayValue="size_name"
                hidePlaceholder={true}
            />
        </div>
    )
}

export default SizeBox