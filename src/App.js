import React,{useState} from 'react'
import {MenuItem,FormControl,Select}  from '@mui/material';
import './App.css'


const App = () => {
const [Countries,setCountries]=useState(['USA','UK','PAKISTAN']);

  return (
<div className='app'>
    <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className='app__dropdown'>
            <Select variant='outlined' value='abc'>
               {Countries.map((data)=>(<MenuItem value="worldwide">{data}</MenuItem>))}
            </Select>
        </FormControl>          
    </div>
        
       {/*Header*/}
       {/*Titlte + Select input drop down*/}
      
       {/*Info Boxs*/}
       {/*Info Boxs*/}
       {/*Info Boxs*/}

       {/*Tables*/}
       {/*Graph*/}

       {/*Map*/}       
    </div>
)
}

export default App