import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';

const ActivityForm = () => {
  const [cookies] = useCookies(['user']);
  const id = cookies.user._id
  let { state } = useLocation();
  const navigate = useNavigate();
  const [activityName, setActivityName] = useState("");
  const [activityDes, setActivityDes] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [invalidName, setInvalidName] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidDuration, setInvalidDuration] = useState(false);

  const addActivity = async () => {

    const newActivity = {
      userId:id,
      actName:activityName,
      actDescription:activityDes,
      actType: state.type,
      actDuration:duration,
      actDate:date
    }
   
    try {
      const response = await axios.post(
        'https://hulkfit-backend-wowi.onrender.com/addactivity',
        newActivity
      );
      console.log('Response from backend:', response.data, response.status)
      alert("Success");
      navigate('/userhome')

    } catch (error) {
      checkData();
      console.error('Error:', error);
    }
    navigate('/userhome')
  };

  const checkData = () => {
    activityName == "" ? setInvalidName(true) : setInvalidName(false)
    date == "" ? setInvalidDate(true) : setInvalidDate(false)
    duration == "" ? setInvalidDuration(true) : setInvalidDuration(false)
  }
  
  return (
    <div className="text-white">
      {/* ----------desktop---------- */}
      <div  className='w-full min-h-screen flex flex-row max-md:hidden'
      style={{
        backgroundImage:
          `url(${state.iconDt})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
      }}>
      
        <div className="w-[68%]">
        </div>
        
        <div className="w-[30%] flex flex-col pt-5">

          <label htmlFor="activity-name" className="my-0.5 px-3 text-2xl">
            Activity Name<span className="text-red-500 p-1">*</span>
          </label>
          <input
            className="my-0.5 border-2 border-[#243c5a] rounded-lg bg-black/[.6] p-3.5 hover:border-white"
            id="activity-name"
            name="activity-name"
            placeholder="Enter Activity name"
            value={activityName}
            onChange={(evl) => setActivityName(evl.target.value)} required
          ></input>
          {invalidName && <label htmlFor="activity-name" className="text-sm font-bold text-red-700">
          Please enter Activity Name
          </label> }
          

          <label
            htmlFor="activity-description"
            className="my-0.5 px-3 text-2xl ">
            Activity Description
          </label>
          <textarea
            className="h-[185px] my-0.5 border-2 border-[#243c5a] rounded-lg bg-black/[.6] p-3.5  hover:border-white"
            id="activity-description"
            name="activity-description"
            rows="4"
            cols="50"
            placeholder="Enter Activity details"
            value={activityDes}
            onChange={(evl) => setActivityDes(evl.target.value)}
          ></textarea>
          
          <label htmlFor="date" className="my-0.5 px-3 text-2xl ">
            Date<span className="text-red-500 p-1">*</span>
          </label>
          <input
            type="date"
            className="custom-date-input my-0.5 border-2 border-[#243c5a] rounded-lg bg-black/[.6] p-3.5 hover:border-white"
            id="date"
            name="date"
            value={date}
            onChange={(evl) => setDate(evl.target.value)}
          ></input>
           {invalidDate && <label htmlFor="activity-name" className="text-sm font-bold text-red-700">
          Please enter Date
          </label>  }

          <label htmlFor="duration" className="my-0.5 px-3 text-2xl ">
            Duration (Minutes)<span className="text-red-500 p-1">*</span>
          </label>
          <input
            type="number" min="1"
            name="timeinput"
            className="custom-time-input bg-black/[.6] border-2 border-[#243c5a] rounded-lg p-3.5 hover:border-white"
            onChange={(evl) => setDuration(evl.target.value)}
          />
         {invalidDuration &&  <label htmlFor="activity-name" className="text-sm font-bold text-red-700">
          Please enter Duration
          </label> }

          <button
            onClick={addActivity}
            className="h-[57px] my-8 bg-[#00ECFF] hover: rounded-lg text-black text-2xl font-bold	hover:bg-[#F540A1] hover:text-white"
          >
            Save
          </button>
        </div>
      </div>

      {/* ----------mobile---------- */}
      <div className="w-[328px] flex flex-col m-auto md:hidden">
        <img className="w-[93px] h-[37] mSt-16	pt-6 self-end" src={state.iconMb} />

        <label htmlFor="activity-name" className="my-0.5 px-3 text-2xl ">
          Activity Name<span className="text-red-500 p-1">*</span>
        </label>
        <input
          className="my-0.5 border-2 border-[#243c5a] rounded-lg bg-inherit p-3.5 hover:border-white"
          id="activity-name"
          name="activity-name"
          placeholder="Enter Activity name"
          value={activityName}
          onChange={(evl) => setActivityName(evl.target.value)}
        ></input>
         {invalidName && <label htmlFor="activity-name" className="text-sm font-bold text-red-700">
          Please enter Activity Name
          </label> }

        <label htmlFor="activity-description" className="my-0.5 px-3 text-2xl ">
          Activity Description
        </label>
        <textarea
          className="h-[185px] my-0.5 border-2 border-[#243c5a] rounded-lg bg-inherit p-3.5  hover:border-white"
          id="activity-description"
          name="activity-description"
          rows="4"
          cols="50"
          placeholder="Enter Activity details"
          value={activityDes}
          onChange={(evl) => setActivityDes(evl.target.value)}
        ></textarea>

        <label htmlFor="date" className="my-0.5 px-3 text-2xl ">
          Date<span className="text-red-500 p-1">*</span>
        </label>
        <input
          type="date"
          className="custom-date-input my-0.5 border-2 border-[#243c5a] rounded-lg bg-inherit p-3.5 hover:border-white"
          id="date"
          name="date"
          value={date}
          onChange={(evl) => setDate(evl.target.value)}
        ></input>
          {invalidDate && <label htmlFor="activity-name" className="text-sm font-bold text-red-700">
          Please enter Date
          </label>  }

<label htmlFor="duration" className="my-0.5 px-3 text-2xl ">
            Duration (Minutes)<span className="text-red-500 p-1">*</span>
          </label>
          <input
            type="number" min="1"
            name="timeinput"
            className="custom-time-input bg-black/[.6] border-2 border-[#243c5a] rounded-lg p-3.5 hover:border-white"
            onChange={(evl) => setDuration(evl.target.value)}
          />
          {invalidDuration &&  <label htmlFor="activity-name" className="text-sm font-bold text-red-700">
          Please enter Duration
          </label> }

        <button
          onClick={addActivity}
          className="h-[57px] my-16 bg-[#00ECFF] rounded-lg text-black text-2xl font-bold hover:bg-[#F540A1] hover:text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ActivityForm;
