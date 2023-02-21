import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaArrowAltCircleUp } from 'react-icons/fa'

const RowProductVariant = ({ product_id, colour, size, product_image, isSubmit }) => {
    const [colour_id, setColour_id] = useState(colour.colour_id);
    const [size_id, setSize_id] = useState(size.size_id);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    let inputImageFile = useRef(null);

    const createProductVariant = async () => {
        let dataProductVariant = new FormData();
        dataProductVariant.append('price', price);
        dataProductVariant.append('quantity', quantity);
        dataProductVariant.append('product_id', product_id);
        dataProductVariant.append('colour_id', colour_id);
        dataProductVariant.append('size_id', size_id);
        for (let file of inputImageFile.current.files)
            dataProductVariant.append('product_images', file);
        try {
            let result = await axios.post(
                'http://localhost:8080/api/product-variant/create',
                dataProductVariant,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (isSubmit) {
            createProductVariant();
        }
    }, [isSubmit]);

    return (
        <>
            <tr className='row-product-admin'>
                <td>{colour.colour_name}</td>
                <td>{size.size_name}</td>
                <td>
                    <input type="number" onChange={(e) => setPrice(parseInt(e.target.value, 10))} />
                </td>
                <td>
                    <input type="number" onChange={(e) => setQuantity(parseInt(e.target.value, 10))} />
                </td>
                <td className="d-flex justify-content-left align-items-center">
                    <input                        
                        type="file"
                        multiple ref={inputImageFile}
                    />
                </td>
            </tr>
        </>
    )
}

export default RowProductVariant