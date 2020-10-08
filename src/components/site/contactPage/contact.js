import React from 'react';
import Styled from '@emotion/styled';
import  Nav from '../Nav';
import Footer from '../Footer';


const H1 = Styled.h1`
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500&display=swap');
text-align: center;
font-family:'Ubuntu', sans-serif;

`;
const Div =Styled.div`
 display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 10%;
    width: 100%;
    flex-basis: 4rem;
    padding-top: 20px;
`;



const  Input = Styled.input`
background: transparent;
outline: none;
border: none;
align-items: center;
border-bottom: solid;
border-width: thin;
width: 40%;
height: 80px;
color: rgb(9, 85, 85);
font-size: 17px;
text-align: left;
font-family:'Ubuntu', sans-serif;
margin-rigth: 30%;
margin-left: 30%;
padding :10px;


`;
const Textarea= Styled.textarea`
background: transparent;
    outline: none;
    border: none;
    border-bottom: solid;
    border-width: thin;
    width: 40%;
    height: 80px;
    color: rgb(9, 85, 85);
    font-size: 17px;
    text-align: left;
    font-family:'Ubuntu', sans-serif;
    margin-rigth: 30%;
    margin-left: 30%;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
`;
const Button=Styled.button`
  border: none;
  outline: none;
  height: 40px;
  background-color:rgb(46, 125, 245);
  font-family:'Ubuntu', sans-serif;
  color: #fff;
  font-size: 16px;
  border-radius: 8px;
  margin-rigth: 30%;
  margin-left: 30%;
  width: 40%;
  margin-top: 10px;
`;

const contactPage = () =>  {

  return(
    <div>

      <Nav />
      <H1><span>Contact Us</span></H1> 
      <Div>
         
        <form id="contactForm">
              
          
          <Input type="text" name="" id="name" placeholder="Enter your full name" required >
          </Input>
          
          <Input type="email" name="" id="email" placeholder="Enter your email" required  >
          </Input>
          <Textarea name="" id="message" cols="30" rows="10" placeholder="Leave your message here" required></Textarea>
         
          <div>
            <Button>Send</Button>               
          </div>
        </form>
      </Div>

      <Footer />
       
    </div>
  )
  


}

export default contactPage;
