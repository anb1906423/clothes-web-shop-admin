import React from 'react'
import { menu } from '../data/data'

const Section = () => {
    return (
        <div className='section w-100'>
            <div className="logo-box text-center">
                <img className='logo' src="http://localhost:3000/img/logo.png" alt="" />
            </div>
            <ul className="menu position-relative">
                {
                    menu && menu.map((item, index) => {
                        return (
                            <li className='menu-item text-uppercase fw-bold' key={index}>
                                <a className='w-100' href={item.href}>{item.title}</a>
                                <ul className='sub-menu position-absolute w-100'>
                                    {
                                        item.list && item.list.map((listItem, i) => {
                                            return (
                                                <li key={i} className='w-100'>
                                                    <a
                                                        href={listItem.href}
                                                        className="w-100"
                                                    >

                                                        {listItem.title}
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Section