// SubmittedForms.js
import React, { useState, useEffect } from 'react';
import { AiFillDelete, AiFillGooglePlusCircle } from "react-icons/ai"
import { CiCirclePlus } from "react-icons/ci";
import { useHistory, useNavigate } from 'react-router-dom';


const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/prospects');
                if (!response.ok) {
                    console.log("records:", data)
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleAction = () => {
        navigate('/studentform')
    };

    const handleDelete = (userId) => {
        fetch(`http://localhost:3000/prospects/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    alert('Student record deleted successfully');
                } else {
                    // This block catches responses that are not OK but don't throw an error
                    // E.g., server responds with a 4xx or 5xx status code
                    throw new Error('Internal Server Error');
                }
            })
            .then(() => {

                window.location.href = '/dashboard'
            })
            .catch(error => {
                // This catches network errors and errors thrown from the response handling block
                console.error('Delete operation failed:', error);
                alert('Internal Server Error');
                window.location.href = '/dashboard' // Redirect to '/dashboard' even in case of error
            });
    };

    console.log("user",users)

    const categorizedData = users.reduce((acc, obj) => {
        const { subject_area } = obj;
        if (!acc[subject_area]) {
            acc[subject_area] = [];
        }
        acc[subject_area].push(obj);
        return acc;
    }, {});
    
    console.log("categorizedData",categorizedData);


    return (
        <div>
            <div className="title">
                <h2 className="text-gray-700 text-3xl mt-5 font-bold">List of Submissions</h2>
            </div>
    
            <div className='flex flex-row justify-center mr-5 mb-4'>
                <button onClick={handleAction} className="text-red-500 flex items-center">
                    <span className='text-red text-xl font-bold'>Add a form</span>
                    <CiCirclePlus className="w-5 h-5 ml-1" />
                </button>
            </div>
    
            <div className="user-list">
    {Object.entries(categorizedData).map(([category, subjects]) => {
        return (
            <div key={category}>
                <div className='flex text-gray-800 font-bold text-xl justify-center mt-3'>{category}</div>
                {subjects.map((subject) => (
                    <div className='flex flex-row w-full items-center justify-center' key={subject.id}>
                        <div className="border border-1 border-gray-300 rounded bg-gray-100 px-3 py-2 m-5 shadow shadow-md" style={{ width: "50em" }}>
                            <div className='flex flex-row justify-between px-3 py-2'>
                                <div><strong>Full Name:</strong></div>
                                <div>{subject.full_name}</div>
                            </div>
                            <div className='flex flex-row justify-between px-3 py-2'>
                                <div><strong>Email:</strong></div>
                                <div>{subject.email}</div>
                            </div>
                            <div className='flex flex-row justify-between px-3 py-2'>
                                <div><strong>Date of birth:</strong></div>
                                <div>{subject.date_of_birth}</div>
                            </div>
                            <div className='flex flex-row justify-between px-3 py-2'>
                                <div> <strong>Location:</strong></div>
                                <div>{subject.gps_location}</div>
                            </div>
                            <div className='flex flex-row justify-between px-3 py-2'>
                                <div><strong>Area of Interest:</strong></div>
                                <div>{subject.subject_area}</div>
                            </div>
                            <div className='flex flex-row justify-between px-3 py-2'>
                                <div><strong>Agreed Marketing:</strong></div>
                                <div className={`font-semibold ${subject.marketing_updates ? "text-green-600" : "text-red-600"}`}>{subject.marketing_updates ? "Yes" : "No"}</div>
                            </div>
                            <div className='flex flex-row justify-between px-3 py-2'>
                                <div><strong>Agreed correspondence:</strong></div>
                                <div className={`font-semibold ${subject.correspondence_in_welsh ? "text-green-600" : "text-red-600"}`}>{subject.correspondence_in_welsh ? "Yes" : "No"}</div>
                            </div>
                        </div>
                        <div className=''>
                            <button onClick={() => handleDelete(subject.id)} className="text-red-500">
                                <AiFillDelete className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    })}
</div>

        </div>
    );    
};

export default Dashboard;