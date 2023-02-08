import React from 'react'
import Section from './Section'

const Layout = ({ children }) => {
  return (
    <div className='row'>
      <div className="col-3">
        <Section />
      </div>
      <div className="cont col-9">
        {children}
      </div>
    </div>
  )
}

export default Layout