import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';

let fakeData = [
    { size_id: 1, size_name: 'S' }, { size_id: 2, size_name: 'M' },
    { size_id: 3, size_name: 'L' }, { size_id: 4, size_name: 'XL' },
];

const SizeBox = ({ selectedSizes, setSelectedSizes }) => {

    let [listSize, setListSize] = useState([]);

    useEffect(() => {
        const getSizeList = async () => {
            try {            
                const result = await axios.get('http://localhost:8080/api/size/list');
                setListSize(result.data);            
            } catch(err) {
                console.log(err);
                setListSize(fakeData);
            }
        }
        getSizeList();
    }, [])

    return (
        <div className="colour-box">
            <label htmlFor="enter-size" className="fw-bold">Size:</label>
            <Multiselect
                options={listSize}
                selectedValues={selectedSizes}
                onSelect={setSelectedSizes}
                onRemove={setSelectedSizes}
                displayValue="size_name"
                hidePlaceholder={true}
            />
        </div>
    )
}

export default SizeBox