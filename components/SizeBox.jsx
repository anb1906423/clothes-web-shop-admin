import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
//import axios from 'axios'
let fakeData = [{ size_id: '001', size_name: 'S' }, { size_id: '002', size_name: 'M' },
{ size_id: '003', size_name: 'L' }, { size_id: '001', size_name: 'XL' },];

const SizeBox = ({ selectedSize, setSelectedSize }) => {

    let [listSize, setListSize] = useState(fakeData);

    // useEffect(() => {
    //     const getSizeList = async () => {
    //         const result = await axios.get('http://localhost:8080/api/size/list')
    //         console.log(result.data);
    //         setListSize(result.data)
    //     }
    //     getSizeList()
    // }, [])

    return (
        <div className="colour-box">
            <label htmlFor="enter-size" className="fw-bold">Size:</label>
            <Multiselect
                options={listSize} // Options to display in the dropdown
                selectedValues={selectedSize} // Preselected value to persist in dropdown
                onSelect={setSelectedSize} // Function will trigger on select event
                onRemove={setSelectedSize} // Function will trigger on remove event
                displayValue="size_name"
                hidePlaceholder={true} // HideProperty name to display in the dropdown options
            />
        </div>
    )
}

export default SizeBox