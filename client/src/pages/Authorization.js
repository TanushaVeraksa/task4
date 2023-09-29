import React, {useContext, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import { REGISTRATION_ROUTE, LOGIN_ROUTE, CONTROL_ROUTE} from '../utils/consts';
import { registration, login } from '../http/userAPI';
import {Context} from '../index';
import {observer} from 'mobx-react-lite'

const Authorization = observer( () => {
    const {user} = useContext(Context);
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigate();
    const isRegistration = location.pathname === REGISTRATION_ROUTE;
    const click = async () => {
        try{
            let data;
            if(isRegistration) {
                data = await registration(email, name, password);
            } else {
                data = await login(email, password);
                navigation(CONTROL_ROUTE)
            }
            user.setIsAuth(true);
            console.log(data)
            user.setUser(data);
        } catch(e) {
            alert(e.response.data.message)
        }
    }
  return (
    <Container 
        className='d-flex justify-content-center align-items-center'
        style={{height: window.innerHeight - 54}}
    >
        <Card className='p-3' style={{width: '55%'}}>
            <h3 className="m-auto">{ isRegistration ? 'Registration' : 'Autorization'}</h3>
            <Form className='d-flex flex-column'>
                <Form.Control 
                    className='mt-2'
                    placeholder='Enter email'
                    value = {email}
                    onChange={e => setEmail(e.target.value)}
                />
                {isRegistration && <Form.Control 
                    className='mt-2'
                    placeholder='Enter name'
                    value = {name}
                    onChange={e => setName(e.target.value)}
                />}
                 <Form.Control 
                    className='mt-2'
                    placeholder='Enter password'
                    type='password'
                    value = {password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Row className='d-flex justify-content-around align-items-center mt-2 flex-row'>
                    {isRegistration 
                    ? 
                    <>
                     <Button 
                        variant={'outline-secondary'} 
                        className='mt-2'
                        style={{width: "40%", alignItems: "end"}}>
                    <NavLink to={LOGIN_ROUTE}
                        style={{width: "50%", alignItems: "end"}}>
                        Are you authorized?
                    </NavLink>
                    </Button>
                    
                    <Button 
                        variant={'outline-success'} 
                        className='mt-2'
                        style={{width: "40%", alignItems: "end"}}
                        onClick={click}>
                        Registration
                     </Button> 
                    </>
                    :
                    <>
                    <Button 
                       variant={'outline-secondary'} 
                       className='mt-2'
                       style={{width: "40%", alignItems: "end"}}>
                   <NavLink to={REGISTRATION_ROUTE}
                       style={{width: "50%", alignItems: "end"}}>
                       Move to Registration
                   </NavLink>
                   </Button>
                   
                   <Button 
                       variant={'outline-success'} 
                       className='mt-2'
                       style={{width: "40%", alignItems: "end"}}
                       onClick={click}>
                       Enter
                    </Button> 
                   </>
                    }
                </Row>
            </Form>
        </Card>
    </Container>
  )
})

export default Authorization