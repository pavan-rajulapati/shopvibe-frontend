import React from 'react'
import { useNavigate } from 'react-router-dom'

const GetToken = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('authToken')
    if(!token){
        navigate('/login')
    }
    
    return (
        <div>GetToken</div>
    )
}

export default GetToken