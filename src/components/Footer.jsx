import { Avatar, Box, Stack, VStack,Text } from '@chakra-ui/react'
import React from 'react'
import src from '../assets/IMG_20221207_111628-01.jpeg'
function Footer() {
  return (
     <Box bgColor={'blackAlpha.900'} color={'white'} minH={'50'} p={['16','8']} >
<Stack alignItems={'center'} direction={['column','row']} >
<VStack w={'full'} alignItems={['center','flex-start']} >
<Text fontWeight={'bold'}>
About Us
</Text>
<Text letterSpacing={'widest'} textAlign={['center','left']} >Best crypto tredding app in india</Text>
</VStack>
<VStack>
    <Avatar boxSize={'28'} mt={['4','0']} src={src} />
    <Text> Our Founder</Text>
</VStack>
</Stack>
     </Box>
  )
}

export default Footer
