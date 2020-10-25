import Styled from 'styled-components';


export const Container =Styled.div`
margin-left: 10%;
margin-right: 10%;
margin-top: 3%;
margin-bottom: 2%;
@media (max-width: 700px) {
margin-left: 4%;
margin-right: 1%;
}
`;

export const Wrapper=Styled.div`
display: flex;
@media (max-width: 700px) {
  display: flex;
flex-direction: column;
margin-right: 0%;
}

`;
export const H1=Styled.div`
margin-left: 50%;
margin-top: 2%;
@media (max-width: 700px) {
  margin-left: 5%;
}
`;
export const Bottom =Styled.div`
display: flex;
@media (max-width: 700px) {
  display: flex;
flex-direction: column;
}

`;
export const BottomDiv =Styled.div`
display: flex;
margin-right: 6%;
@media(max-width: 700px){
margin-right: 3%;
}

`;
export const BottomDi =Styled.div`
display: flex;
margin-left: 6%;
@media(max-width: 700px){
  margin-left: 0%;
  margin-right: 2%;
}

`;
export const Left=Styled.div`
margin-right: 12%;
@media(max-width: 700px){
  margin-right: 0%;
}
`;
export const Right=Styled.div`
margin-left: 1%;
`;
export const Our=Styled.div`
margin-top: 10%;
width: 10%;
height: 1.7%;
background-color: #FC0E0E;
@media (max-width: 700px) {
  margin-top: 10%;
  width: 10%;
  height: 1%;
  background-color: #FC0E0E;

}
`;
export const Ourv=Styled.div`
width: 10%;
height: 1%;
background-color: #FC0E0E;
`;
export const Imagebox=Styled.div`
margin-left: 6%;
@media (max-width: 700px) {
margin-left: 20%;
margin-right: 0%;
}

`;

export const Img=Styled.img`
@media (max-width: 700px) {
width: 95%;
height: 70%;
}
`;
export const P=Styled.p`
@media (max-width: 700px) {
  width: 96%;
  font-size: 12px;
  
  
  }
`;
export const H3=Styled.h3`
font-weight: bold;
@media (max-width: 700px) {
  width: 90%;
  font-size: 14px;
  margin-right:1%;
  font-weight: bold;
  }
`;
export const Image=Styled.img`
@media (max-width: 700px) {
  width: 200%;
  height: 60%;
  margin-top: 60%;
}
`;

export const H4 =Styled.h4`
display: none;
@media (max-width: 700px) {
  display: block;
  color:#FC0E0E;
}
`;
