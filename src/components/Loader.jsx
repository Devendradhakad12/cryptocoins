import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

function Loader() {
  return <VStack h={'90vh'} justifyContent={'center'}>
<Box transform={'scale(2)'}  >
<Spinner size={'md'}/>
</Box>
  </VStack>
}

export default Loader
