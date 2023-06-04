import React from 'react'
import {  Heading,  Img, VStack,Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Coincard = ({name,image,id,price,symbol,currencySymbol})=> (
    <Link to={`/coin/${id}`} target={'blank'}>
    <VStack w={'50vh'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} 
    css={{"&:hover":{transform:"Scale(1.1)"}}} >
      <Img src={image} w={'10'} h={'10'} objectFit={'contain'} alt={'img'} />
      <Heading size={'md'} noOfLines={1} >
    {symbol}
      </Heading>
      <Text noOfLines={1}>
        {name}
      </Text>
      <Text noOfLines={1}>
        {price?`${currencySymbol}${price}`:'NA'}
      </Text>
    </VStack>
    </Link>
    )

export default Coincard
