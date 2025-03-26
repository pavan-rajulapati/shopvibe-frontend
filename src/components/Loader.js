import React from 'react'
import '../styles/loader.css'

const Loader = () => {
  return (
    <div>
        <div className="loader-overlay">
			<div className="loader">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
        </div>
    </div>
  )
}

export default Loader