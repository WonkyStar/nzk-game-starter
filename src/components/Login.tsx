import { h } from 'preact'
import { useRef } from 'preact/hooks'
import { useAuthentication } from '../context/AuthenticationProvider'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-image: url("https://www.nightzookeeper.com/edu/assets/qweqw/images/welcome-bg.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Band = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #EB4B30;
  color: #fff;
  text-align: center;
  padding: 20px 10px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.8);
  padding: 25px;
  border-radius: 11px;
`

const Field = styled.div`
  input {
    border-radius: 8px;
    outline: none;
    border: none;
    padding: 8px 12px;
  }
  margin-bottom: 12px;
`

const Button = styled.div`
  cursor: pointer;
  user-select: none;
  color: #fff;
  background-color: #57A5E6;
  box-shadow: 0 6px 0 rgba(0,0,0,0.9);
  font-family: 'Rammetto One';
  padding: 8px 22px 5px 22px;
  border-radius: 50px;
  :active {
    transform: translateY(6px);
    box-shadow: 0 0 0;
  }
`

const Login = () => {
  const usernameRef: any = useRef()
  const passwordRef: any = useRef()
  const { getToken } = useAuthentication()

  const onSubmit = async () => {
    await getToken(usernameRef.current.value, passwordRef.current.value)
  }

  return <Wrapper>
    <Band>This page is for dev only and will never be seen in production.</Band>
    <Content>
      <Field>
        <input type='text' ref={usernameRef} placeholder='Username' />
      </Field>
      <Field>
        <input type='password' ref={passwordRef} placeholder='Password' />
      </Field>
      <Button onClick={onSubmit}>LOGIN</Button>
    </Content>
  </Wrapper>
}

export default Login