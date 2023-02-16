import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios'
let fakeData = [{ colour_id: '001', colour_name: 'Trắng' }, { colour_id: '002', colour_name: 'Đen' },
{ colour_id: '003', colour_name: 'Xám' }, { colour_id: '001', colour_name: 'Xanh' }, { colour_id: '001', colour_name: 'Đỏ' },];

const ColourBox = ({ selectedColour, setSelectedColour }) => {

    let [listColour, setListColour] = useState(fakeData);

    useEffect(() => {
        const getColourList = async () => {
            const result = await axios.get('http://localhost:8080/api/colour/list')
            setListColour(result.data)
        }
        getColourList()
    }, [])

    return (
        <div className="colour-box">
            <label htmlFor="enter-color" className="fw-bold">Màu:</label>
            <Multiselect
                options={listColour}
                selectedValues={selectedColour}
                onSelect={setSelectedColour}
                onRemove={setSelectedColour}
                displayValue="colour_name"
                hidePlaceholder={true}
            />
        </div>
    )
}

export default ColourBox