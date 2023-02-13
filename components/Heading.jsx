import React from 'react'

const Heading = (props) => {
    return (
        <div
            className='heading fw-bold text-center text-uppercase'
            style={{
                margin: "12px"
            }}
        >
            {props.title}
        </div>
    )
}

export default Heading