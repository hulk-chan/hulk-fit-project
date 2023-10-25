import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import NavbarDesktop from '../../components/NavbarDesktop.jsx';
import Navbar from '../../components/Navbar.jsx'

const History = () => {
  const [cookies] = useCookies(['user']);
  const userID = cookies.user._id;
  const [apiData, setAPIData] = useState([]);
  const [reload, setReload] = useState(true);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://hulkfit-backend-wowi.onrender.com/activitylist/${userID}`)
      .then((result) => {
        setAPIData(result.data);
        console.log(userID);
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, [reload, userID]);

  const deleteHandler = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://hulkfit-backend-wowi.onrender.com/activitylist/delete/${id}`
      );
      console.log('Response from backend:', response.status);
      console.log(`ลบแล้ว:${response.status}`);
    } catch (error) {
      console.error('Error:', error);
    }

    setReload(!reload);
  };

  const saveHandler = async () => {
    try {
      const response = await axios.put(
        `https://hulkfit-backend-wowi.onrender.com/activitylist/update`,
        editedData
      );

      console.log('Response from backend:', response.status);
      console.log(`อัพเดทแล้ว:${response.status}`);
      setEditedData(null);
    } catch (error) {
      console.error('Error:', error);
    }

    setReload(!reload);
  };

  const editHandler = (item) => {
    setEditedData({ ...item });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }

  return (
    <div className='h-screen'>
      <NavbarDesktop />
      <div className='flex flex-row'>
        <div className='w-0/3'>
          
        </div>
        <div className='w-3/3'>
          <div className='flex flex-row flex-wrap p-10'>
            {apiData.map((items) => (
              <>
                <div
                  className={`card w-[30rem] shadow-xl m-10`}
                  style={{
                    backgroundImage:`url(/src/assets/type/desk/${items.actType}.png)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className='card-body'>
                    <div className='flex flex-row justify-between items-center bg-black/90 rounded-lg px-4'>
                      <div>
                        <h2 className='card-title text-white text-[2rem]'>
                          {items.actType.toUpperCase()}
                        </h2>
                      </div>
                      <div className='card-actions flex flex-row justify-center items-center'>
                        {editedData && editedData._id === items._id ? (
                          <div className='flex flex-row my-2'>
                            <div>
                              <button
                                onClick={() => deleteHandler(items._id)}
                                className='text-black bg-[#F540A1]  h-[2.5rem] w-[2.5rem] rounded-lg transition duration-300 ease-in-out hover:scale-110 hover:text-[#fefefe] flex flex-row justify-center items-center'
                              >
                                <AiOutlineDelete size={25} />
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() => saveHandler()}
                                className='text-black bg-[#00ECFF] h-[2.5rem] w-[2.5rem] rounded-lg transition duration-300 ease-in-out hover:scale-110 hover:text-[#fefefe] flex flex-row justify-center items-center ml-3'
                              >
                                <AiOutlineSave size={25} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className='flex flex-row my-2'>
                            <div>
                              <button
                                onClick={() => deleteHandler(items._id)}
                                className='text-black bg-[#F540A1]  h-[2.5rem] w-[2.5rem] rounded-lg transition duration-300 ease-in-out hover:scale-110 hover:text-[#fefefe] flex flex-row justify-center items-center'
                              >
                                <AiOutlineDelete size={25} />
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() => editHandler(items)}
                                className='text-black bg-[#00ECFF] h-[2.5rem] w-[2.5rem] rounded-lg transition duration-300 ease-in-out hover:scale-110 hover:text-[#fefefe] flex flex-row justify-center items-center ml-3'
                              >
                                <AiOutlineEdit size={25} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {editedData && editedData._id === items._id ? (
                      <div className='bg-black/90 rounded-lg p-4'>
                        <div className='flex flex-row p-2 w-full'>
                          <div className='text-white w-1/3'>
                            Activity Name : &nbsp;
                          </div>
                          <input
                            className='bg-transparent text-white border border-solid border-white rounded-md px-2 w-2/3'
                            type='text'
                            value={editedData.actName}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                actName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className='flex flex-row w-full p-2'>
                          <div className='text-white w-1/3'>
                            Description : &nbsp;
                          </div>
                          <input
                            className='bg-transparent text-white border border-solid border-white rounded-md px-2 w-2/3'
                            type='text'
                            value={editedData.actDescription}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                actDescription: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className='flex flex-row w-full p-2'>
                          <div className='text-white w-1/3'>
                            Duration{' (Min)'} : &nbsp;
                          </div>
                          <input
                            className='bg-transparent text-white border border-solid border-white rounded-md px-2 w-2/3'
                            type='text'
                            value={editedData.actDuration}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                actDuration: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className='flex flex-row w-full p-2'>
                          <div className='text-white w-1/3'>Date : &nbsp;</div>
                          <input
                            className='bg-transparent text-black border border-solid border-black rounded-md px-2 w-2/3'
                            style={{ filter: 'invert(100%)' }}
                            type='date'
                            value={editedData.actDate}
                            onChange={(e) =>
                              setEditedData({...editedData,actDate: e.target.value})
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div className='bg-black/90 rounded-lg p-4'>
                        <div className='flex flex-row p-2 w-full'>
                          <div className='text-white w-1/3'>
                            Activity Name : &nbsp;
                          </div>
                          <input
                            className='bg-transparent text-white  px-2 w-2/3'
                            type='text'
                            value={items.actName}
                            disabled
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                actName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className='flex flex-row w-full p-2'>
                          <div className='text-white w-1/3'>
                            Description : &nbsp;
                          </div>
                          <input
                            className='bg-transparent text-white  px-2 w-2/3'
                            type='text'
                            disabled
                            value={items.actDescription}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                actDescription: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className='flex flex-row w-full p-2'>
                          <div className='text-white w-1/3'>
                            Duration{' (Min)'} : &nbsp;
                          </div>
                          <input
                            className='bg-transparent text-white  px-2 w-2/3'
                            type='text'
                            value={items.actDuration}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                actDuration: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className='flex flex-row w-full p-2'>
                          <div className='text-white w-1/3'>Date : &nbsp;</div>
                          <input
                            className='bg-transparent text-white  px-2 w-2/3'
                            type='text'
                            value={formatDate(items.actDate)}
                            onChange={(e) =>
                              setEditedData({
                                ...editedData,
                                actDate: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <Navbar/>
    </div>
  );
};

export default History;
