
import {  HStack, Radio, RadioGroup,Container,Box, VStack, Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import axios from 'axios';
import Errors from './Errors';
import { server } from '../index';
import {useParams} from 'react-router-dom'
import Chart from './Chart';

function CoinDetails() {
  const [loading,setLoading] = useState(true)
  const [err,setErr] = useState(false)
  const [coin,setCoin] = useState([])
  const [currency,setCurrency] = useState('inr')
  const [days,setDays] = useState('24h')
  const [chartArray,setChartArray] = useState([])
  const currencySymbol = currency==='inr'?"₹":currency==='eur'?"€":"$";
const parms = useParams()
const btns =  ['24h','7d','14d','30d','60d','200d','1Y','max']

   //!fetch coinData
const fetchData = async ()=>{
  try {
    const {data}  = await axios.get(`${server}/coins/${parms.id}`)
    const {data:ChartData} = await axios.get(`${server}/coins/${parms.id}/market_chart?vs_currency=${currency}&days=${days}`)
   setCoin(data)
   setChartArray(ChartData.prices)
   setLoading(false)
  } catch (error) {
    setErr(true)
    setLoading(false)
  }
  };
    useEffect(()=>{
  fetchData();
    },[parms.id,currency,days])


//!days function switch chart
const SwitchChart = (key)=>{
switch (key) {
  case '24h':
    setDays('24h')
    setLoading(true)
    break;
    case '7d':
      setDays('7d')
      setLoading(true)
      break;
      case '14d':
        setDays('14d')
        setLoading(true)
        break;
        case '30d':
          setDays('30d')
          setLoading(true)
          break;
          case '60d':
            setDays('60d')
            setLoading(true)
            break;
            case '200d':
              setDays('200d')
              setLoading(true)
              break;
              case '1Y':
              setDays('365d')
              setLoading(true)
              break;
              case 'max':
              setDays('max')
              setLoading(true)
              break;

  default:
    setDays('24h')
    setLoading(true)
    break;
}
}

    //!return
  
    if(err) return  <Errors msg={'Error while featching coin'} /> 

  return  <Container maxW={'container.xl'}  w={'full'} >
{
  loading?<Loader/>:(
  <>
    <Box width={'full'} borderWidth={1} >
    <Chart currency={currencySymbol} arr={chartArray} days={days} />
</Box>


<HStack p={'4'} wrap={'wrap'} >
{
  btns?.map((i)=>(
    <Button key={i} onClick={()=>SwitchChart(i)} m={'3'} >{i}</Button>
  ))
}
</HStack>

<RadioGroup value={currency} onChange={setCurrency} >
    <HStack spacing={'5'} p={'7'}>
      <Radio value={'inr'}>₹ INR</Radio>
      <Radio value={'eur'}>€ EUR</Radio>
      <Radio value={'usd'}>$ USD</Radio>
    </HStack>
  </RadioGroup>

  <VStack spacing={'4'} p='16' alignItems={'flex-start'} >
<Text fontSize={'small'} alignSelf={'center'} >
Last Updated On {Date(coin.market_data.last_updated).split('G')[0]}
</Text>

 <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />
 <Stat>
  <StatLabel>{coin.name}</StatLabel>
  <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
  <StatHelpText>
    <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}/>
    {coin.market_data.price_change_percentage_24h}%
  </StatHelpText>
 </Stat>
 <Badge fontSize={'2xl'} bgColor={"blackAlpha.800"} color={'white'} >
  {`#${coin.market_cap_rank}`}
 </Badge>
 <CustomBar high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`} low={` ${currencySymbol} ${coin.market_data.low_24h[currency]}`} />
 <Box w={'full'}  p={'4'}  >
<Item  title={'Max Supply'} value={coin.market_data.max_supply} />
<Item  title={'Circulating Supply'} value={coin.market_data.circulating_supply} />
<Item  title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
<Item  title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
<Item  title={'All Time High'} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
 </Box>
  </VStack>
  </>
  )
}
  </Container>
}



const CustomBar = ({low,high})=>(
  <VStack width={'full'}>
<Progress value={50} colorScheme={'teal'} width={'full'} />
<HStack justifyContent={'space-between'} w={'full'} >
<Badge  children={low} colorScheme={'red'} />
<Text fontSize={'sm'} >24H Range</Text>
<Badge  children={high} colorScheme={'green'} />

 
</HStack>
  </VStack>
)

const Item = ({title,value})=>(
  <HStack justifyContent={'space-between'} w={'full'} my={'4'} >
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'} >{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

export default CoinDetails
