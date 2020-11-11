import React from 'react';
import PropTypes from 'prop-types';
import  {Span} from '../../shared/styles/FaqsStyle';
import   '../../shared/styles/faqs.css';

function  Faqs({faq, index, toggleFaq}) {

  return (
    <div data-testid="faqs"
      className={"faq " + (faq.open ? 'open': '')}
      key={index}
      onClick={ () =>toggleFaq(index)}
    >
      <div className="faq-question">
        {faq.question}
        <Span >
          {faq.open ? '-': '+'}</Span>
      </div> 
      <div className="faq-ansuer">
        {faq.ansuer}
      </div>        
    </div>
  )
}
Faqs.propTypes={
  faq: PropTypes.object,
  index: PropTypes.number,
  toggleFaq: PropTypes.func
};

export default Faqs;
