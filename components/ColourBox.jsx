import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios'

const ColourBox = (props) => {
    
    let [listColour, setListColour] = useState([]);
    let [selectedValue, setSelectedValue] = useState([]);
    useEffect(() => {
        const getColourList = async () => {
            const result = await axios.get('http://localhost:8080/api/colour/list')
            console.log(result.data);
            setListColour(result.data)
        }
        getColourList()
    }, [])
    const onSelect = (selected) => {
        setSelectedValue(selected)
    }
    const onRemove = (selected) => {
        setSelectedValue(selected)
    }
    return (
        <div className="colour-box">
            <span className="fw-bold">Màu:</span>
            <Multiselect
                options={listColour} // Options to display in the dropdown
                selectedValues={selectedValue} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="colour_name" 
                hidePlaceholder = {true} // HideProperty name to display in the dropdown options
            />
        </div>
    )
}

export default ColourBox