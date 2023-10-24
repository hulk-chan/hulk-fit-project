import React from "react";
import Navbar from '../../components/Navbar.jsx'
import NavbarDesktop from '../../components/NavbarDesktop.jsx';
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import user from "../../assets/user.png"

function Profile() {
  const [cookies] = useCookies(["user"]);
  const userID = cookies.user._id;
  const [reload,setReload] = useState(true);
  const [image, setImage] = useState();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://hulkfit-backend-wowi.onrender.com/${userID}`)
      .then((result) => {
        setFullname(result.data[0].fullname)
        setEmail(result.data[0].email)
        setPassword(result.data[0].password)
        result.data[0].image ? (setImage(result.data[0].image)) : (setImage(user))
      })
      .catch((err) => console.log(err));
  }, [reload]);

  const saveHandler = async () => {
    try {
      const response = await axios.put(`https://hulkfit-backend-wowi.onrender.com/user/update`,editedData);
      console.log(editedData)
      console.log('Response from backend:', response.data);
      console.log(`อัพเดทแล้ว:${response.status}`)
      setEditedData(null);
    } catch (error) {
      console.error('Error:', error);
    }
    setReload(!reload)
  }

  const editHandler = () => {
    setEditedData({ 
      _id : userID,
      fullname : fullname,
      email : email,
      password : password
     });
  };
  const cancelHandler = () => {
    setEditedData(null)
  }

  return (
    <>
    <NavbarDesktop />
    {/* ----------desktop---------- */}
    <div className="bg-black text-white rounded-3xl w-[80%] m-auto  max-md:hidden mt-20">
    {editedData ? (
    <div className="flex">
    <div className="w-[30%] p-10">
        <img src={image} 
        className=" rounded-full ring ring-[#F540A1] ring-offset-[#F540A1] w-full ring-offset-2"/>
      </div>
      <div className="w-[70%] p-10">
        <p className="p-3 bg-[#F540A1] rounded-lg w-fit mb-5 font-extrabold text-3xl">P r o f i l e</p>
        <div className="border-t border-slate-500 py-5 grid grid-cols-2 gap-4 text-2xl">
    <p>Name </p>
    <input type='text' className="bg-black/[.6]" value={editedData.fullname} onChange={(e) => setEditedData({ ...editedData, fullname: e.target.value })} />
    <p>Email </p>
    <input type='text' className="bg-black/[.6]" value={editedData.email} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} />
    <p>Password </p>
    <input type='password' className="bg-black/[.6]" value={editedData.password} onChange={(e) => setEditedData({ ...editedData, password: e.target.value })} />
    </div>
    </div>
    </div>
    ) : (
    <div className="flex">
      <div className="w-[30%] p-10">
        <img src={image} 
        className=" rounded-full ring ring-[#F540A1] ring-offset-[#F540A1] w-full ring-offset-2"/>
      </div>
      <div className="w-[70%] p-10">
        <p className="p-3 bg-[#F540A1] rounded-lg w-fit mb-5 font-extrabold text-3xl">P r o f i l e</p>
        <div className="border-t border-slate-500 py-5 grid grid-cols-2 gap-4 text-2xl">
            <p>Name </p><p>{fullname}</p>
            <p>Email </p><p>{email}</p>
            <p>Password </p><p>******</p>
        </div>
        </div>
        </div>
        )}

        {editedData ? (
                // If the item is being edited, show the "Save" button
                <div className="flex gap-4 justify-center">
                <button onClick={saveHandler} className='font-semibold bg-[#00ECFF] h-12 w-28 rounded-full text-xl mb-10'>Save</button>
                <button onClick={cancelHandler} className="font-semibold bg-red-900 h-12 w-28 rounded-full text-xl mb-10">Cancel</button>
                </div>
              ) : (
                // If not being edited, show the "Edit" button
                <div className="flex justify-center">
                <button onClick={editHandler} className='font-semibold bg-[#00ECFF] h-12 w-28 mb-10 rounded-full text-xl'>
                  Edit
                </button>
                </div>
              )}
       </div>

    {/* ----------mobile---------- */}
    <div className="text-white rounded-3xl md:hidden">
      {editedData ? (
<> 
<p className="p-3 bg-[#F540A1] rounded-lg w-fit m-auto my-5 font-extrabold text-3xl">P r o f i l e</p>
      <div className="">
        <img src={image}
        className="w-[40%] rounded-full m-auto mt-5 ring ring-[#F540A1] ring-offset-[#F540A1] ring-offset-2"/>
      </div>
      <div className="p-10">
        <div className="border-t border-slate-500 py-5 grid grid-cols-2 gap-4 text-2xl">
        <p>Name </p>
    <input type='text' className="bg-black/[.6]" value={editedData.fullname} onChange={(e) => setEditedData({ ...editedData, fullname: e.target.value })} />
    <p>Email </p>
    <input type='text' className="bg-black/[.6]" value={editedData.email} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} />
    <p>Password </p>
    <input type='password' className="bg-black/[.6]" value={editedData.password} onChange={(e) => setEditedData({ ...editedData, password: e.target.value })} />
        </div>
        </div>
        </>
      ) :(
        <>
<p className="p-3 bg-[#F540A1] rounded-lg w-fit m-auto my-5 font-extrabold text-3xl">P r o f i l e</p>
      <div className="">
        <img src={image}
        className="w-[40%] rounded-full m-auto mt-5 ring ring-[#F540A1] ring-offset-[#F540A1] ring-offset-2"/>
      </div>
      <div className="p-10">
        <div className="border-t border-slate-500 py-5 grid grid-cols-2 gap-4 text-2xl">
            <p>Name </p><p>{fullname}</p>
            <p>Email </p><p>{email}</p>
            <p>Password </p><p>******</p>
        </div>
        </div>
        </>
      )}
        {editedData ? (
                // If the item is being edited, show the "Save" button
                <div className="flex gap-4 justify-center">
                <button onClick={saveHandler} className='font-semibold bg-[#00ECFF] h-12 w-28 rounded-full text-xl mb-10'>Save</button>
                <button onClick={cancelHandler} className="font-semibold bg-red-900 h-12 w-28 rounded-full text-xl mb-10">Cancel</button>
                </div>
              ) : (
                // If not being edited, show the "Edit" button
                <div className="flex justify-center">
                <button onClick={editHandler} className='font-semibold bg-[#00ECFF] h-12 w-28 text-center rounded-full text-xl mb-10'>
                  Edit
                </button>
                </div>
              )}
    </div>
    </>
  );
}

export default Profile;
