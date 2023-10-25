import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Column } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import { Bar } from '@ant-design/plots';
import { Radar } from '@ant-design/plots';
import { each, groupBy } from '@antv/util';
import NavbarDesktop from '../../components/NavbarDesktop.jsx';
import Navbar from '../../components/Navbar.jsx';

const Dashboard = () => {
  const [cookies] = useCookies(['user']);
  const userID = cookies.user._id;
  const [apiData, setAPIData] = useState([]);
  const [apiDataPie, setAPIDataPie] = useState([]);
  const [apiDataSumDuration, setAPIDataSumDuration] = useState([]);
  const [apiDataMostAct, setAPIDataMostAct] = useState([]);
  const [apiDataMostDuration, setAPIDataMostDuration] = useState([]);
  const [reload,setReload] = useState(true);



  useEffect(() => {
    axios
      .get(`https://hulkfit-backend-wowi.onrender.com/activitylist/dashboard/column/${userID}`)
      .then((result) => {
        setAPIData(result.data);
        console.log(result.data);
       
      })
      .catch((err) => console.log(err));
      
  }, [reload]);

  useEffect(() => {
    axios
      .get(`https://hulkfit-backend-wowi.onrender.com/activitylist/dashboard/pie/${userID}`)
      .then((result) => {
        setAPIDataPie(result.data);
        console.log(result.data);
        
      })
      .catch((err) => console.log(err));
     
  }, [reload]);

  useEffect(() => {
    axios
      .get(`https://hulkfit-backend-wowi.onrender.com/sumofduration/${userID}`)
      .then((result) => {
        setAPIDataSumDuration(result.data);
        console.log(result.data);
        
      })
      .catch((err) => console.log(err));
     
  }, [reload]);

  useEffect(() => {
    axios
      .get(`https://hulkfit-backend-wowi.onrender.com/aggregate/mostact/${userID}`)
      .then((result) => {
        setAPIDataMostAct(result.data);
        console.log(result.data);
        
      })
      .catch((err) => console.log(err));
     
  }, [reload]);

  useEffect(() => {
    axios
      .get(`https://hulkfit-backend-wowi.onrender.com/aggregate/mostduration/${userID}`)
      .then((result) => {
        setAPIDataMostDuration(result.data);
        console.log(result.data);
        
      })
      .catch((err) => console.log(err));
     
  }, [reload]);

// input the first three elements of the array
const mostApiDataMostAct = apiDataMostAct.slice(0, 3);
const mostApiDataMostDuration = apiDataMostDuration.slice(0, 3);
console.log(mostApiDataMostAct);
console.log(mostApiDataMostDuration);


//note: display total duration at top of column
const annotations = [];
each(groupBy(apiData, 'actDate'), (actDuration, k) => {
  const value = actDuration.reduce((a, b) => a + b.actDuration, 0);
  annotations.push({
    type: 'text',
    position: [k, value],
    content: `${value}`,
    style: {
      textAlign: 'center',
      fontSize: 14,
      fill: 'rgba(0,0,0,0.85)',
    },
    offsetY: -10,
  });
});

const configColumn = {
  data:apiData,
  // isGroup: true,
  isStack: true,
  xField: 'actDate',
  yField: 'actDuration',
  seriesField: 'actType',
  legend: {
    position: 'top-right',
    offsetX: 8,
    title: {
      text: 'choose activities type to display',
      spacing: 8,
    },
    selected: {
      //run: false,
    },
  },
  label: {
    position: 'middle',
    // 'top', 'middle', 'bottom'
    layout: [
      {
        type: 'interval-adjust-position',
      },
      {
        type: 'interval-hide-overlap',
      },
      {
        type: 'adjust-color',
      },
    ],
  },
  annotations,
};

const configPie = {
  appendPadding: 1,
  data: apiDataPie ,
  angleField: 'totalDuration',
  colorField: '_id',
  radius: 0.9,
  legend: {
    position: 'right',
    offsetX: 8,
    title: {
      text: ' ',
      spacing: 8,
    },
    selected: {
      //run: false,
    },
    // show total duration of each actType
    // itemValue: {
    //   formatter: (text, item) => {
    //     const items = apiDataPie.filter((d) => d._id === item.value);
    //     return items.length ? items.reduce((a, b) => a + b.totalDuration, 0) / items.length : '-';
    //   },
    // },
    // style: {
    //   opacity: 0.65,
    // },
  },
  label: {
    type: 'inner',
    offset: '-30%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [
    {
      type: 'element-active',
    },
  ],
};

const configBar = {
  data: apiData,
  xField: 'actDuration',
  yField: 'actDate',
  seriesField: 'actType',
  isPercent: true,
  isStack: true,
  legend: {
    position: 'right-top',
    offsetX: 8,
    title: {
      text: ' ',
      spacing: 8,
    },
    selected: {
      //run: false,
    },
  },
  label: {
    position: 'middle',
    content: (item) => {
      return `${(item.actDuration * 100).toFixed(2)}%`;
    },
    style: {
      fill: '#fff',
    },
  },
};

const configRadar = {
  data: apiDataPie.map((d) => ({ ...d, star: Math.sqrt(d.totalDuration) })),
  xField: '_id',
  yField: 'totalDuration',
  appendPadding: [0, 10, 0, 10],
  meta: {
    star: {
      alias: 'totalDuration',
      min: 0,
      nice: true,
      formatter: (v) => Number(v).toFixed(2),
    },
  },
  xAxis: {
    tickLine: null,
  },
  yAxis: {
    label: false,
    grid: {
      alternateColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  point: {
    size: 5,
  },
  area: {},
};



  

  return (

    
    <div >
      <NavbarDesktop />
      
      <div className='container max-lg:shrink-0  flex flex-col gap-5 '>

        <div className='lg:flex lg:flex-row lg:justify-evenly m-1 flex flex-col  '>
          <div className='bg-indigo-50 shadow-xl p-10 lg:w-1/3 m-1 flex flex-col rounded-lg'>
            <p className='text-2xl text-bold'>Stats Summary</p>
            <p className='text-md'>Your stats activities explain what style you are</p><br/>
            <Radar {...configRadar} />
          </div>
          <div className='bg-indigo-50 shadow-xl p-10 lg:w-1/3 m-1 flex flex-col rounded-lg'>
            <p className='text-2xl text-bold'>Total Activities</p>
            <p className='text-md'>All of your activities are shown as percentages for each activity type</p><br/>
            <Pie {...configPie} />
          </div>

          
          <div className='bg-indigo-50 shadow-xl p-10 lg:w-1/3 m-1 flex flex-col rounded-lg overflow-auto'>
            <p className='text-2xl text-bold'>Activities Tracking</p>
            <div className='my-2'>
              <p className='text-bold '>Total activities done</p>
              {apiDataSumDuration.map((items) => (         
                <div className='card w-auto bg-base-100 shadow-xl '>
                  <div className='p-3 '>
                    <p className='text-bold text-md'></p>
                    <p>total activity : {items.totalAct} times</p>
                    <p>total duration : {items.totalDuration} min</p>
                  </div>
                </div>           
              ))}
            </div>
            <div className='flex flex-row lg:justify-center justify-evenly my-2'>
              <div div className='flex flex-col '> 
                <p className='text-bold text-center'>Top spending time</p>
                {mostApiDataMostDuration.map((items) => (         
                  <div className='card w-52 bg-base-100 shadow-xl mx-1 my-1'>
                    <div className='p-3'>
                      <p className='text-bold text-md'>{items._id.toUpperCase()}</p>
                      <p>total activity : {items.totalAct} times</p>
                      <p>total duration : {items.totalDuration} min</p>
                    </div>
                  </div>           
                ))}
              </div>
              <div className='flex flex-col '> 
                <p className='text-bold text-center'>Top frequent</p>
                {mostApiDataMostAct.map((items) => (         
                  <div className='card w-52 bg-base-100 shadow-xl mx-1 my-1'>
                    <div className='p-3'>
                      <p className='text-bold text-md'>{items._id.toUpperCase()}</p>
                      <p>total activity : {items.totalAct} times</p>
                      <p>total duration : {items.totalDuration} min</p>
                    </div>
                  </div>           
                ))}
              </div>
            </div>
          </div>

        </div>
        <div className='bg-indigo-50 shadow-xl p-10 m-1 flex flex-col rounded-lg'>
            <p className='text-2xl text-bold'>Activities Summary</p>
            <p className='text-md'>Your daily activity is shown as a minute duration summary for each day</p><br/>
            <Column {...configColumn} />
        </div>

        <div className='lg:flex lg:flex-row lg:justify-evenly flex flex-col '>
          <div className='bg-indigo-50 shadow-xl p-10 lg:w-1/2 m-1 flex flex-col rounded-lg'>
            <p className='text-2xl text-bold'>Percentage Activities</p>
            <p className='text-md'>Your daily activity is shown as a percentage for each activity type</p><br/>
            <Bar {...configBar} />
          </div>
          <div className='bg-indigo-50 shadow-xl p-10 lg:w-1/2 m-1 flex flex-col rounded-lg overflow-auto'>
            <p className='text-2xl text-bold'>Total Activities</p>
            <p className='text-md'>All of your activities are shown here</p><br/>
            <div className='lg:flex lg:flex-wrap lg:flex-row lg:justify-start flex flex-wrap flex-row justify-center '>
              {apiDataPie.map((items) => (         
                  <div className='card w-52 bg-base-100 shadow-xl mx-1 my-1'>
                    <div className='p-3'>
                      <p className='text-bold text-md'>{items._id.toUpperCase()} </p>
                      <p>total activity : {items.totalAct} times</p>
                      <p>total duration : {items.totalDuration} min</p>
                    </div>
                  </div>           
              ))}
            </div>
          </div>
        </div>
        
        <Navbar />


      </div>
    </div>
    
  ); 
};

export default Dashboard;


