import React, { useContext } from "react";
import { AppContext } from "../../../context/AppProvider";
import propTypes from "prop-types";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validatePassword from "../../../shared/utils/validate-input";
import Nav from "../../../shared/components/Nav";
import phoneApp from "../Assets/phoneApp.png";
import Styled from "@emotion/styled";
import "./css/AdminLogin.css";
import copyright from "../Assets/copyright.png";
import facebook from "../Assets/facebook.png";
import instagram from "../Assets/instagram.png";
import twitter from "../Assets/twitter.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Image, Input, Button, Checkbox, Form } from "antd";

const Body = Styled.div`
display: flex;
@media (max-width: 957px ){
  display:block
}
`;
const PhoneApp = Styled.div`
       background-size: cover; 
        width: 50vw;
        margin-left: 8vw;
        @media (max-width: 1100px ) and (min-width: 960px){
          margin-top: 40px;
          display:table;
          margin:0 auto;
        }
        @media (max-width: 957px){
          margin-top: 40px;
          display:table;
          margin:0 auto;
        }
        
`;
const LoginForm = Styled.div`
       display: flex;
        flex-direction: column;
        width: 30vw;
        margin-right: 15px;
        margin-left: -50px;
        padding: 8px;
        @media (max-width: 1100px ) and (min-width: 960px){
          display:table;
          margin:0 auto;
        }
        @media (max-width: 957px){
          display:table;
          margin:0 auto;
          width: 70vw;
        }
`;
const H2 = Styled.div`
width: 20vw;
display:table;
margin:0 auto;
margin-top: 0px;
margin-bottom: 0vh;
padding-top: 40px;
padding-bottom: 10px;
`;
const Span1 = Styled.span`
      white-space: nowrap;
      text-align: center;
      color: #071B4A;
      font-size: 24px;
      font-weight: 500;
      display:table;
      margin:0 auto;
`;
const H3 = Styled.div`
width: 20vw;
display:table;
margin:0 auto;
margin-bottom:10px
`;
const Span3 = Styled.span`
white-space: nowrap;
text-align: center;
color: #071B4A;
display:table;
margin:0 auto;
`;
const Check = Styled.div`
  margin-left: 10px;
`;
const Footer = Styled.footer`
      bottom: 0;
      position: fixed;
      background-color: #071B4A;
      color: #ffffff;
      width: 100%;
      padding-top: 8px;
      padding-bottom: 8px;
      @media (max-width: 957px){
        display:none;
      }
`;
const Info = Styled.div`
height:40px;
width:96%;
margin:0 auto;
background-color:  #fff;
color: red;
white-space: nowrap;
`;
const Items = Styled.div`
  display:table;
  margin:0 auto;
`;
const Fspan = Styled.span`
margin-right: 40px;
`;
const LoadingDiv = Styled.div`
  display:table;
  margin:0 auto;
  justify-content:center
`;
const AdminLogin = (props) => {
  const { state, setState } = useContext(AppContext);
  const onChange = (Event) => {
    const { name, value } = Event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const onSubmit = async (Event) => {
    Event.preventDefault();
    setState({ ...state, loading: true });
    if (validatePassword(state.password)) {
      await axios
        .post(
          "https://cors-anywhere.herokuapp.com/" +
            "https://phantom-backend.herokuapp.com/api/login",
          {
            email: state.email,
            password: state.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            toast.success(response.data.message);
            localStorage.setItem("user", response.data.token);
            localStorage.setItem("role", response.data.role);
            setState({ ...state, loading: false });
            setTimeout(function () {
              setState({
                ...state,
                email: "",
                password: "",
                currentUser: localStorage.getItem("user"),
                currentRole: localStorage.getItem("role"),
              });
              props.history.push("/admin");
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response.status == 404) {
            setState({ ...state, loading: false });
            toast.error("incorrect username or password");
            setState({
              ...state,
              email: "",
              password: "",
            });
          }
        });
    } else {
      setState({
        ...state,
        validated: false,
        loading: false,
      });
      setTimeout(function () {
        setState({
          ...state,
          password: "",
          validated: true,
        });
      }, 3000);
    }
  };

  return (
    <div>
      <ToastContainer className="toast" autoClose={3000} />
      <Nav /> <br />
      <Body>
        <PhoneApp>
          <Image src={phoneApp} />
        </PhoneApp>
        <LoginForm
          style={{ backgroundColor: state.loading ? "gray" : "white" }}
        >
          <H2>
            <Span1>WELCOME BACK</Span1>
          </H2>
          <br />
          <H3>
            <Span3>Login to control routes and buses</Span3>
          </H3>
          <br />
          <LoadingDiv style={{ display: state.loading ? "flex" : "none" }}>
            <CircularProgress style={{ color: "#071B4A" }} />
          </LoadingDiv>
          <form
            onSubmit={onSubmit}
            style={{ display: "flexbox" }}
            className="form"
          >
            <Form.Item>
              <Input
                style={{ backgroundColor: state.loading ? "gray" : "white" }}
                value={state.email}
                width="96%"
                data-testid="email"
                onChange={onChange}
                name="email"
                id="email"
                type="email"
                placeholder="Enter your Email"
                required
              />
            </Form.Item>
            <Form.Item>
              <Input
                style={{ backgroundColor: state.loading ? "gray" : "white" }}
                value={state.password}
                width="96%"
                data-testid="password"
                onChange={onChange}
                name="password"
                id="password"
                type="password"
                placeholder="Enter Your Password"
                required
              />
              <Info style={{ display: state.validated ? "none" : "table" }}>
                password must be atleast 6 characters
              </Info>
            </Form.Item>
            <Form.Item>
              <Check>
                <Checkbox>Remember me</Checkbox>
              </Check>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                id="button"
                data-testid="submit-btn"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </form>
        </LoginForm>
        <Footer>
          <Items>
            <Fspan>
              <Image src={copyright} /> Orcas Phatom 2020
            </Fspan>
            <Fspan>
              <Image src={facebook} />
            </Fspan>
            <Fspan>
              <Image src={instagram} />
            </Fspan>
            <Fspan>
              <Image src={twitter} />
            </Fspan>
          </Items>
        </Footer>
      </Body>
    </div>
  );
};
AdminLogin.propTypes = {
  history: propTypes.object,
};
export default AdminLogin;
