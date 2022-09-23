import React from 'react'

const Layout = (props) => {

  return (
    <div className=' bg-gray-800 h-screen'>
      {props.children}
    </div>
  )
}

export default Layout