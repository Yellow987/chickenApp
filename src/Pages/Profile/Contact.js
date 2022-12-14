import { useOutletContext } from 'react-router';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Alert, FormGroup, TextField, Typography, FormControlLabel, Checkbox, FormHelperText } from '@mui/material'
import PhoneInput from 'react-phone-input-2'
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import 'react-phone-input-2/lib/style.css'
import { useForm } from "react-hook-form";
import NextBackPage from '../../Components/NextBackPage';

function Contact() {
    const [setPage, saveData, data] = useOutletContext();
    const [contactMethods, setContactMethods] = useState({
      phone: data.contactChannels.phone !== '', 
      whatsapp: data.contactChannels.whatsapp !== '', 
      wechat: data.contactChannels.wechat !== ''
    })
    const [phone, setPhone] = useState(data.contactChannels.phone)
    const [whatsapp, setWhatsapp] = useState(data.contactChannels.whatsapp)
    const [wechat, setWechat] = useState(data.contactChannels.wechat)
    const { 
      handleSubmit, 
      register, 
      getValues,
      formState: { errors },
      setError,
      clearErrors
    } = useForm({
      defaultValues: {
        fullName: data.name,
        jobTitle:  data.jobTitle,
        phone: "",
        whatsapp: "",
        wechat: ""
      }
    })
    const communicationChannels = [
      {
        label: "Phone",
        isSelected: contactMethods.phone,
        setIsSelected: () => setContactMethods({...contactMethods, phone:!contactMethods['phone']}),
        number: phone,
        setNumber: setPhone,
      },
      {
        label: "Whatsapp",
        isSelected: contactMethods.whatsapp,
        setIsSelected: () => setContactMethods({...contactMethods, whatsapp:!contactMethods['whatsapp']}),
        number: whatsapp,
        setNumber: setWhatsapp,
      },
      {
        label: "WeChat",
        isSelected: contactMethods.wechat,
        setIsSelected: () => setContactMethods({...contactMethods, wechat:!contactMethods['wechat']}),
        number: wechat,
        setNumber: setWechat,
      }
    ]
  

    const navigate = useNavigate()
    useEffect(() => {
        setPage('Contact')
    }, [data, setPage])

    function validateChangePage(newPage) {
      let oneSelected = false
      let existErrors = false
      for (const communicationChannel of communicationChannels) {
        if (communicationChannel.isSelected) {
          oneSelected = true
                                            if (!isPossiblePhoneNumber('+' + communicationChannel.number)) {
            existErrors = true
            setError(communicationChannel.label, { message: "Please enter a valid phone number"})
          } 
        }
      }
      
      if (oneSelected) {
        if (existErrors) {
          return
        }
        changePage(newPage)
      } else {
        setError("selectedOne", { message: "Please select at least one option"})
      }
    }
  
    function changePage(newPage) {
      saveData({
        name: getValues("fullName"), 
        jobTitle: getValues("jobTitle"), 
        contactChannels: {
          phone: contactMethods.phone ? phone : '', 
          whatsapp: contactMethods.whatsapp ? whatsapp : '', 
          wechat: contactMethods.wechat ? wechat : ''
        }
      })
      navigate(newPage)
    }

    return(
        <Box sx={{ display:'flex', flexDirection:'column' }} component='form' onSubmit={handleSubmit(() => validateChangePage("/profile/product-details"))}>
          <Typography variant="h1_32" >Contact person for purchase inquiries</Typography>
          <Alert sx={{ marginTop:5 }} iconMapping={{success: <WorkOutlineIcon sx={{ margin:'auto'}}/> }}>
            <Typography variant='p_default' color='#3FAB94' >All information provided is completely confidential. We do not share information with third parties, and buyers must be confirmed by us to access profiles</Typography>
          </Alert>
          <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Full Name of Contact</Typography>
          <TextField 
            placeholder='E.g. Chung Lui'
            {...register("fullName", { required:"This field is required" })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Job title of contact (optional)</Typography>
          <TextField placeholder='E.g. CEO'{...register("jobTitle")}/>
          <Typography variant="label" sx={{ marginTop:4, marginBottom:1 }}>Available contact channels</Typography>
          <FormGroup>
            {communicationChannels.map((communicationChannel, index) => (
              <Box key={index}>
                <FormControlLabel 
                  control={<Checkbox 
                    checked={communicationChannel.isSelected} 
                    onClick={() => {clearErrors(); communicationChannel.setIsSelected() }}/>} 
                  label={communicationChannel.label}
                />
                {communicationChannel.isSelected && 
                  <>
                    <PhoneInput 
                      country='us'
                      placeholder={`Enter ${communicationChannel.label} number`} 
                      value={communicationChannel.number} 
                      onChange={(v) => {clearErrors(); communicationChannel.setNumber(v)}} 
                      preferredCountries={['cn','in','id','jp','my','ph','th']} 
                      enableSearch
                    />
                    <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors?.[communicationChannel.label]?.message}</FormHelperText>
                  </>
                }
              </Box>
            ))}
         </FormGroup>
          <FormHelperText sx={{ color: "error.main", marginLeft:1 }}>{errors?.selectedOne?.message}</FormHelperText>
          <NextBackPage props={{ doNextBack:changePage, backPage: "/profile/locations", nextPage:"/profile/product-details" }}/>
        </Box>
    )
}

export default Contact