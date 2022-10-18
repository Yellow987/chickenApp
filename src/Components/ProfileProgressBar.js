import React from 'react'
import { Outlet } from 'react-router'
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

function ProfileProgressBar() {
  const [page, setPage] = useState('')
  const [goToPage, setGoToPage] = useState('')
  const formValues = {
    companyName: useState(''),
    website: useState('')
  }
  const pages = ["Basics", "Location(s)", "Contact", "Product details", "Production details", "Imagery"]

  //TODO send to firebase on button click. 

  return (
    <Box align='center' mx={{ sm:'10%', xs:'24px' }} sx={{ marginTop:6 }}>
      <Box sx={{ display:'flex', flexDirection:'row', justifyContent: 'center' }} >
        {pages.map((pageName) => (
          <Box key={pageName} sx={{ width:'16.66%', marginRight:'2px' }}>
            <LinearProgress variant='determinate' value={0} sx={{height:'8px', borderRadius:'10px', backgroundColor:page === pageName ? 'primary' : '#DFE3E9' }}/>
            <Typography display={{ sm:'block', xs:'none'}} align='left' variant='p_default' sx={{ marginTop:1 }}>{pageName}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop:6, maxWidth:'400px' }}>
        <Outlet context={[setPage, goToPage, setGoToPage, formValues]} /> 
        <Box align='right' sx={{ marginTop:6 }}>
          <Button><Typography variant='p_default' onClick={() => {setGoToPage('back')}}>← Back</Typography></Button>
          <Button variant='contained' onClick={() => {setGoToPage('next'); console.log(formValues.companyName[0])}}>Next →</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileProgressBar