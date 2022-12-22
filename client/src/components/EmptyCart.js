import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {GiShoppingCart} from 'react-icons/gi'

const EmptyCart = () => {
  return (
    <EmptyDiv>
     
        <GiShoppingCart className='cart'/>
        <h2>Empty Cart</h2>
        <h4>Ooopsss...! Looks like You Have Not Added Anything in Your Cart</h4>
        <NavLink to="/products">
        <h3>Continue Shopping</h3>
        </NavLink>
       
    </EmptyDiv>
  )
}

export default EmptyCart;


const EmptyDiv = styled.div`
  display: grid;
  place-items: center;
  height: 60vh;
 
 

  .cart{
    font-size: 30rem;
    text-transform: capitalize;
    font-weight: 300;
    color:red;
  }

  h2 {
    font-size: 4.2rem;
    text-transform: capitalize;
    font-weight: 300;
    margin-top:-10rem;
    font-family: Lucida Handwriting;
    color:red;
  }
  h4{
    font-family:Garamond;
    font-size: 2.2rem;
    margin-top:-10rem;
  }
  h3{
    font-family:Copperplate;
    font-size:2.5rem;
    margin-top:-7rem;
    border:3px solid;
    border-radius:10px;
    padding:10px;
    color:white;
    background-color: rgb(98 84 220);
  }


`;