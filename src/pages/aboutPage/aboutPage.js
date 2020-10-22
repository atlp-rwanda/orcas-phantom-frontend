import React from 'react';
import Nav from 'shared/components/Nav';
import Bus from '../../App/assets/images/car.jpeg';
import Phone from '../../App/assets/images/phone.jpeg';
import Watch from '../../App/assets/images/watch.jpeg';
import Tower from '../../App/assets/images/tower.jpeg';
import {Container,Wrapper,H1,Bottom,BottomDiv,BottomDi, Ourv,Our,Right,Left,Image,H3,P,Img,Imagebox,H4} from '../../shared/styles/AboutStyle'
import Footer from 'shared/components/Footer';

const aboutPage = ()=>{
  
  return(
    <div>
      <Nav/>
      <Container>
        <Wrapper>

          <Left>
            <Our><H4>i</H4></Our>
            <h2>OUR</h2>
            <h1>MISSION</h1>
            <Img src={Bus} />
            <P>With “Move Share” you and your business can have access to a 
            fully managed fleet of new Volkswagens vehicles. This app based 
            solution offer chauffeur-driven services. With “Move Share” your 
            employees and colleagues can get where they need to when they need to.
            Move Ride gives you access to a driven car at the push of a button. 
            You, your friends and colleagues can get a ride in Volkswagen vehicles 
            for your personal needs,picked up on demand when you need to, where you need to.
            </P>
            <H3>We make sure you dont spend time, on bus stop waiting for a bus you dont know when is comming  </H3>
          </Left>
          <Right>
            <P>With “Move Share” you and your business can have access to a 
            fully managed fleet of new Volkswagens vehicles. This app based 
            solution offer chauffeur-driven services. With “Move Share” your 
            employees and colleagues can get where they need to when they need to.
            Move Ride gives you access to a driven car at the push of a button. 
            You, your friends and colleagues can get a ride in Volkswagen vehicles 
            for your personal needs,picked up on demand when you need to, where you need to.
            </P>
            <H3>We make sure you dont spend time, on bus stop waiting for a bus you dont know when is comming  </H3>
            <Our><H4>i</H4></Our>
            <h2>OUR</h2>
            <h1>STORY</h1>
            <Img src={Phone} />

          </Right>
        </Wrapper>
        <H1>
          <Ourv></Ourv>
          <h1>OUR VALUES</h1>
        </H1>
        <Bottom>
          <BottomDiv>
            <div>
              <Image src={Watch}/>
            </div>
            <Imagebox>
              <h2>TIME MANEGMENT</h2>
              <p>With “Move Share” you and your business can have access to a 
            fully managed fleet of new Volkswagens vehicles. This app based</p>
            </Imagebox>
          </BottomDiv>
          <BottomDi>
            <div>
              <Image src={Tower}/>
            </div>
            <Imagebox>
              <h2>QUICK SERVICE</h2>
              <p>With “Move Share” you and your business can have access to a 
            fully managed fleet of new Volkswagens vehicles. This app based
              </p>
            </Imagebox>
          </BottomDi>
            
        </Bottom>
      </Container>
      <Footer/>
    </div>
  )
}

export default aboutPage;
