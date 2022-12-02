import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, Container } from '@mui/material';
import JobTitleForm from './JobTitleForm';
import JobTitleList from './JobTitleList';
import Popup from "../../Reusable/Popup";
import { getJobTitles } from '../../../actions/jobTitle';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function JobTitle() {
  const [openPopup, setOpenPopup] = useState(false)
  const { data } = useSelector((state) => state.jobTitle)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getJobTitles())
    document.title = "Darbinieku Amati"
  },[])

  return (
    <>
      <IconButton sx={{mt:'1%', ml:'1%'}} onClick={()=> navigate('/')}><ArrowBackRoundedIcon /></IconButton>
      <Container>
        <Button
          sx={{mt:5, mb: 2, ml:3}}
          variant='contained'
          size='large'
          onClick={() => { setOpenPopup(true) }}
        >
          Pievienot
        </Button>
        
        <JobTitleList jobTitles={data} />
      </Container>
        
      <Popup
        title="Pievienot prombūtni"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <JobTitleForm setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  )
}
