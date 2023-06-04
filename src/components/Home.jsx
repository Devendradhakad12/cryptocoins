import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcSrc from '../assets/img.png'
import {motion} from 'framer-motion'
function Home() {
  return (
   <Box bgColor={'blackAlpha.900'} w={'full'} h={['60vh','80vh']} >
<motion.div style={{
  height:'60vh',
}}
animate={{
  translateY:"20px"
}}
transition={{
  duration:2,
  repeat:Infinity,
  repeatType:'reverse'
}}
>
<Image src={btcSrc} w={'full'} h={'full'} objectFit={'contain'} />
</motion.div>
<Text mt={['-100px','-10']} fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'whiteAlpha.900'}  >
  ACryptoCoins
</Text>
   </Box>
  )
}

export default Home
