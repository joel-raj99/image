// "use client";

// import React, { useState } from "react";
// import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios

// const CreateUserPage = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [file, setFile] = useState("")

//     const onSubmitUpload = async (e) => {
//         e.preventDefault();
//        try {
//           const formData = new FormData()
//           formData.append("name", name);
//           formData.append("email", email);
//           formData.append('file', file)
//           axios.post('http://localhost:3001/create',formData )
//           .then((response) => {
//               console.log(response);
//               window.location.href = '/';
//           })
//           .catch(er => console.log(er))
//         } catch (err) {
//             console.log("Something Wrong");
//         }
//     }
    
//     return (
//     <div className="max-w-md mx-auto mt-5">
//         <h1 className="text-2xl text-center mb-2">Add New User</h1>
//         <div>
//         <form>
//         <div className="mb-5">
//           <label htmlFor="name" className="block text-sm font-medium text-gray-900">
//             Full Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             className="input input-bordered input-primary w-full max-w-xs"
//             placeholder="Full Name..."
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="mb-5">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-900">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             className="input input-bordered input-primary w-full max-w-xs"
//             placeholder="Email..."
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="mb-5">
//           <label className="block text-sm font-medium text-gray-900">
//             Upload File
//           </label>
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} className="file-input file-input-bordered file-input-secondary w-full max-w-xs"/>
//         </div>
//         <button type="submit" className="btn btn-primary" onClick={e => onSubmitUpload(e)}>Add User</button> 
//       </form>
//     </div>
//     </div>
//   );
// };
  

// export default CreateUserPage;


"use client";

import React, { useState } from "react";
import axios from 'axios'; //npm install axios https://www.npmjs.com/package/axios

const CreateUserPage: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const onSubmitUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            if (file) {
                formData.append('file', file);
            }
            axios.post('http://localhost:3000/create', formData)
                .then((response) => {
                    console.log(response);
                    window.location.href = '/';
                })
                .catch(er => console.log(er));
        } catch (err) {
            console.log("Something went wrong");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-5">
            <h1 className="text-2xl text-center mb-2">Add New User</h1>
            <div>
                <form onSubmit={onSubmitUpload}>
                    <div className="mb-5">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="input input-bordered input-primary w-full max-w-xs"
                            placeholder="Full Name..."
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="input input-bordered input-primary w-full max-w-xs"
                            placeholder="Email..."
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-900">
                            Upload File
                        </label>
                        <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="file-input file-input-bordered file-input-secondary w-full max-w-xs"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default CreateUserPage;
