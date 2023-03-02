import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';

let fakeData = [
    { colour_id: 1, colour_name: 'Trắng' }, { colour_id: 2, colour_name: 'Đen' }, { colour_id: 3, colour_name: 'Xám' },
    { colour_id: 4, colour_name: 'Xanh' }, { colour_id: 5, colour_name: 'Đỏ' },
];

const ColourBox = ({ selectedColours, setSelectedColours }) => {

    let [listColour, setListColour] = useState([]);

    useEffect(() => {
        const getColourList = async () => {
            try {
                const result = await axios.get('http://localhost:8080/api/colour/list');
                setListColour(result.data);
            } catch(err) {
                console.log(err);
                setListColour(fakeData);
            }
        }
        getColourList()
    }, [])

    return (
        <div className="colour-box">
            <label htmlFor="enter-color" className="fw-bold">Màu:</label>
            <Multiselect
                options={listColour}
                selectedValues={selectedColours}
                onSelect={setSelectedColours}
                onRemove={setSelectedColours}
                displayValue="colour_name"
                hidePlaceholder={true}
            />
        </div>
    )
}

export default ColourBox