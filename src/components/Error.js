import React, { useContext, useEffect } from 'react'
import MainContext from '../MainContext'

const Error = () => {
  const { error } = useContext(MainContext);

  return (
    <div className='auto-complete' style={{ backgroundColor: "#FF4A63", color: "white", textAlign: "center" }}>
      Sorry! Searched city is not found.
    </div>
  )


}

export default Error