import React, { useEffect } from 'react'
import Section from './Section'
import Router, { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const Layout = ({ children }) => {
  const params = useRouter()
  const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const admin = useSelector((state) => state);

  useEffect(() => {
    console.log("Layout đã check trạng thái của user. Trạng thái hiện tại là: " + JSON.stringify(admin));
    if (!isLoggedIn) {
      Router.push('/login')
    }
  }, [isLoggedIn])

  return (
    <>
      {
        params.pathname === '/login'
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