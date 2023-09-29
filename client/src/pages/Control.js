import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ToolBar from '../components/ToolBar';
import {getUsers} from '../http/controlAPI'
import {Context} from '../index';
import {observer} from 'mobx-react-lite'
import ListGroup from 'react-bootstrap/ListGroup';
import {isBlock} from '../http/userAPI'
import {LOGIN_ROUTE} from '../utils/consts';
import {useNavigate} from 'react-router-dom'

const Control = observer(() => {
const navigation = useNavigate();

const {user} = useContext(Context)
const [checked, setChecked] = useState([]);
const [select, setSelect] = useState(false);
const [unselect, setUnselect] = useState(false);

const [usersData, setUsersData] = useState([]);

const checker = () => {
  console.log(user.user.id)
  isBlock(user.user.id).then(data => {
    console.log(data)
    if(data === true) {
      navigation(LOGIN_ROUTE)
    } else {
      console.log('user')
    }
  })
}

  const selectAll = () => {
    checker()
      setSelect(true);
      setUnselect(false);
     const usersEmails = user.users.map((elem) => {
        return elem.email;
      })
      setChecked(usersEmails)
  }

  const unselectAll = () => {
    checker()

      setUnselect(true);
      setSelect(false);
      setChecked([])
  }
  
  useEffect(() => {
    getUsers().then(data => user.setUsers(data))
    getUsers().then(data => setUsersData(data))
  },[])

  const getSelected = (e) => {
    checker()

    if(e.target.checked) {
      setChecked([...checked, e.target.value])
    } else {
      setChecked((prev) => {
        return prev.filter((email) => {
          return email !== e.target.value
        })
      })
    }
  }

  return (
    <Container>
      <div>
      <Row className='mt-2 m-auto' style={{width: '30%'}}>
        <ToolBar checked = {checked} />
      </Row>
      </div>
      <Row className = 'mt-2 m-auto'>
        <Col md={2}>
        <ListGroup>
        <ListGroup.Item 
        onClick={selectAll}
        active = {select}
        style={{cursor: 'pointer'}}
        key="1"
        >Select all</ListGroup.Item>
        <ListGroup.Item
         style={{cursor: 'pointer'}}
         onClick={unselectAll}
         active = {unselect}
         key="2"
        >Unselect all</ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={8}>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registration date</th>
            <th>Authorization date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((elem) => 
            <tr key = {elem.id}>
            <td>
            <Form.Check
            reverse
            label={elem.id}
            name="group1"
            type='checkbox'
            id={`reverse-checkbox-1`}
            onChange={getSelected}
            value={elem.email}
            checked={checked.includes(elem.email)}
          />
          </td>
            <td>{elem.name}</td>
            <td>{elem.email}</td>
            <td>{elem.registration}</td>
            <td>{elem.authorization}</td>
            <td>{elem.block}</td>
          </tr>
          )}
        </tbody>
        </Table>
        </Col>
      </Row>
    </Container>
  )
})

export default Control