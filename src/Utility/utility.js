import React from "react";
import numeral from "numeral";
import {Circle,Popup} from 'react-leaflet';

const casesTypesColors={
    cases:{
        hex:"#CC1034",
        multiplier:120
    },
    recovered:{
        hex:"#7dd71d",
        multiplier:200
    },
    deaths:{
        hex:"#fb4443",
        multiplier:100
    }    
};


//This is used to sort the Country list
export const sortData=(data)=>{
    const sortedData=[...data];
   return sortedData.sort((a,b)=>(b.cases-a.cases));
}

//DRAW circles on the map with interactive tooltip
export const showDataOnMap=(data,caseType="cases")=>(
    data.map(country=>(
        <Circle
          center={[country.countryInfo.lat,country.countryInfo.long]}
          fillOpacity={0.4}
          color={casesTypesColors[caseType].hex}
          fillColor={casesTypesColors[caseType].hex}
          radius={Math.sqrt(country[caseType])*casesTypesColors[caseType].multiplier}
        >
        <Popup>I will kill you</Popup>
        </Circle>
    ))
);