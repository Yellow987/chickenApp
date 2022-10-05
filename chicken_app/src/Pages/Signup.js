import { React, useState } from 'react'
import { Box, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,  getAuth, sendEmailVerification } from 'firebase/auth'
import {auth} from './../firestore';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


function Signup(props) {
  const { hereTo } = props.props
  const format = {
    marginTop:4, 
  }
  const hyperlink = {
    fontWeight:'Bold',
    display:"inline",
    color:'primary.main',
    textDecoration: "none",
  }

  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [isCheckBoxClicked, setIsCheckBoxClicked] = useState(false)
  const [errors, setErrors] = useState(
    { 
      emailErrorText:"", isEmailValid: true, 
      passwordErrorText:"", isPasswordValid: true,
     })

  function areValidationErrors() {
    let temp = {}
    let errors = false
    // temp.emailErrorText = (/$^|.+@+..+/).test(email) ? "" : "Email is not valid."
    if (email == '') {
      temp.emailErrorText = "Email is not valid." 
      temp.isEmailValid = false 
      errors = true
    } else {
      temp.emailErrorText = "" 
      temp.isEmailValid = true
    }

    if (password == '') {
      temp.passwordErrorText = "password is not valid." 
      temp.isPasswordValid = false 
      errors = true
    } else {
      temp.passwordErrorText = "" 
      temp.isPasswordValid = true
    }
    // if (isCheckBoxClicked) {} #TODO

    setErrors(temp)
    return errors ? true : false
  }

  const handleSubmit = (event) => {
    if (areValidationErrors()) {return}
    if (hereTo == "Login") {
      // login()
    } else {
      // register()
    }
  }

  const register = async () => {
    try{
      const user = await createUserWithEmailAndPassword(auth, email, password);
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('sent email')
        });
    }catch (error){
      console.log(error.message);
    }
  }
  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user)
    }catch (error){
      console.log(error.message);
    }
  }
  const logout = async () => {
    await signOut();
  }

  function getTitle(hereTo) {
    switch(hereTo) {
      case 'Login':
        return 'Log in to your account';
      case 'SellerSignup':
        return 'Sign up to discover cage-free sellers';
      case 'BuyerSignup':
        return 'Sign up to list your cage-free profile';
    }
  }

  return (
    <Box align='center' mx={{ sm:'auto', xs:'24px' }} sx={{ maxWidth:'430px', mt:{ sm:'116px', xs:'24px'} }}>
      <Typography variant='h1'>
        {getTitle(hereTo)}
      </Typography>
      <TextField error={!errors.isEmailValid} helperText={errors.emailErrorText} fullWidth label="Email" variant="outlined" sx={{ ...format }} onChange={(event)=>{
        setEmail(event.target.value)
      }} />
      <TextField error={!errors.isPasswordValid} helperText={errors.passwordErrorText} fullWidth label="Password" type="password" variant="outlined" sx={{ ...format }} onChange={(event)=>{
        setPassword(event.target.value)
      }} />
      <FormControlLabel sx={{ ...format, display: hereTo === 'Login' ? 'none' : 'show' }}
      label={
        <Typography variant='p_small'>
          Yes, I understand and agree to the <Box sx={{...hyperlink}}>Cage Free Hub Terms of Service</Box>
        </Typography>
      } control={
        <Checkbox onChange={(event) => {setIsCheckBoxClicked(isCheckBoxClicked => !isCheckBoxClicked)}}></Checkbox>
      }/>
      <Button fullWidth onClick={hereTo === 'Login' ? login :  register } variant='contained' sx={{ ...format, fontWeight:700 }}>
        {hereTo === 'Login' ? "Log in" : "Create Account"}
      </Button>
      <Typography align='center' variant='p_default' sx={{marginTop: 5, display: hereTo === 'Login' ? 'none' : 'show' }}>
        Already have an account? <Box sx={{...hyperlink}} component={Link} to="/Login" >Login</Box>
      </Typography>
      <Box  sx={{ display: hereTo === 'Login' ? 'show' : 'none' }}>
        <Typography variant='p_default' sx={{marginTop: 5, marginBottom: 1}}>
          Don’t have an account?
        </Typography>
        <Typography variant='p_default' component={Link} to="/SellerSignup" sx={{ ...hyperlink, marginTop:1 }}>
          Sign up as a cage-free seller 
        </Typography>
        <Typography variant='p_default' sx={{ ...hyperlink }}> · </Typography>
        <Typography variant='p_default' component={Link} to="/BuyerSignup" sx={{ ...hyperlink }}>
          Sign up as an egg buyer
        </Typography>
      </Box>
    </Box>
  )
}

export default Signup