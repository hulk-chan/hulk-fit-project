import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {Link} from 'react-router-dom'
import axios from 'axios';
import NavbarDesktop from '../../components/NavbarDesktop.jsx';
import EditHistory from './EditHistory.jsx';

const History = () => {
  const [cookies] = useCookies(['user']);
  const userID = cookies.user._id;
  const [apiData, setAPIData] = useState([]);
  const [reload,setReload] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/activitylist/${userID}`)
      .then((result) => {
        setAPIData(result.data);
        console.log(userID)
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, [reload]);

  const deleteHandler = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(
        `http://localhost:4000/activitylist/delete/${id}`);
      console.log('Response from backend:', response.status);
      console.log(`ลบแล้ว:${response.status}`)

    } catch (error) {
      console.error('Error:', error);
    }

    setReload(!reload)
  }

  // const editHandler = async (id) => {
  //   console.log(id)
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:4000/activitylist/edit/${id}`);
  //     console.log('Response from backend:', response.status);
  //     console.log(`แก้แล้ว:${response.status}`)

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }

  //   setReload(!reload)
  //}

  // const editHandler = async (actId, actName, actType, actDescription, actDuration, actDate) => {
  //   const requestData = {
  //     actId: actId,
  //     actName: actName,
  //     actType: actType,
  //     actDescription: actDescription,
  //     actDuration: actDuration,
  //     actDate: actDate,
  //   };
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:4000/activitylist/edit/${id}`,
  //       requestData);
  //       // console.log('Response from backend:', response.status);
  //       // console.log(`แก้แล้ว:${response.status}`)

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }

  //   setReload(!reload)
  // };


  return (
    <>
      <NavbarDesktop />
      <div className='flex flex-row justify-between'>
        <div className='w-1/5 bg-red-500'></div>
      
        <div className='flex flex-row flex-wrap justify-center'>
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
                  <p>Activity ID : {items._id}</p>
                  <p>User Id : {items.userId}</p>
                  <p>Activity Name : {items.actName}</p>
                  <p>Activity Description : {items.actDescription}</p>
                  <p>Activity Duration : {items.actDuration}</p>
                  <p>Activity Date : {items.actDate}</p>
                  <p>Log Date : {items.LogDate}</p>
                  {/* <EditHistory editHandler={editHandler} actId = {items._id} /> */}
                  <div className='card-actions justify-end'>
                    {/* <button onClick={() => editHandler(items._id)} className='btn btn-primary'>Edit</button> */}
                    <Link to={`/edithistory/${items._id}`} className="btn btn-primary">Edit</Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>

        <div className='w-1/5 bg-red-500'></div>
      </div>
    </>  
  );
};

export default History;
