import React from "react";
import numeral from "numeral";
import {Circle,Popup} from 'react-leaflet';
import './utility.css'

const casesTypesColors={
    cases:{
        half_op: "rgba(251, 68, 67,0.7)",
        multiplier:125
    },
    recovered:{
        half_op: "rgba(125, 215, 29, 0.7)",
        multiplier:125
    },
    deaths:{
        half_op: "rgba(204, 16, 52,0.7)",
        multiplier:800
    }    
};


//This is used to sort the Country list
export const sortData=(data)=>{
    const sortedData=[...data];
   return sortedData.sort((a,b)=>(b.cases-a.cases));
}

export const prettyPrintStat=(stat)=>(
    stat?`+${numeral(stat).format("0.0a")}`:"No Cases"
);


//DRAW circles on the map with interactive tooltip
export const showDataOnMap=(data,caseType)=>{
return data.map(Country=>(
        <Circle key={Country.country}
          center={[Country.countryInfo.lat,Country.countryInfo.long]}
          fillOpacity={0.4}
          pathOptions={{color:casesTypesColors[caseType].half_op,fillColor:casesTypesColors[caseType].half_op}}
          radius={Math.sqrt(Country[caseType])*casesTypesColors[caseType].multiplier}
        >

        <Popup>
           <div className="info-container">
            <div className="info-flag" style={{backgroundImage:`url(${Country.countryInfo.flag})`}}></div>
            <div>{Country.country}</div>
            <div>Cases:{numeral(Country.cases).format("0,0")}</div>
            <div>Recovered:{numeral(Country.recovered).format("0,0")}</div>
            <div>Deaths:{numeral(Country.deaths).format("0,0")}</div>
           </div>
        </Popup>
        </Circle>
    ))
};



