import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

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

  return (
    <div className='flex flex-row flex-wrap'>
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

              <div className='card-actions justify-end'>
                <button className='btn btn-primary'>Edit</button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default History;
