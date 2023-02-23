import React, { useEffect } from 'react'
import Section from './Section'
import Router, { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const Layout = ({ children }) => {
  const prams = useRouter()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      Router.push('/login')
    }
  }, [isLoggedIn])

  return (
    <>
      {
        prams.pathname === '/login'
          ? children : isLoggedIn && (
            <div className="overflow-hidden">
              <div className='row'>
                <div className="col-3">
                  <Section />
                </div>
                <div className="cont col-9">
                  {children}
                </div>
              </div>
            </div>
          )}
    </>
  )
}

export default Layout