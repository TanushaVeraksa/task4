import React, { useContext } from 'react'
import {Route, Routes} from 'react-router-dom'
import {authRouter, publickRouter} from '../routes';
import {Context} from '../index'
import {observer} from 'mobx-react-lite'

const AppRouter = observer(() => {
  const {user} = useContext(Context)

  return (
    <Routes>
    {user.isAuth && authRouter.map(({path, Component}) => 
            <Route path={path} element={Component}/>
        )}
        {publickRouter.map(({path, Component}) => 
            <Route path={path} element={Component}/>
        )
        }
    </Routes>
  )
})

export default AppRouter