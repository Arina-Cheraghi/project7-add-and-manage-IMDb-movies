import React from 'react';

function ErrorMessage({message}) {
  return (
    <p className='error' style={{ marginTop: "50%", color: "#D6589F" }}>{message}</p>
  )
}

export default ErrorMessage
