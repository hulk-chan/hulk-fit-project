import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Line } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import { each, groupBy } from '@antv/util';
import NavbarDesktop from '../../components/NavbarDesktop.jsx';
const Dashboard = () => {
  const [cookies] = useCookies(['user']);
  const userID = cookies.user._id;
  const [reload,setReload] = useState(true);
  const [apiData, setAPIData] = useState([]);
  const [apiDataPie, setAPIDataPie] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    axios
    .get(`http://localhost:4000/activitylist/dashboard/column/${userID}`)
    // .get(`http://hulkfit-backend-wowi.onrender.com/activitylist/dashboard/column/${userID}`)
      .then((result) => {
        setAPIData(result.data);
        console.log(result.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
      setLoading(false);
  }, [reload]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/activitylist/dashboard/pie/${userID}`)
      // .get(`http://hulkfit-backend-wowi.onrender.com/activitylist/dashboard/pie/${userID}`)
      .then((result) => {
        setAPIDataPie(result.data);
        console.log(result.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
      setLoading(false);
  }, [reload]);
  useEffect(() => {
    axios
     .get(`http://localhost:4000/activitylist/${userID}`)
      // .get(`http://hulkfit-backend-wowi.onrender.com/activitylist/${userID}`)
      .then((result) => {
        setAPIData(result.data);
        console.log(userID)
        console.log(result.data);
        cal();
      })
      .catch((err) => console.log(err));
  }, [reload]);
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
    //isGroup: true,
    isStack: true,
    xField: 'actDate',
    yField: 'actDuration',
    seriesField: 'actType',
    legend: {
      position: 'top-left',
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
      position: 'top',
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
  return (
    <>
      <div className=''>
        <NavbarDesktop />
        <div className='content flex flex-row justify-between gap-20'>
          <div className='section-graph flex flex-col '>
            <div className='bg-white  p-10 '>
              <Column {...configColumn} />
            </div>
            <div className='bg-white  p-10 '>
              <Pie {...configPie} />
            </div>
          </div>
        </div>
      </div>
    </>
  ); //end return
};
export default Dashboard;