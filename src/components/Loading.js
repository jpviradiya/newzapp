import React from 'react'
import loading from './loading.gif';

const Loading=()=>{
    return (
      <div className="text-center">
        <img src={loading} alt="" style={{ mixBlendMode: 'multiply' }} />
      </div>
    )
  }
export default Loading