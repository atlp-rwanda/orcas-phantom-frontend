import React from 'react';
import Styled from '@emotion/styled';
import  Nav from '../Nav';
import Footer from '../Footer';



const H1=Styled.h1`
text-align:center;
text-decoration: underline;
margin-bottom:10px;
font-family:'Ubuntu', sans-serif;
`;
const H2=Styled.h2`
text-align:center;
margin-bottom:15px;
font-family:'Ubuntu', sans-serif;

`;

const Div=Styled.div`
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
flex-wrap: wrap;
justify-content: space-around;
`;
const Button=Styled.button`
 width: 500px;
 height: 60px;
 margin-bottom:15px;
 font-family:'Ubuntu', sans-serif;
`;


const Faqs = () =>{
 
  return(
    <div>
      <Nav />
      <H1><span>FAQs</span></H1>
      <H2>Frequently Asked questions</H2>
      <Div>
        <Button >How can I get information about Phantom app </Button>
        
        <Button>How can I get information about Phantom app</Button>
        
        <Button>How can I get information about Phantom app</Button>
        
        <Button>How can I get information about Phantom app</Button>
        
      </Div>
      <Footer />
       
    </div>
  )
}

export default Faqs;
