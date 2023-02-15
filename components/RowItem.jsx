import React from 'react'

const RowItem = (props) => {

    return (
        <>
            <tr>
                <td scope="row">{props.colorItem}</td>
                <td>{props.sizeItem}</td>
                <td>
                    <input type="text" />
                </td>
                <td>
                    <input type="text" />
                </td>
            </tr>
        </>
    )
}

export default RowItem