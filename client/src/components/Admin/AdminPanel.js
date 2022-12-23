import React, { useState, useEffect} from "react";
import { Button, Container, Typography, Divider } from '@mui/material';
import UserList from "./UserList";
import UserForm from "./UserForm";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Reusable/Popup";
import { getUsers } from  '../../actions/auth';
import Loader from "../Reusable/Loader";
import ConfirmDialog from '../Reusable/ConfirmDialog';

export default function AdminPanel ({ setNotify }) {
  const [openPopup, setOpenPopup] = useState(false) // Popup open state
  const { users, error, success, isLoading } = useSelector((state) => state.auth)
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = "Sistēmas lietotāji"
    dispatch(getUsers()) // Fetch users
    
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' }) // Show User error message
      dispatch({type: 'AUTH_CLEAR_MESSAGE'}) // Clear Auth message from redux state
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' }) // Show User success message
      dispatch({type: 'AUTH_CLEAR_MESSAGE'}) // Clear Auth message from redux state
    }

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
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      </Container>

      <Popup
        title="Pievienot lietotāju"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm setNotify={setNotify} setOpenPopup={setOpenPopup}/>
      </Popup>

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      {isLoading && <Loader />}
    </>
  )
}
