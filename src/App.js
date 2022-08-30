import React,{useState,useEffect} from 'react'
import {MenuItem,FormControl,Select, Card,CardContent}  from '@mui/material';
import './App.css'
import InfoBox from './Component/InfoBoxe'
import Map from './Component/Map'


const App = () => {
const [Countries,setCountries]=useState([]);
const [country,setCountry]=useState("worldwide");
const [countryInfo,setCountryInfo]=useState({});

useEffect(()=>{
  const getCountriesData=async()=>{
      try
      {
        const Response=await fetch('https://disease.sh/v3/covid-19/countries');
        const RAW=await Response.json();
        const CountryList=RAW.map((Da)=>({name:Da.country,value:Da.countryInfo}));
        setCountries(CountryList);
      }
      catch(error)
      {
         console.log(error);
      }
};

getCountriesData();

},[]);

const OnCountryChange=async(event)=>{
  const countryCode=event.target.value;
  const url=countryCode==='worldwide'?
  'https://disease.sh/v3/covid-19/all':
  `https://disease.sh/v3/covid-19/countries/${countryCode.iso2}`;

   try
   {
     await fetch(url)
     .then(response=>response.json())
     .then((data)=>{
      setCountry(countryCode);
      setCountryInfo(data);
      })
   }
   catch(error){console.log(error)}
}

  return (
<div className='app'>
  <div className="app__left">

    {/*Header*/}
    <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
            <Select onChange={OnCountryChange} variant='outlined' value={country}>
               <MenuItem value="worldwide">WorldWide</MenuItem>
               {Countries.map((data,i)=>(<MenuItem key={i} value={data.value}>{data.name}</MenuItem>))}
            </Select>
        </FormControl>          
    </div>

     {/*InfoBoxe*/}  
    <div className="app__stats">
        <InfoBox title="Infected Cases" cases={countryInfo.todayCases} total="1.2M"/>
        <InfoBox title="Recovered Cases" cases={countryInfo.recovered} total="1.2M"/>
        <InfoBox title="Death Cases" cases={countryInfo.deaths} total="1.2M"/>
    </div>

    {/*Map*/}
    <Map/>
  </div> 
  
  <Card className="app__right">
     <CardContent>
        <h3>Live Cases byCountry</h3>
       {/*Tables and Charts*/}
        <h3>WorldWide New Cases</h3>
     </CardContent>
  </Card>

</div>
)
}

export default App