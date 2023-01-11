import { React } from "react";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { sendEmailVerification } from "firebase/auth";
import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useAuth } from '../AuthContext'

function ConfirmEmail() {
  const { currentUser } = useAuth();

  function sendEmail(e) {
    e.preventDefault()
    console.log(currentUser.emailVerified)
    if (!currentUser.emailVerified){
      sendEmailVerification(currentUser)
    }
  }

  return (
    <Box mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'620px', mt:{ sm:'128px', xs:'24px'} }} align='center'>
      <Alert icon={<EmailOutlinedIcon sx={{ margin: "auto" }}/>} severity="success" align='left'>
        <AlertTitle color="primary.main" style={{ fontWeight:'bold' }}>Confirm your email</AlertTitle>
        <Typography color="primary.main">
          An email with a confirmation link has been sent to the provided
          email address. Please confirm this link for the opportunity to view
          our directory of cage-free egg sellers.
        </Typography>
      </Alert>
      <Button 
        variant="outlined" 
        style={{ marginTop:'16px', align:'center'}}
        onClick={(e) => sendEmail(e)}
        >
        Resend Confirmation Email
      </Button>
      <Alert sx={{ marginTop:'16px' }}>
        <Typography color='primary.main'>Email verification sent!</Typography>
      </Alert>
    </Box>
  );
}
export default ConfirmEmail;