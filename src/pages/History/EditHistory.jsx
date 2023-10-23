import React from 'react'
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const EditHistory = () => {

  const [cookies] = useCookies(['user']);
  const userID = cookies.user._id;
  const [actData, setActData] = useState([]);
  const [actName, setActName] = useState();
  const [actType, setActType] = useState();
  const [actDescription, setActDescription] = useState();
  const [actDuration, setActDate] = useState();
  const [actDate, setActDuration] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/activitylist/${id}`)
      .then((result) => {
        setActData(result.data);
        setActName(result.actName);
        setActType(result.actType);
        setActDescription(result.actDescription);
        setActDate(result.actDuration);
        setActDuration(result.actDate);
        console.log(id)
        console.log(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000//activitylist/edit/${id}`, {
        actName,
        actType,
        actDescription,
        actDuration,
        actDate,
      })
      .then((result) => {
        console.log(result);
        navigate("/history");
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      <form onSubmit={Update}>
        <div className='card w-96 bg-base-100 shadow-xl mx-10 my-10'>
          <div className='card-body'>
            <div className='flex flex-row justify-between'>
              
                <h2 className='card-title text-[2rem]'>{items.actType}</h2>
                {/* <button onClick={() => deleteHandler(items._id)} className='text-red-600 font-extrabold ring-2 ring-red-600 px-2 py-1 hover:bg-red-600 hover:text-white'>
                  X
                </button> */}
              
            </div>
            <input 
              type="text"
              placeholder={actName}
              className="input input-bordered w-full max-w-md"
              value={actName}
              onChange={(e) => setActName(e.target.value)}
            />
            <input 
              type="text"
              placeholder={actType}
              className="input input-bordered w-full max-w-md"
              value={actType}
              onChange={(e) => setActType(e.target.value)}
            />
            <input
              type="text"
              placeholder={actDescription}
              className="input input-bordered w-full max-w-md"
              value={actDescription}
              onChange={(e) => setActDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder={actDuration}
              className="input input-bordered w-full max-w-md"
              value={actDuration}
              onChange={(e) => setActDate(e.target.value)}
            />
            <input
              type="text"
              placeholder={actDate}
              className="input input-bordered w-full max-w-md"
              value={actDate}
              onChange={(e) => setActDuration(e.target.value)}
            />
            
            <div className='card-actions justify-end'>
              <button className='btn btn-primary'>Submit</button>
            </div>
          </div>
        </div>
      </form> 
    </>
  );
}

export default EditHistory