import React from 'react';
import Styled from '@emotion/styled'
import locationIcon from  'App/assets/images/placeholder.svg';
import locationImage from 'App/assets/images/location.svg';
import Nav from 'shared/components/Nav';
import Footer from 'shared/components/Footer';

const H1= Styled.h1`
text-align: center;
margin-left: 5%;
margin-top: 10px;
font-family:'Ubuntu', sans-serif;
`;
const P=Styled.p`
text-align: center;
width: 60%;
height:35%;
font-family:'Ubuntu', sans-serif;
margin-bottom: 2%

`;
const Pa=Styled.p`
text-align: left;
`;
const Div= Styled.div`
display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    height: 78vh;
    width: 50%;
    flex-basis: 4rem;
    bottom: 10px;
    margin-left: 27%;
`;
const H2=Styled.h2`
text-align: center;
margin-bottom: 12px;
`;
const Img= Styled.img`
width:50px;
height:20px;
`;
const DivlocationIcon = Styled.div`
margin-bottom: 0.5%;
`;

const Image=Styled.img`
border:solid;
height: 200px;
margin-top: 0%;
`;

const aboutPage = ()=>{
  
  return(
    <div>
      <Nav />
      <H1><span>About Us</span></H1>
      <Div>
        <H2>Who we are</H2>
        <P>
          
          The  service is part of the  $20 million assembly plant
           in Rwanda which released its first fleet of cars last year. The App works 
           on iOS and Android Smartphones, which 
          operates similarly to popular international taxi hailing platforms which use 
          the Global Positioning System (GPS).
        </P>
        <DivlocationIcon>
          <Img src={locationIcon} /><Pa>Kigali-Rwanda</Pa>
        </DivlocationIcon>
        <div className="locationImage">
          <Image src={locationImage} />
        </div>               
      </Div>
      <Footer />
       
    </div>
  )
}

export default aboutPage;
