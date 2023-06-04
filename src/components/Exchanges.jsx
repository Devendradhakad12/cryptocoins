import { Container, Heading, HStack, Img, VStack,Text } from '@chakra-ui/react';
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { server } from '../index';
import Errors from './Errors';
import Loader from './Loader';

function Exchanges() {
  const [loading,setLoading] = useState(true)
  const [err,setErr] = useState(false)
  const [exchanges,setExchanges] = useState([])
const fetchExchanges = async ()=>{
try {
  const {data}  = await axios.get(`${server}/exchanges`)
 setExchanges(data)
 setLoading(false)
} catch (error) {
  setErr(true)
  setLoading(false)
}
};
  useEffect(()=>{
fetchExchanges();
  })


  if(err) return  <Errors msg={'Error while featching api'} /> 
  return  <Container maxW={'container.xl'}>
{
  loading?<Loader/>: <>
<HStack wrap={'wrap'} justifyContent={'space-evenly'}>
  {
    exchanges?.map((i)=> (
     <ExchangeCard key={i.id} name={i.name} rank={i.trust_score_rank} image={i.image} url={i.url} />
    ))
  }
</HStack>
    </>
  
}
  </Container>
}
const ExchangeCard = ({name,image,rank,url})=> (
<a href={url} target={'blank'}>
<VStack w={'50vh'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} 
css={{"&:hover":{transform:"Scale(1.1)"}}}  >
  <Img src={image} w={'10'} h={'10'} objectFit={'contain'} alt={'img'} />
  <Heading size={'md'} noOfLines={1} >
{rank}
  </Heading>
  <Text noOfLines={1}>
    {name}
  </Text>
</VStack>
</a>
)
export default Exchanges
