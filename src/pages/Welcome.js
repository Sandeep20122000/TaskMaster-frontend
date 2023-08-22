import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [currentUser, navigate])
  
  
  return <div></div>
}

export default Welcome;