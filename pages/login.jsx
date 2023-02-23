import React, { useState, useEffect, useRef } from 'react'
import Heading from '@/components/Heading'
import { homeAPI } from '@/config'
import Router from 'next/router'
import { swtoast } from '@/mixins/swal.mixin'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const emailRef = useRef()
    const passwordRef = useRef()

    const dispatch = useDispatch();

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email) {
            swtoast.fire({
                text: "Please enter your email"
            })
            emailRef.current.focus()
            return
        }

        if (!password) {
            swtoast.fire({
                text: "Please enter your password"
            })
            passwordRef.current.focus()
            return
        }

        try {
            const response = await axios.post(homeAPI + '/admin/login', {
                email: email,
                password: password
            })
            swtoast.success({
                text: "Đăng nhập thành công"
            })

            const { data } = response
            console.log(data);

            dispatch(actions.userLoginSuccess(data));

            setEmail('')
            setPassword('')
            Router.push('/')
        } catch (error) {
            swtoast.error({
                text: "Email or Password is wrong!"
            })
            console.log(error);
        }
    }
    return (
        <div className='login-page position-fixed d-flex justity-content-center align-items-center'>
            <div className="login-box">
                <Heading title="Đăng nhập" />
                <form action="" onSubmit={handleLogin}>
                    <div className="w-100">
                        <input
                            placeholder="Email"
                            className='w-100'
                            type="email"
                            ref={emailRef}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='w-100'>
                        <input
                            placeholder='Password'
                            className='w-100'
                            type="text"
                            ref={passwordRef}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
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