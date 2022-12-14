import React,{useState,useEffect} from 'react'
import {Line} from 'react-chartjs-2';
import '../CSS/LineGraph.css';
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,
        LineElement,Title,Tooltip,Legend} from 'chart.js';
import numeral from 'numeral';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend);


const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  Scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {display: false,},
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData=(data,casesType='cases')=>{
    const chartData=[];
    let lastDataPoint;

    for(let date in data[casesType])
    {
        if(lastDataPoint)
        {
            const newDataPoint={
                x:date,
                y:data[casesType][date]-lastDataPoint
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint=data[casesType][date];
    }
    return chartData;
}


//LineGraph Components
const LineGraph = ({className,casesType="cases"}) => {
const [data,setData]=useState({});
const DA = {
   datasets: [
    {
      label:casesType,
      data: data,
      borderWidth:2,
      backgroundColor: "rgba(204,16,52,0.5)",
      borderColor:"#CC1034",
    }
  ]
};

//Fetching the Records of the Infected, Death and Recovered Cases.
useEffect(()=>{
    const FetchGraphData=async()=>{
        try
        {
            const fethcRAW=await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120');
            const fethcDATA=await fethcRAW.json();
            const ChartData=buildChartData(fethcDATA,casesType);
            setData(ChartData);
        }
        catch(error){console.log(error);}
    }
    FetchGraphData();
},[])


return (
    <div className={className}>
      {data?.length>0&&<Line options={options} data={DA}/>}
    </div>
  )
}

export default LineGraph