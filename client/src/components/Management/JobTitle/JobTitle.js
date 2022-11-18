import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import JobTitleForm from './JobTitleForm';
import JobTitleList from './JobTitleList';
import Popup from "../../Reusable/Popup";
import { getJobTitles } from '../../../actions/jobTitle';


export default function JobTitle() {
  const [openPopup, setOpenPopup] = useState(false)
  const { data } = useSelector((state) => state.jobTitle)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getJobTitles())
    document.title = "Admin | Amati"
  },[])

  return (
    <>
      <div>
        Darbinieku amati
        <Button
          onClick = {() => { setOpenPopup(true) }}>
          Pievienot
        </Button>
      </div>

      <JobTitleList jobTitles={data} />
        
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
