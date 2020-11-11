import React,{useState} from 'react';
import Nav from 'shared/components/Nav';
import Footer from 'shared/components/Footer';
import Question from '../../App/assets/images/question.jpeg';
import Faqs from './Faqs';
import {Wrapper,Img,H1,Our,H4} from '../../shared/styles/FaqsStyle'
import   '../../shared/styles/faqs.css';



const Faqpage = () =>{
  const [faqs, setfaqs]=useState([
    {
      question: 'How accurate is the min calcuration ?',
      ansuer: 'None don\'t address hardware issue',
      open: false
    },
    {
      question: 'How accurate is the min calcuration ?',
      ansuer: 'None don\'t address hardware issue None don\'t address hardware issue None don\'t address hardware issue None don\'t address hardware issue',
      open: false
    },
    {
      question: 'How accurate is the min calcuration ?',
      ansuer: 'None don\'t address hardware issue None don\'t address hardware issue None don\'t address hardware issue None don\'t address hardware issue ',
      open: false
    },
    
    {
      question: 'How accurate is the min calcuration ?',
      ansuer: 'None don\'t address hardware issue',
      open: false
    }
  ]);
  const toggleFaq= key =>{
    
    setfaqs(faqs.map((faq, i)=>{
      
      if(i === key ){
        faq.open= !faq.open
      }else{
        faq.open= false;
      }
      return faq;
    }))

  }
 
  return(
    <div>
      <Nav />
      <Wrapper>
        <div className="image" >
          <Img src={Question} />
        </div>
        <div  className="faqs">
          <Our><H4>i</H4></Our>
          <H1>FAQ</H1>
          {faqs.map((faq, i) =>(
            <div key={i}>
              <Faqs faq={faq} index={i} toggleFaq={toggleFaq}/>   
            </div>
          ))}
        </div>
        
      </Wrapper>
      <Footer />
    </div>
  )
}

export default Faqpage;
