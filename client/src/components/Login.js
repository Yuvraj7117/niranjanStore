import React, { useState, useContext } from 'react';
import { UserContext } from "../context/userContext";
import styled from 'styled-components';
import { Button } from '../styles/Button';
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {
  const { loginApi, loginUser } = useContext(UserContext)

  const data = { email: "", password: "" }
  const [loginInput, setLoginInput] = useState(data)
  const [check, setCheck] = useState("")


  const navigate = useNavigate()



  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value })
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    let { email, password } = loginInput
    if (email && password !== "") {

      loginApi(loginInput)

      setLoginInput(data)
      if (loginUser.statusText === "Authorized") {
        navigate("/")
      } else if (loginUser.statusText === "Unauthorized") {
        navigate("/login")
      }
    }
    else {
      setCheck("Email and Password Should Not be Empty, Please Fill Email and Password")
    }


  }


  return (
    <>
      <Wrapper>

        <form onSubmit={handleLoginSubmit} method="POST">
          <div className='inputs'>
            <label> Email </label>
            <input type="email" placeholder='Enter Your Email' name="email" value={loginInput.email} onChange={handleLoginInput} />
          </div>

          <div className='inputs'>
            <label>Password</label>
            <input type="password" placeholder='Enter New Password' name="password" value={loginInput.password} onChange={handleLoginInput} />
          </div>

          <Button type="submit" >Login</Button>


          <div className='error'>
            {

              loginUser.status === 401 ? <h3>{loginUser.data}</h3> : <h3>{loginUser.message}</h3>
            }

          </div>


        </form>
        <p style={{ color: "red" }}>{check === "" ? "" : check}</p>
        <div className='bottom'>

          <h3>New User?</h3>
          <Button ><NavLink to="/register">Register</NavLink></Button>
        </div>



      </Wrapper>

    </>
  )
}

export default Login;


const Wrapper = styled.section`
    display:grid;
    place-items:center;

form {
   
    font-size:2rem;
    line-height:3rem;
    display:grid;  
}

.inputs{
    margin:10px 0px;
    display:grid;
}

Button:disabled {
  background-color: gray;
  &:hover{
      transform:scale(1);
  }
}

.bottom{
  font-size:2rem;
  line-height:3rem;
  display:grid; 

  h3{
      display:flex;
      justify-content:center;
      margin:10px 0;
  }  
}

.error{
  font-size:2rem;
  line-height:3rem;
  display:grid; 

  h3{
      display:flex;
      justify-content:center;
      margin:10px 0;
      color:red;
      font-size:25px
  } 
} `