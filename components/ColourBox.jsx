import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
//import axios from 'axios'
let fakeData = [{ colour_id: '001', colour_name: 'Trắng' }, { colour_id: '002', colour_name: 'Đen' },
{ colour_id: '003', colour_name: 'Xám' }, { colour_id: '001', colour_name: 'Xanh' }, { colour_id: '001', colour_name: 'Đỏ' },];

const ColourBox = ({ selectedColour, setSelectedColour }) => {

    let [listColour, setListColour] = useState(fakeData);

    // useEffect(() => {
    //     const getColourList = async () => {
    //         const result = await axios.get('http://localhost:8080/api/colour/list')
    //         console.log(result.data);
    //         setListColour(result.data)
    //     }
    //     getColourList()
    // }, [])

    return (
        <div className="colour-box">
            <label htmlFor="enter-color" className="fw-bold">Màu:</label>
            <Multiselect
                options={listColour} // Options to display in the dropdown
                selectedValues={selectedColour} // Preselected value to persist in dropdown
                onSelect={setSelectedColour} // Function will trigger on select event
                onRemove={setSelectedColour} // Function will trigger on remove event
                displayValue="colour_name"
                hidePlaceholder={true} // HideProperty name to display in the dropdown options
            />
        </div>
    )
}

export default ColourBox