import React from 'react';
import {Card,CardContent,Typography} from '@mui/material';
import "../CSS/InfoBox.css";
import {prettyPrintStat} from '../Utility/utility';


const InfoBoxe = ({title,cases,total,...props}) => {
  return (
    <Card className='infoBox' onClick={props.onClick}>
         <CardContent>

            {/*Title*/}
              <Typography className='infoBox__title' style={{fontSize:"1.7rem",fontWeight:"bolder"}}>
                  {title}
              </Typography>

            {/*Cases*/}
            <h2 className='infoBox__cases'>{prettyPrintStat(cases)}</h2>

            {/*Total*/}
            <Typography className='infoBox__total'>{total} Total</Typography>
         </CardContent>
    </Card>
  )
}

export default InfoBoxe