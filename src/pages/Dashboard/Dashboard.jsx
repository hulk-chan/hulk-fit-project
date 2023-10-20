import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Line } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';



const Dashboard = () => {
  const [cookies] = useCookies(['user']);
  const userID = cookies.user._id;
  const [apiData, setAPIData] = useState([]);
  

  useEffect(() => {
    axios
      //note: watch all user: .get(`http://localhost:4000/activitylist/`)
      .get(`http://localhost:4000/activitylist/${userID}`)
      .then((result) => {
        setAPIData(result.data);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, );
  // const dataColumn = [
  //   {
  //     activityType: 'run',
  //     duration: 90,
  //     date: "09-10-2023",
  //   },
  //   {
  //     activityType: 'walk',
  //     duration: 60,
  //     date: "10-10-2023",
  //   },
  //   {
  //     activityType: 'run',
  //     duration: 10,
  //     date: "10-10-2023",
  //   },
  //   {
  //     activityType: 'hike',
  //     duration: 50,
  //     date: "10-10-2023",
  //   },
  //   {
  //     activityType: 'bike',
  //     duration: 60,
  //     date: "11-10-2023",
  //   },
  //   {
  //     activityType: 'run',
  //     duration: 30,
  //     date: "12-10-2023",
  //   },
  // ];

  const configColumn = {
    data: apiData,
    isGroup: true,
    xField: 'date',
    yField: 'duration',
    seriesField: 'activityType',

    /** 设置颜色 */
    //color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  return (
    <>
      <div>
        
      </div>
      <div className='flex flex-row flex-wrap'>
        {apiData.map((items) => (
          <>
            <div className='card w-96 bg-base-100 shadow-xl mx-10 my-10'>
              <div className='card-body'>
                <div className='flex flex-row justify-between'>
                  
                    <h2 className='card-title text-[2rem]'>{items.actType}</h2>
                    <button className='text-red-600 font-extrabold ring-2 ring-red-600 px-2 py-1 hover:bg-red-600 hover:text-white'>
                      X
                    </button>
                  
                </div>
                {/* <p>Activity Name : {items.actName}</p>
                <p>Activity Description : {items.actDescription}</p>
                <p>Activity Duration : {items.actDuration}</p>
                <p>Activity Date : {items.actDate}</p>
                <p>User Id : {items.userId}</p> */}
                <Column {...configColumn} />
                <div className='card-actions justify-end'>
                  <button className='btn btn-primary'>Edit</button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
