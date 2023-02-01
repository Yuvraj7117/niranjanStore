import React, { useState } from 'react';
import styled from "styled-components"
import { Button } from '../styles/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import Axios from "axios"

const Registration = () => {

    const navigate = useNavigate()
    
    //register
    let user = { firstname: "", lastname: "", email: "", password: "", confirmPassword: "", image:"" }

    const [disable, setDisable] = useState(0)
    const [userRegister, setUserRegister] = useState(user)
    const [registerSubmit, setRegisterSubmit] = useState([])
    const [errors, setErrors] = useState({})
    const [displayResponse,setDisplayResponse] = useState ({})

    const [showPassword, setShowPassword] = useState({ booleans: true, types: "password" })


    const handleRegisterInput = (e) => {

        const { name, value } = e.target
        setUserRegister({ ...userRegister, [name]: value })
        setDisable(0)
    }

    
    const handleImageInput=(e)=>{
        const file= e.target.files[0]

        //transformFile
        const reader = new FileReader()
       if(file){
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            setUserRegister({...userRegister,image:reader.result})
        };
       }
       
   }


    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(userRegister))
        let { firstname, email, password, confirmPassword } = userRegister
        if (password === confirmPassword) {
            if (firstname && email && password && confirmPassword !== "") {
                setRegisterSubmit([...registerSubmit, userRegister])
                userApi(userRegister)
           
                setUserRegister(user)
                setDisable(1)
                setTimeout(()=>{
                    navigate("/login")
                },3000)
            }
        } else return

    }

    const userApi = async (data) => {
   

        let { firstname, lastname, email, password, confirmPassword, image } = data
       
        try {
            let result = await Axios.post("http://localhost:5000/api/register", {
                firstname, lastname, email, password, confirmPassword, image
               
            })
            setDisplayResponse(result)
        } catch (err) {
           const existUser = err.response.data
           setDisplayResponse(existUser)
        }
    }
   

    const validate = (values) => {
        let { firstname, email, password, confirmPassword} = values
       
        const errors = {}
        const regex = /^[^\s@]+@[^\s@].[^\s@]{2,}$/i;
        if (!firstname) {
            errors.firstname = "Name is Required..!";
            setDisable(1)
        }
        else if (!email) {
            errors.email = "Email is Required..!";
            setDisable(0)
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a Valid Email"
            setDisable(0)
        }
        else if (!password) {
            errors.password = "Password is Required..!";
            setDisable(0)

        } else if (password !== confirmPassword) {
            errors.password = "Password Doesn't Match"
            setDisable(0)

        } else if (password.length < 8) {
            errors.password = "Password Length Should be Greater than Eight Characters";
          
            setDisable(0)
        }
        return errors
    }

    const hidePassword = () => {
        
        if (showPassword.booleans === false) {
            setShowPassword({ booleans: true, types: "password" })
        }
        if (showPassword.booleans === true) {
            setShowPassword({ booleans: false, types: "text" })
          
        }
    }


    return (
        <>
            <Wrapper>
                <form onSubmit={handleRegisterSubmit} method="POST">
                    <div className='inputs'>
                        <label>First Name</label>
                        <input type="text" placeholder='Enter First Name' name="firstname" value={userRegister.firstname} onChange={handleRegisterInput} />
                        {
                            errors && <p style={{ color: "red" }}>{errors.firstname}</p>
                        }
                    </div>

                    <div className='inputs'>
                        <label>Last Name</label>
                        <input type="text" placeholder='Enter Last Name' name="lastname" value={userRegister.lastname} onChange={handleRegisterInput} />
                    </div>

                    <div className='inputs lowerCase'>
                        <label> Email </label>
                        <input type="email" placeholder='Enter Your Email' name="email" value={userRegister.email} onChange={handleRegisterInput} />
                        {
                            errors && <p style={{ color: "red" }}>{errors.email}</p>
                        }
                    </div>

                    <div className='inputs '>
                        <label>Password</label><div className="psinput">
                            <input type={showPassword.types} placeholder='Enter New Password' name="password" value={userRegister.password} onChange={handleRegisterInput} /><span onClick={hidePassword}>{
                                showPassword.booleans ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</span>
                            {
                                errors && <p style={{ color: "red" }}>{errors.password}</p>
                            }
                        </div>
                    </div>

                    <div className='inputs '>
                        <label>Confirm Password</label>
                        <div className="psinput">
                            <input type={showPassword.types} placeholder='Confirm Password' name="confirmPassword" value={userRegister.confirmPassword} onChange={handleRegisterInput} /><span onClick={hidePassword}>{
                                showPassword.booleans ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</span>
                            {
                                errors && <p style={{ color: "red" }}>{errors.password}</p>
                            }
                        </div>
                    </div>
            
                    <div className='inputs'>
                        <label>Choose a Profile</label>
                        <input type="file" accept='image/' name="image" onChange={handleImageInput} style={{cursor:"pointer"}}/>
                    </div>
                    <div className='inputs'>
                   {
                    displayResponse.status===200 ? <h3 style={{color:"green"}}>{displayResponse.data} </h3> : <h3 style={{color:"red"}}>{displayResponse.error}</h3>
                    } 
                   </div >
              
              <Button type="submit" disabled={disable}>Register</Button>

              
                </form>
             <div className='bottom'>
         
             <h3>Or</h3>
          
                <b >Already Have an Account?</b>
               
              <Button><NavLink to="/login">Login</NavLink></Button>
             </div>
            </Wrapper>

        </>
    )
}

export default Registration;

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

    input{
        border: none;
        border-bottom:1px;
        outline :none;
       
       
    }
}

.psinput input{
    width:100%;
  
}

.psinput span{
   position:relative;
   left:25rem;
   top:-4rem;
   font-size:3rem;
   color:rgb(107, 104, 104);

   &:hover{
    cursor:pointer
   }
}

Button:disabled {
    background-color: gray;
    &:hover{
        transform:scale(1);
    }
}

.lowerCase{
    text-transform: lowercase
}

.bottom{
    font-size:2rem;
    line-height:3rem;
    display:grid; 

    h3{
        display:flex;
        justify-content:center;
    },
   
}

`