import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { server } from '../index';
import Coincard from './Coincard';
import Errors from './Errors';
import Loader from './Loader';

function Coins() {
  const [loading,setLoading] = useState(true)
  const [err,setErr] = useState(false)
  const [coins,setCoins] = useState([])
  const [page,setPage] = useState('1')
  const [currency,setCurrency] = useState('inr')
  const currencySymbol = currency==='inr'?"₹":currency==='eur'?"€":"$";

  //!change page
  const changePage = (page)=>{
    setPage(page);
    setLoading(true)
  }
  const btns = new Array(123).fill(1);

  //!fetch coins
const fetchCoin = async ()=>{
try {
  const {data}  = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
 setCoins(data)
 setLoading(false)
} catch (error) {
  setErr(true)
  setLoading(false)
}
};
  useEffect(()=>{
fetchCoin();
  },[currency,page])



  //!return value
  if(err) return  <Errors msg={'Error while featching coins'} /> 
  return  <Container maxW={'container.xl'}>
{
  loading?<Loader/>: <>
  <RadioGroup value={currency} onChange={setCurrency} >
    <HStack spacing={'5'} p={'7'}>
      <Radio value={'inr'}>₹ INR</Radio>
      <Radio value={'eur'}>€ EUR</Radio>
      <Radio value={'usd'}>$ USD</Radio>
    </HStack>
  </RadioGroup>
<HStack wrap={'wrap'}justifyContent={'space-evenly'} >
  {
    coins?.map((i)=> (
      
     <Coincard key={i.id} name={i.name} rank={i.trust_score_rank} image={i.image} url={i.url} price={i.current_price} symbol={i.symbol} id={i.id} currencySymbol={currencySymbol} />
    ))
  }
</HStack>

 
<HStack w={'full'} overflowX={'auto'} p={'8'} >
 {
  btns?.map((items,index)=>(
    <Button bgColor={'blackAlpha.700'}  color={'white'} onClick={()=>changePage(index+1)} key={index} >
    {index+1}
  </Button>
  ))
 }
</HStack>
    </>
  
}
  </Container>
}
export default Coins
