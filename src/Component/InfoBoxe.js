import React from 'react'
import {Card,CardContent,Typography} from '@mui/material'


const InfoBoxe = ({title,cases,total}) => {
  return (
    <Card className='infoBox'>
         <CardContent>
            {/*Title*/}
              <Typography className='infoBox__title'  color="textSecondary">
                  {title}
              </Typography>
            {/*Cases*/}
            <h2 className='infoBox__cases'>{cases}</h2>
            {/*Total*/}
            <Typography color="textSecondary" className='infoBox__total'>{total}</Typography>
         </CardContent>
    </Card>
  )
}

export default InfoBoxe