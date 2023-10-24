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
  //const [loading,setLoading] = useState(true);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://hulkfit-backend-wowi.onrender.com/activitylist/dashboard/column/${userID}`)
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
      .get(`http://hulkfit-backend-wowi.onrender.com/activitylist/dashboard/pie/${userID}`)
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
      .get(`http://hulkfit-backend-wowi.onrender.com/activitylist/${userID}`)
      .then((result) => {
        setAPIData(result.data);
        console.log(userID)
        console.log(userID)
        console.log(result.data);
        cal();
      })
      .catch((err) => console.log(err));
  }, [reload]);
  
  const deleteHandler = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(
        `http://hulkfit-backend-wowi.onrender.com/activitylist/delete/${id}`);
      console.log('Response from backend:', response.status);
      console.log(`ลบแล้ว:${response.status}`)
  
    } catch (error) {
      console.error('Error:', error);
    }
  
    setReload(!reload)
  }
  
  const saveHandler = async (items) => {
        
    try {
      const response = await axios.put(`http://hulkfit-backend-wowi.onrender.com/activitylist/update`,editedData);
  
      console.log('Response from backend:', response.status);
      console.log(`อัพเดทแล้ว:${response.status}`)
      setEditedData(null);
    } catch (error) {
      console.error('Error:', error);
    }
  
    setReload(!reload)
  }
  
  const editHandler = (item) => {
    setEditedData({ ...item });
  };

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
      <div >
        <NavbarDesktop />
       
        <div className='content flex flex-row justify-between gap-20 '>
              

          <div className='section-graph flex flex-col '>
            <div className='bg-white  p-10 '>
              <Column {...configColumn} />
            </div>
            <div className='bg-white  p-10 '>
              <Pie {...configPie} />
            </div>
            <div className='mx-auto flex flex-row flex-wrap justify-center'>
              {apiData.map((items) => (
                <>
                  <div className='card w-96 bg-base-100 shadow-xl mx-10 my-10'>
                    <div className='card-body'>
                      <div className='flex flex-row justify-between'>
                        
                          <h2 className='card-title text-[2rem]'>{items.actType}</h2>
                          <button onClick={() => deleteHandler(items._id)} className='text-red-600 font-extrabold ring-2 ring-red-600 px-2 py-1 hover:bg-red-600 hover:text-white'>
                            X
                          </button>
                        
                      </div>

                      {editedData && editedData._id === items._id ? (
                      // If the item is being edited, show input fields
                      <>
                      <div className='flex flex-row'>
                        <div>Activity ID : &nbsp;</div>
                        <input
                            type='text'
                            value={editedData._id}
                            onChange={(e) => setEditedData({ ...editedData, _id: e.target.value })}
                          />
                      </div>
                      <div className='flex flex-row'>
                        <div>Activity Name : &nbsp;</div>
                        <input
                            type='text'
                            value={editedData.actName}
                            onChange={(e) => setEditedData({ ...editedData, actName: e.target.value })}
                          />
                      </div>
                      <div className='flex flex-row'>
                        <div>Activity Description : &nbsp;</div>
                        <input
                            type='text'
                            value={editedData.actDescription}
                            onChange={(e) => setEditedData({ ...editedData, actDescription: e.target.value })}
                          />
                      </div>
                      <div className='flex flex-row'>
                        <div>Activity Duration : &nbsp;</div>
                        <input
                            type='text'
                            value={editedData.actDuration}
                            onChange={(e) => setEditedData({ ...editedData, actDuration: e.target.value })}
                          />
                      </div>
                      <div className='flex flex-row'>
                        <div>Activity Date : &nbsp;</div>
                        <input
                            type='text'
                            value={editedData.actDate}
                            onChange={(e) => setEditedData({ ...editedData, actDate: e.target.value })}
                          />
                      </div>
                      <div className='flex flex-row'>
                        <div>User Id : &nbsp;</div>
                        <input
                            type='text'
                            value={editedData.userId}
                            onChange={(e) => setEditedData({ ...editedData, userId: e.target.value })}
                          />
                      </div>
                        
                        
                        {/* Add input fields for other fields you want to edit */}
                      </>
                    ) : (
                      // If not being edited, show the data in p tags
                      <>
                        <p>Activity ID : {items._id}</p>
                        <p>Activity Name : {items.actName}</p>
                        <p>Activity Description : {items.actDescription}</p>
                        <p>Activity Duration : {items.actDuration}</p>
                        <p>Activity Date : {items.actDate}</p>
                        <p>User Id : {items.userId}</p>
                      </>
                    )}

                      
                      <div className='card-actions justify-end'>
                      {editedData && editedData._id === items._id ? (
                        // If the item is being edited, show the "Save" button
                        <button onClick={saveHandler} className='btn btn-primary'>
                          Save
                        </button>
                      ) : (
                        // If not being edited, show the "Edit" button
                        <button onClick={() => editHandler(items)} className='btn btn-primary'>
                          Edit
                        </button>
                      )}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>  
      </div>
    </>
  ); //end return
};

export default Dashboard;


