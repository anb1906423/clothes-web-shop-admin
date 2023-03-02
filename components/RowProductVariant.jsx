import React from 'react';

import UploadImageBoxox from '@/components/UploadImageBox';

const RowProductVariant = ({ index, listProductVariant, setListProductVariant }) => {

    // const createProductVariant = async () => {
    //     let dataProductVariant = new FormData();
    //     dataProductVariant.append('price', price);
    //     dataProductVariant.append('quantity', quantity);
    //     dataProductVariant.append('product_id', product_id);
    //     dataProductVariant.append('colour_id', colour_id);
    //     dataProductVariant.append('size_id', size_id);
    //     for (let file of inputImageFile.current.files)
    //         dataProductVariant.append('product_images', file);
    //     try {
    //         let result = await axios.post(
    //             'http://localhost:8080/api/product-variant/create',
    //             dataProductVariant,
    //             {
    //                 headers: { 'Content-Type': 'multipart/form-data' }
    //             }
    //         );
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const handlePriceChance = (e) => {
        let listProductVariantClone = [ ...listProductVariant ];
        listProductVariantClone[index].quantity = e.target.value;
        setListProductVariant(listProductVariantClone);
    }

    return (
        <>
            <tr className='row-product-admin'>
                <td><input type="checkbox"/></td>
                <td>
                    {listProductVariant[index].colour_name}
                </td>
                <td>
                    {listProductVariant[index].size_name}
                </td>
                <td>
                    <input type="number" value={listProductVariant[index].quantity} onChange={handlePriceChance} />
                </td>
                <td className="d-flex justify-content-left align-items-center">
                    {/* <input                        
                        type="file"
                        multiple ref={inputImageFile}
                    /> */}
                    <UploadImageBoxox 
                        index={index}
                        listProductVariant={listProductVariant}
                        setListProductVariant={setListProductVariant}
                    />
                </td>
            </tr>
        </>
    )
}

export default RowProductVariant
