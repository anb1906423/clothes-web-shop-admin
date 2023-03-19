import React, { useEffect } from 'react'
import Section from './Section'
import Router, { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const Layout = ({ children }) => {
	const params = useRouter()
	const isLoggedIn = useSelector((state) => state.admin.isLoggedIn);

	useEffect(() => {
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
								<div className="cont col-9" style={{ paddingRight: "36px" }}>
									{children}
								</div>
							</div>
						</div>
					)
			}
		</>
	)
}

export default Layout