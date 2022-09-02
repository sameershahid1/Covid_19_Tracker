import React from 'react';
import {Card,CardContent,Typography} from '@mui/material';
import "../CSS/InfoBox.css";
import {prettyPrintStat} from '../Utility/utility';


const InfoBoxe = ({title,cases,total,Color,active,...props}) => {
  return (
    <Card className={`infoBox ${active&&`infoBox--selected ${Color}`}`} onClick={props.onClick}>
         <CardContent>

            {/*Title*/}
              <Typography className='infoBox__title' style={{fontSize:"1.4rem",fontWeight:"bold"}}>
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