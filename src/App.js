//Importing Material UI Component
import React,{useState,useEffect} from 'react';
import {MenuItem,FormControl,Select, Card,CardContent}  from '@mui/material';

//Importing CSS file for Styling
import './CSS/App.css';
import 'leaflet/dist/leaflet.css';

//Importing Component
import InfoBox from './Component/InfoBox';
import Map from './Component/Map';
import Table from './Component/Table';
import LineGraph from './Component/LineGraph';


//Importing Utility Function
import { sortData } from './Utility/utility';


const App = () => {
//UseStates
const [Countries,setCountries]=useState([]);
const [country,setCountry]=useState("worldwide");
const [countryInfo,setCountryInfo]=useState({});
const [TableData,setTableData]=useState([]);
const [mapcenter,setMapCenter]=useState([34.80746,-40.4796]);
const [mapZoom,setMapZoom]=useState(3);
const [mapCountries,setMapCountries]=useState([]);
const [CasesType,setCasesType]=useState("cases");

//This function is getting all countries data
useEffect(()=>{
const GetAll=async()=>{
    await fetch(  'https://disease.sh/v3/covid-19/all')
  .then(response=>response.json())
  .then(data=>{
    setCountryInfo(data);

  });
}
GetAll();
},[]);

//This Function is getting the Country List
useEffect(()=>{
  const getCountriesData=async()=>{
      try
      {
        const Response=await fetch('https://disease.sh/v3/covid-19/countries');
        const RAW=await Response.json();
        const CountryList=RAW.map((Da)=>({name:Da.country,value:Da.countryInfo}));
        setTableData(sortData(RAW));
        setCountries(CountryList);
        setMapCountries(RAW);
      }
      catch(error)
      {
         console.log(error);
      }
};

getCountriesData();

},[]);


//This function is Fetching the selected country data or worldwide data
const OnCountryChange=async(event)=>{
  const countryCode=event.target.value;
  const url=countryCode==='worldwide'?
  'https://disease.sh/v3/covid-19/all':
  `https://disease.sh/v3/covid-19/countries/${countryCode.iso2}`;

   try
   {
     await fetch(url)
     .then(response=>response.json())
     .then((DA)=>{
      setCountry(countryCode);
      setCountryInfo(DA);
      setMapZoom(4);
      setMapCenter([DA.countryInfo.lat,DA.countryInfo.long]);
      });
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
    {/*End of Header*/}

     {/*InfoBoxe*/}  
    <div className="app__stats">
        {/*Infected Cases*/}
        <InfoBox
          active={CasesType==="cases"}
          Color={"infoBox--Orange"}
          onClick={e=>setCasesType("cases")}
          title="Infected"
          cases={countryInfo.todayCases} 
          total={countryInfo.cases}
        />

        {/*Recovered Cases*/}
        <InfoBox
         active={CasesType==="recovered"}
         Color={"infoBox--Green"}
         onClick={e=>setCasesType("recovered")}
         title="Recovered" 
         cases={countryInfo.todayRecovered} 
         total={countryInfo.recovered}
        />

        {/*Death Cases*/}
        <InfoBox
         active={CasesType==="deaths"}
         onClick={e=>setCasesType("deaths")}
         title="Deaths" 
         cases={countryInfo.todayDeaths} 
         total={countryInfo.deaths}
        />
    </div>
     {/*End of InfoBoxe*/}  

   {/*Map*/}
    <Map casesType={CasesType} countries={mapCountries} center={mapcenter} zoom={mapZoom}/>
   {/*End of Map*/}
  </div>

  {/*Tables and Charts*/} 
  <Card className="app__right">
     <CardContent>
        <h3>Live Cases byCountry</h3>
        <Table countries={TableData}/>
        <h3 className='app__graph-Title'>WorldWide New {CasesType}</h3>
        <LineGraph className="app__graph" casesType={CasesType}/>
     </CardContent>
  </Card>
  {/*End of Tables and Charts*/} 
</div>
)
}

export default App