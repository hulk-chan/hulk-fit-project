import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Line } from '@ant-design/charts';
import { Column } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';
import { each, groupBy } from '@antv/util';



const Dashboard = () => {
  const [cookies] = useCookies(['user']);
  const userID = cookies.user._id;
  const [apiData, setAPIData] = useState([]);
  const [actName, setActName] = useState();
  const [reload,setReload] = useState(true);
  const [loading,setLoading] = useState(true);

  const dataTest = [
    {
      _id: '1',
      actDescription: 'Activity description',
      actType: 'run',
      actDuration: 120,
      LogDate: '2 hours',
      actName: 'My Activity',
    },
    {
      _id: '2',
      actDescription: 'Activity description',
      actType: 'walk',
      actDuration: 60,
      LogDate: '2 hours',
      actName: 'My Activity',
    },
    {
    _id: '3',
    actDescription: 'Activity description',
    actType: 'run',
    actDuration: 120,
    LogDate: '5 hours',
    actName: 'My Activity',
    },
    {
      _id: '4',
      actDescription: 'Activity description',
      actType: 'walk',
      actDuration: 180,
      LogDate: '5 hours',
      actName: 'My Activity',
    }
  ]

  useEffect(() => {
    axios
      //note: watch all user: .get(`http://localhost:4000/activitylist/`)
      //note: watch current user: .get(`http://localhost:4000/activitylist/${userID}`)
      //doing: .get(`http://hulkfit-backend-wowi.onrender.com/activitylist/${userID}`)
      .get(`http://localhost:4000/activitylist/${userID}`)
      .then((result) => {
        setAPIData(result.data);
        console.log(result.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
      setLoading(false);
  }, [reload]);

  const ternaryUserId =       <div className='bg-white m-10 p-5'>
  {loading ? ( // Check if loading is real then do this
    <p>Loading data...</p>
  ) : ( // Check if loading is false then do this
    <div>
      {apiData[1] ? ( // Check if apiData[1] exists before display it 
        <div>

          <p>User Id : {apiData[1].userId}</p>
        </div>
      ) : ( // Check if apiData[1] not exists before display it */}
        <p>apiData[1] does not exist or the array is empty.</p>
      )} 
    </div>
    // end ternary check apiData[4] is exists?
  )}
</div>
// end ternary check loading
  //const dataFromApiData = apiData[1].userId;



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



  const ternaryDisplay =       <div className='bg-white m-10 p-5'>
  {loading ? ( // Check if loading is real then do this
    <p>Loading data...</p>
  ) : ( // Check if loading is false then do this
    <div>
      {apiData[4] ? ( // Check if apiData[4] exists before display it 
        <div>
          <h2>Data from apiData[4]</h2>
          <p>Activity Name : {apiData[4].actName}</p>
          <p>Activity Description : {apiData[4].actDescription}</p>
          <p>Activity Duration : {apiData[4].actDuration}</p>
          <p>Activity Date : {apiData[4].LogDate}</p>
          <p>User Id : {apiData[4].userId}</p>
        </div>
      ) : ( // Check if apiData[4] not exists before display it */}
        <p>apiData[4] does not exist or the array is empty.</p>
      )} 
    </div>
    // end ternary check apiData[4] is exists?
  )}
</div>
// end ternary check loading

  

  return (

    <>
      <div className='test'>

        {ternaryDisplay}

        
        <div className='bg-white m-10 p-5'>
        {/* {ternaryUserId} */}
      
          <Column {...configColumn} />

        </div>







        

      </div>
    </>
  ); //end return
};

export default Dashboard;


