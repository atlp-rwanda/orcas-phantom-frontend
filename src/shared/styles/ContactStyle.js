import Styled from 'styled-components';

export const Wrapper =Styled.div`
background-color: #1C235A;
display: flex;
flex-direction: row;
border-radius: 10px;
margin-left: 10%;
margin-ritght: 9%;
margin-top: 1%;
width: 80%;
justify-content: space-evenly;
height: -50%;
@media (max-width: 700px) {
  display: flex;
flex-direction: column;
background-color: #1C235A;
width: 100%;
margin-left: 1%;
margin-ritght: 1%;
height: 100%;
}
`;

export const CompanyInfo=Styled.div`
padding: 3em;
color: white;
text-decoration: none;
line-width: 1px;
margin-top: 2%;
margin-left: 8%
font-size: 20px;
@media (max-width: 700px) {
  margin-left: -8%
  padding: 4em;
  font-size: 14px;
  margin-top: -10%;
}
`;
export const H2=Styled.h1`
color: white;
font-weight: bold;
margin-left: 8%
@media (max-width: 700px){
  margin-left: 4%
}
`;

export const Contact =Styled.div`
display: flex;
flex-direction: column;
background-color: white;
width: 34%;
height: 50%;
padding: 1em;
margin-top: 4%;
margin-bottom: 5%;
margin-right: 10%;
border-radius: 10px;
@media (max-width: 700px) {
  width: 90%;
  margin-top: 0%;
  height: 25%;
  margin-left: 4%;
  margin-right: 2%;
  margin-bottom: 5%;
  margin-top: -5%;
}
`;

export const Div=Styled.div`
margin-left: 5%;
margin-top:10%;
`;

export const Textarea=Styled.textarea`
width: 90%;
height: 100px;
border-radius: 10px;
background-color: #E8E9F1;
border-color: #276EF1;
padding: 1em;
@media (max-width: 700px) {
  height: 90px;
}
`;



export const Ul=Styled.ul`
margin-top: 2%;
list-style: none;
`;
export const Li=Styled.li`
text-decoration: none;
margin-top: 5%;
cursor: pointer;
`;
export const Img=Styled.img`
margin-right: 4%;
`;
export const P=Styled.p`
display: flex;
align-items: center;
margin-top: 1%;
margin-right: 30%;
margin-left: 4%;
@media (max-width: 700px) {
  margin-right: 2%;
}
`;
export const DDiv=Styled.div`
display: none;
@media (max-width: 700px) {
  display: block;
}
`;
export const Imga=Styled.img`
margin-left: 50px;


`;
