import { Link , useLocation} from "react-router-dom";

import imWalk from "../../../src/assets/icon/mobile/walk.png"
import imRun from "../../../src/assets/icon/mobile/run.png"
import imBicycle from "../../../src/assets/icon/mobile/bike.png"
import imSwim from "../../../src/assets/icon/mobile/swim.png"
import imTennis from "../../../src/assets/icon/mobile/tennis.png"
import imSkateboard from "../../../src/assets/icon/mobile/skateboard.png"
import imHike from "../../../src/assets/icon/mobile/hike.png"
import imFootball from "../../../src/assets/icon/mobile/football.png"

import idWalk from "../../../src/assets/icon/desk/walk.png"
import idRun from "../../../src/assets/icon/desk/run.png"
import idBicycle from "../../../src/assets/icon/desk/bike.png"
import idSwim from "../../../src/assets/icon/desk/swim.png"
import idTennis from "../../../src/assets/icon/desk/tennis.png"
import idSkateboard from "../../../src/assets/icon/desk/skateboard.png"
import idHike from "../../../src/assets/icon/desk/hike.png"
import idFootball from "../../../src/assets/icon/desk/football.png"

import tmWalk from "../../../src/assets/type/mobile/walk.png"
import tmRun from "../../../src/assets/type/mobile/run.png"
import tmBicycle from "../../../src/assets/type/mobile/bike.png"
import tmSwim from "../../../src/assets/type/mobile/swim.png"
import tmTennis from "../../../src/assets/type/mobile/tennis.png"
import tmSkateboard from "../../../src/assets/type/mobile/skateboard.png"
import tmHike from "../../../src/assets/type/mobile/hike.png"
import tmFootball from "../../../src/assets/type/mobile/football.png"

import tdWalk from "../../../src/assets/type/desk/walk.png"
import tdRun from "../../../src/assets/type/desk/run.png"
import tdBicycle from "../../../src/assets/type/desk/bike.png"
import tdSwim from "../../../src/assets/type/desk/swim.png"
import tdTennis from "../../../src/assets/type/desk/tennis.png"
import tdSkateboard from "../../../src/assets/type/desk/skateboard.png"
import tdHike from "../../../src/assets/type/desk/hike.png"
import tdFootball from "../../../src/assets/type/desk/football.png"


const ActivityType = () => {

  return (
    <div>
      {/* ----------desktop---------- */}
      <div className="w-7/12 min-h-screen m-auto bg-gradient-to-r from-cyan-500 to-blue-500 flex max-md:hidden">
      <h1 className="w-[50%] text-6xl text-white text-center my-auto">Activity Type</h1>
      <div className="w-[50%] grid grid-cols-2 justify-items-end">
        <Link to="/activityform" state={ { iconMb: tmWalk , iconDt: tdWalk , type: "walk"}}><img src={idWalk} alt="walk icon" className="w-full h-full "/></Link>
        <Link to="/activityform" state={ { iconMb: tmRun , iconDt: tdRun , type: "run"}} ><img src={idRun} alt="run icon" className="w-full h-full" /></Link>
        <Link to="/activityform" state={ { iconMb: tmBicycle , iconDt: tdBicycle , type: "bicycle"}} ><img src={idBicycle} alt="bicycle icon" className="w-full h-full" /></Link>
        <Link to="/activityform" state={ { iconMb: tmSwim , iconDt: tdSwim , type: "swim"}} ><img src={idSwim} alt="swim icon" className="w-full h-full"/></Link>
        <Link to="/activityform" state={ { iconMb: tmTennis , iconDt: tdTennis , type: "tennis"}} ><img src={idTennis} alt="tennis icon" className="w-full h-full"/></Link>
        <Link to="/activityform" state={ { iconMb: tmSkateboard , iconDt: tdSkateboard , type: "skateboard"}} ><img src={idSkateboard} alt="skateboard icon" className="w-full h-full"/></Link>
        <Link to="/activityform" state={ { iconMb: tmHike , iconDt: tdHike , type: "hike"}} ><img src={idHike} alt="hike icon" className="w-full h-full" /></Link>
        <Link to="/activityform" state={ { iconMb: tmFootball , iconDt: tdFootball , type: "football"}} ><img src={idFootball} alt="football icon" className="w-full h-full"/></Link>
      </div>
    </div>

    {/* ----------mobile---------- */}
    <div className="w-[290px] m-auto md:hidden">
      <h1 className="text-5xl text-white text-center pt-12 mb-11">Activity Type</h1>
      <div className="grid grid-cols-2 justify-items-center">
      <Link to="/activityform" state={ { iconMb: tmWalk , type: "walk"}}><img src={imWalk} alt="walk icon" className="w-[123px] h-[123px] m-2 "/></Link>
        <Link to="/activityform" state={ { iconMb: tmRun , type: "run"}} ><img src={imRun} alt="run icon" className="w-[123px] h-[123px] m-2" /></Link>
        <Link to="/activityform" state={ { iconMb: tmBicycle , type: "bicycle"}} ><img src={imBicycle} alt="bicycle icon" className="w-[123px] h-[123px] m-2" /></Link>
        <Link to="/activityform" state={ { iconMb: tmSwim , type: "swim"}} ><img src={imSwim} alt="swim icon" className="w-[123px] h-[123px] m-2"/></Link>
        <Link to="/activityform" state={ { iconMb: tmTennis , type: "tennis"}} ><img src={imTennis} alt="tennis icon" className="w-[123px] h-[123px] m-2"/></Link>
        <Link to="/activityform" state={ { iconMb: tmSkateboard , type: "skateboard"}} ><img src={imSkateboard} alt="skateboard icon" className="w-[123px] h-[123px] m-2"/></Link>
        <Link to="/activityform" state={ { iconMb: tmHike , type: "hike"}} ><img src={imHike} alt="hike icon" className="w-[123px] h-[123px] m-2" /></Link>
        <Link to="/activityform" state={ { iconMb: tmFootball , type: "football"}} ><img src={imFootball} alt="football icon" className="w-[123px] h-[123px] m-2"/></Link>
      
      </div>
    </div>
    </div>
  )
}

export default ActivityType