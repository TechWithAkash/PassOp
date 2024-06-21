import React, { useState, useRef, useEffect } from "react";
import { Copy, Pencil, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getPassword = async () => {
    try {
      let req = await fetch("http://localhost:3000");
      let password = await req.json();
      setPasswordArray(password);
    } catch (error) {
      console.error("Failed to fetch passwords:", error);
    }
  };

  useEffect(() => {
    getPassword();
  }, []);

  const showPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    passwordRef.current.type = isPasswordVisible ? "text" : "password";
    ref.current.src = isPasswordVisible ? "icons/eye-off.png" : "icons/eye.png";
  }, [isPasswordVisible]);

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newForm = { ...form, id: uuidv4() };

      try {
        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newForm),
        });

        setPasswordArray((prev) => [...prev, newForm]);
        setForm({ site: "", username: "", password: "" });
        toast.success("Password Saved Successfully 🥳");
      } catch (error) {
        toast.error("Error❗ : Password not Saved");
      }
    } else {
      toast.error("Error❗ : Password not Saved");
    }
  };

  const deletePassword = async (id) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this password with id ${id}?`);
    if (confirmDelete) {
      try {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        setPasswordArray((prev) => prev.filter((item) => item.id !== id));
        toast.success("Password Deleted Successfully 🥳");
      } catch (error) {
        toast.error("Error❗ : Password not Deleted");
      }
    }
  };

  const editPassword = (id) => {
    const selectedPassword = passwordArray.find((item) => item.id === id);
    setForm(selectedPassword);
    setPasswordArray((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Text Copied to Clipboard 🥳!");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable pauseOnFocusLoss theme="light" />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      
      <div className="min-h-[83vh] mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-4 sm:text-5xl md:text-6xl">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">OP/&gt;</span>
      </h1>
      <p className="text-green-700 text-lg text-center font-semibold mb-8 sm:text-xl md:text-2xl">
        <span className="text-black font-bold">&lt;</span>Your Own Password Manager<span className="text-black font-bold">/&gt;</span>
      </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} name="site" placeholder="Enter Website URL" type="text" className="rounded-full border border-green-500 w-full p-4 py-1 focus:border-green-300 focus:outline-none" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} name="username" placeholder="Enter Username" type="text" className="rounded-full border border-green-500 w-full p-4 py-1 focus:border-green-300 focus:outline-none" />
            <div className="relative">
              <input ref={passwordRef} type="password" value={form.password} onChange={handleChange} name="password" placeholder="Enter Password" className="rounded-full border border-green-500 w-full p-4 py-1 focus:border-green-300 focus:outline-none" />
              <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} className="p-1" width={26} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className="flex font-semibold text-xl justify-center gap-2 items-center bg-green-400 text-white rounded-full px-4 py-3 w-fit shadow-lg transform transition-transform duration-300 hover:bg-green-500 hover:scale-105">
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h1 className="font-bold text-2xl py-5">Your Passwords :-</h1>
          {passwordArray.length === 0 && <div class="text-center text-xl font-bold italic text-slate-700 bg-transparent p-4 rounded-lg shadow-md">
  No Passwords to Show Please add Your Passwords!!
</div>
}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-0 md:w-full rounded-lg overflow-hidden">
              <thead className="bg-green-800 text-white border-2">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-green-500 py-2 text-center w-32">
                      <div className="flex justify-center items-center gap-8 relative">
                        <a href={item.site} target="_blank" rel="noopener noreferrer">
                          {item.site}
                        </a>
                        <div className="bg-green-400 p-1 rounded-lg text-white shadow-lg transform transition-transform duration-300 hover:bg-green-600 hover:scale-105 hover:cursor-pointer" onClick={() => copyText(item.site)}>
                          <Copy />
                        </div>
                      </div>
                    </td>
                    <td className="border border-green-500 py-2 text-center w-32">
                      <div className="flex justify-center items-center gap-8 relative">
                        {item.username}
                        <div className="bg-green-400 p-1 rounded-lg text-white shadow-lg transform transition-transform duration-300 hover:bg-green-600 hover:scale-105 hover:cursor-pointer" onClick={() => copyText(item.username)}>
                          <Copy />
                        </div>
                      </div>
                    </td>
                    <td className="border border-green-500 py-2 text-center w-32">
                      <div className="flex justify-center items-center gap-8 relative">
                        {item.password}
                        <div className="bg-green-400 p-1 rounded-lg text-white shadow-lg transform transition-transform duration-300 hover:bg-green-600 hover:scale-105 hover:cursor-pointer" onClick={() => copyText(item.password)}>
                          <Copy />
                        </div>
                      </div>
                    </td>
                    <td className="border border-green-500 py-2 text-center w-32">
                      <div className="flex justify-center items-center gap-5">
                        <span className="cursor-pointer hover:scale-125 hover:text-green-500 transition-transform duration-300 ease-in-out" onClick={() => editPassword(item.id)}>
                          <Pencil />
                        </span>
                        <span className="cursor-pointer hover:scale-125 text-red-600 hover:text-red-500 transition-transform duration-300 ease-in-out" onClick={() => deletePassword(item.id)}>
                          <Trash2 />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;




// import React from 'react';
// // Import icons and other dependencies

// const ResponsiveTable = ({ passwordArray }) => {
//   // Example functions for handling clicks
//   const copyText = (text) => {
//     navigator.clipboard.writeText(text);
//   };
//   const editPassword = (id) => {
//     console.log(`Edit password with ID: ${id}`);
//   };
//   const deletePassword = (id) => {
//     console.log(`Delete password with ID: ${id}`);
//   };

//   return (
//     <table className="w-full md:w-auto rounded-lg overflow-hidden">
//       <thead className="bg-green-800 text-white border-2">
//         <tr>
//           <th className="py-2 w-full md:w-32">Site</th>
//           <th className="py-2 w-full md:w-32">Username</th>
//           <th className="py-2 w-full md:w-32">Password</th>
//           <th className="py-2 w-full md:w-32">Actions</th>
//         </tr>
//       </thead>
//       <tbody className="bg-green-100 divide-y divide-gray-200">
//         {passwordArray.map((item, index) => (
//           <tr key={index}>
//             <td className="border border-green-500 py-2 text-center whitespace-nowrap">
//               <div className="flex justify-center items-center gap-8 relative">
//                 <a href={item.site} target="_blank" rel="noopener noreferrer">
//                   {item.site}
//                 </a>
//                 <div className="bg-green-400 p-1 rounded-lg text-white shadow-lg transform transition-transform duration-300 hover:bg-green-600 hover:scale-105 hover:cursor-pointer" onClick={() => copyText(item.site)}>
//                   <Copy />
//                 </div>
//               </div>
//             </td>
//             <td className="border border-green-500 py-2 text-center whitespace-nowrap">
//               <div className="flex justify-center items-center gap-8 relative">
//                 {item.username}
//                 <div className="bg-green-400 p-1 rounded-lg text-white shadow-lg transform transition-transform duration-300 hover:bg-green-600 hover:scale-105 hover:cursor-pointer" onClick={() => copyText(item.username)}>
//                   <Copy />
//                 </div>
//               </div>
//             </td>
//             <td className="border border-green-500 py-2 text-center whitespace-nowrap">
//               <div className="flex justify-center items-center gap-8 relative">
//                 {item.password}
//                 <div className="bg-green-400 p-1 rounded-lg text-white shadow-lg transform transition-transform duration-300 hover:bg-green-600 hover:scale-105 hover:cursor-pointer" onClick={() => copyText(item.password)}>
//                   <Copy />
//                 </div>
//               </div>
//             </td>
//             <td className="border border-green-500 py-2 text-center whitespace-nowrap">
//               <div className="flex justify-center items-center gap-5">
//                 <span className="cursor-pointer hover:scale-125 hover:text-green-500 transition-transform duration-300 ease-in-out" onClick={() => editPassword(item.id)}>
//                   <Pencil />
//                 </span>
//                 <span className="cursor-pointer hover:scale-125 text-red-600 hover:text-red-500 transition-transform duration-300 ease-in-out" onClick={() => deletePassword(item.id)}>
//                   <Trash2 />
//                 </span>
//               </div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ResponsiveTable;
