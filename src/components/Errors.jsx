 import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'
 
 function Errors({msg}) {
   return ( 
    <Alert severity="error" m={'15'}  borderRadius={'10'} w={'container.lg'} ><AlertIcon/> {msg}!</Alert>
     
   )
 }
 
 export default Errors
 /* 
 <Alert  status='Error'  >
    <AlertIcon/>
    {msg}
   </Alert> */