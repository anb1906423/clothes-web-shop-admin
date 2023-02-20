import React, { useState, useEffect, useRef } from 'react'
import Heading from '@/components/Heading'
const login = () => {

    const usernameRef = useRef()
    
    useEffect(() => {
        usernameRef.current.focus()
    }, [])
    return (
        <div className='login-page position-fixed d-flex justity-content-center align-items-center'>
            <div className="login-box">
                <Heading title="Đăng nhập" />
                <form action="">
                    <div className="w-100">
                        <input
                            placeholder="Email"
                            className='w-100'
                            type="text"
                            ref={usernameRef}
                        />
                    </div>
                    <div className='w-100'>
                        <input placeholder='Password' className='w-100' type="password" />
                    </div>
                    <button className="login-btn w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default login