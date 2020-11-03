import Styled from 'styled-components';

export const Span=Styled.span`
margin-left: 9%;

color: #10A0EE;
font-size: 30px;
cursor: pointer;
@media (max-width: 700px) {
  font-size: 27px;
  margin-left: 10%;
  font-weight: bold;
}
`;
export const Wrapper=Styled.div`
 display: flex;
 width: 80%;
 margin-left: 8%;
 margin-right: 10%;
 @media (max-width: 700px) {
  display: flex;
  flex-direction: column;
  margin-left: 0%;
  margin-right: 0%;
}
`;
export const Img=Styled.img`
margin-top: 3%;
height: 70vh;
@media (max-width: 700px) {
  width: 125%;
  height: 40vh;
  margin-right: 0%;
}
`;
export const H1=Styled.h1`
font-weight: bold;
margin-left: 2%;
font-size: 50px;
`;
export const Our=Styled.div`
margin-top: 4%;
margin-left: 2%;
width: 7%;
height: 1.7%;
background-color: #FC0E0E;
@media (max-width: 700px) {
  width: 12%;
  height: 0.8%;
}
`;
export const H4 =Styled.h4`
display: none;
@media (max-width: 700px) {
  display: block;
  color:#FC0E0E;
}
`;

