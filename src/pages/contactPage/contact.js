import React from 'react';
import call from '../../App/assets/images/call.png';
import gmail from '../../App/assets/images/Gmail.png';
import location from '../../App/assets/images/location.png';
import facebook from 'App/assets/images/facebook.svg';
import instagram from 'App/assets/images/instagram.svg';
import twitter from 'App/assets/images/twitter.svg';
import Footer from 'shared/components/Footer';
import Nav from 'shared/components/Nav';
import { Button, Input, Form } from "antd";
import "antd/dist/antd.css";
import { Wrapper, CompanyInfo, H2, Contact, Div, Textarea, Ul, Li, Img, P, DDiv, Imga} from '../../shared/styles/ContactStyle'



const contactPage = () =>  {

  return(
    <div>
      <Nav />
      <div className="container" >
        <Wrapper>
          <CompanyInfo>
            <H2>GET IN TOUCH</H2>
            <P>Have any question do not hesitate to ask reach out to us.</P> 
            
            <Ul>
              <Li><Img src={gmail} />info @orcas-phantom.com</Li>
              <Li><Img src={call} />+250788880000</Li>
              <Li><Img src={location} />KN 67 Street Nyarugenge, Kigali</Li>
            </Ul>
            <DDiv>
              <Imga src={facebook}/>
              <Imga src={twitter}/>
              <Imga src={instagram}/>
            </DDiv>
          </CompanyInfo>
          <Contact>
            <Form>
              <Div>
                <Input type="text" className="input" placeholder="your names" required />
              </Div>
              <Div>
                <Input type="email" className="input" placeholder="your email" required />
              </Div>
              <Div>
                <Textarea  placeholder=" Message"/>
              </Div>
              <Div>
                <Button type="primary" className="button" >
                   SEND
                </Button>
              </Div>
            </Form>

          </Contact>
        </Wrapper>
       
      </div>
      <Footer />
      
    </div>
  )
  


}

export default contactPage;
