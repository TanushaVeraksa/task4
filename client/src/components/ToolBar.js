import React, {useState} from 'react'
import { blockUser, unblockUser, deleteUser} from '../http/controlAPI';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom'
import {LOGIN_ROUTE} from '../utils/consts';
import {observer} from 'mobx-react-lite'


const ToolBar = observer((props) => {
    const {checked} = props;
    const navigation = useNavigate();
    const TIMEOUT = 500;    

    const block = () => {
        let emailAuth;
        try {
            emailAuth = jwt_decode(localStorage.getItem('token')).email;
        } catch(e) {
            console.log(e)
        }
        checked.forEach(async (elem) => {
            if(elem === emailAuth) {
                await unblockUser(emailAuth)
                navigation(LOGIN_ROUTE)
            } else {
                await blockUser(elem)
            }
        })
        
        if(!checked.includes(emailAuth)) {
            setTimeout(() => {
                window.location.reload();
            }, TIMEOUT)
        };
    }
    const unBlock = () => {
        checked.forEach(async (elem) => {
            await unblockUser(elem)
        })
        setTimeout(() => {
            window.location.reload();
        }, TIMEOUT)
    }
    const deleteUserChecked = () => {
        checked.forEach(async (elem) => {
            await deleteUser(elem)
        })
        setTimeout(() => {
            window.location.reload();
        }, TIMEOUT)
    }
    return (
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary" onClick={block}>Block</button>
            <button type="button" class="btn btn-secondary" onClick={unBlock}>Unblock</button>
            <button type="button" class="btn btn-secondary" onClick={deleteUserChecked}>Delete</button>
        </div>
    )
})

export default ToolBar