import React, {useContext, useEffect, useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {observer} from 'mobx-react-lite'
import {Context} from './index'
import { check } from './http/userAPI';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);
  const TIMEOUT = 1000;

  useEffect(()=> {
    setTimeout(() => {
      check().then(data => {
        if(data) {
          user.setUser(data)
          user.setIsAuth(true)
        } else {
          localStorage.removeItem('token')
          user.setUser({})
          user.setIsAuth(false)
        }
      }).finally(() => setLoading(false))
    }, TIMEOUT)
  }, [])

  return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter />
    </BrowserRouter>
  );
})

export default App;
