import React from 'react'
import FormSignin from './components/FormSignin'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, signin } from '../../../features/authSlice'
import jwtDecode from 'jwt-decode'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

const SigninPage = () => {
const [cookies, setCookie] = useCookies(['token']);
const dispatch = useDispatch()
const data = useSelector(authSelector.selectToken)
const loading = useSelector(authSelector.loading)
const navigate = useNavigate() 

const handleSubmit = async (payload) => {
     dispatch(signin(payload))

     if (data) {
      setCookie('token', data.token, { path: '/' });
      const user = jwtDecode(cookies.token)
      if(user.role === 'admin') {
        navigate('/admin/dashboard')
        return
      } else {
        navigate('/test')
      }
     }
  }
  
  return (
    <FormSignin onSubmit = {handleSubmit}/>
  )
}

export default SigninPage