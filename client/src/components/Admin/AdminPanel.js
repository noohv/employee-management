import React, { useState, useEffect} from "react";
import { Button, Container, Typography, Divider } from '@mui/material';
import UserList from "./UserList";
import UserForm from "./UserForm";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Reusable/Popup";
import { getUsers } from  '../../actions/auth';

export default function AdminPanel ({ setNotify }) {
  const [openPopup, setOpenPopup] = useState(false)
  const { users, error, success, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
    
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'AUTH_CLEAR_MESSAGE'})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'AUTH_CLEAR_MESSAGE'})
    }

    document.title = "Sistēmas lietotāji"
  }, [error, success])

  return (
    <>
      <Container>
        <Typography sx={{mt:3, mb:3}} variant='h4'>Sistēmas lietotāju saraksts</Typography>
        <Divider/>
      </Container>

      <Container>
        <Button
          sx={{mt:5, mb: 2, ml:3}}
          variant='contained'
          size='large'
          color="secondary"
          onClick={() => { 
            setOpenPopup(true) 
          }}
        >
          Pievienot
        </Button>

        <UserList 
          users={users}
          setNotify={setNotify}
          error={error}
          success={success}
        />
      </Container>

      <Popup
        title="Pievienot lietotāju"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm setNotify={setNotify} setOpenPopup={setOpenPopup}/>
      </Popup>
    </>
  )
}
