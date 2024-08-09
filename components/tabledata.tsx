"use client";

import Image from 'next/image'
import React, { useEffect, useState } from "react";
import axios from 'axios' //npm install axios https://www.npmjs.com/package/axios
import Link from "next/link";

export default function Users() {
    const [userData, setUSerData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
 
    const fetchData = async () => {
        try {
            const result = await axios("http://localhost:3000/");
            console.log(result.data);
            setUSerData(result.data)
        } catch (err) {
            console.log("somthing Wrong");
        }
    }

  return (
        <table className="table table-zebra">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Photo</th>
            <th className="py-3 px-6 text-center">Actions</th>
            </tr>
        </thead>
        <tbody>
            {userData.map((rs, index) => (
            <tr key={rs._id} className="bg-white border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{rs.name}</td>
                <td className="py-3 px-6">{rs.email}</td>
                <td className="py-3 px-6">
                    <Image
                    //src="http://localhost:3000/static/images/1712715411577_2.png"
                    src={`http://localhost:3000/static/images/${rs.photo}`}
                    width={100}
                    height={100}
                    alt="Photo"
                    />
                </td>
                <td className="flex justify-center gap-1 py-3">
                    <Link
                    href="#" 
                    className="btn btn-info">
                    View
                    </Link>
                    <Link
                    href="#"
                    className="btn btn-primary">
                    Edit
                    </Link>
                    <button className="btn btn-secondary">Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
  );
}