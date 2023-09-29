import React, { useContext} from 'react'
import {Context} from '../index';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {observer} from 'mobx-react-lite'
import Container from 'react-bootstrap/Container';
import {NavLink} from 'react-router-dom'
import {CONTROL_ROUTE, LOGIN_ROUTE} from '../utils/consts';
import {useNavigate} from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigation = useNavigate();
    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token')
        navigation(LOGIN_ROUTE)
    }
    return (
        <div>
        <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
        <Navbar.Text></Navbar.Text>
            {user.isAuth ? 
            <Nav className='ml-auto' style={{color: 'white'}}>
                <NavLink to={CONTROL_ROUTE}>
                <Button variant={'outline-light'}>
                    Control panel
                </Button>
                </NavLink>
                <Button 
                variant={'outline-light'} 
                style={{marginLeft: 5}}
                onClick={()=> logOut()}>Exit</Button>
            </Nav>
        :
            <Nav className='ml-auto' style={{color: 'white'}}>
                <Button variant={'outline-light'} onClick={()=> user.setIsAuth(false)}>Authorization</Button>
            </Nav>}
        </Container>
        </Navbar>
    </div>
    )
})

export default NavBar