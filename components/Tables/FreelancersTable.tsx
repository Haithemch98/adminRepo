"use client"

import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons';



type Freelancer = {
  id: number; // Accepts null values
  isSeller: boolean | null; // Accepts null values
  imgUrl: string | null; // Accepts null values
  userName: string | null; // Accepts null values
  email: string | null; // Accepts null values
  country: string | null; // Accepts null values
  phone: string | null; // Accepts null values
  description: string | null; // Accepts null values
};


const FreelancersTable = () => {
  const { userId } = useParams();
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const token = localStorage.getItem('token');
  useEffect(() => {

    const fetchFreelancers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/freelancers", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFreelancers(response.data);
      } catch (error) {
        console.error("Error fetching freelancer details:", error);
      }
    };


    fetchFreelancers();
  }, []);

  const handleDeletee = async ({ userId }: { userId: number }) => {
    if (!userId) {
      console.error('User ID is undefined.');
      return;
    }

    // Display a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (confirmDelete) {
      try {
        // Make a DELETE request to your backend API
        await axios.delete(`http://localhost:3000/admin/delete/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Update the local state to reflect the deleted user
        setFreelancers((prevfreelancer) => prevfreelancer.filter((freelancer) =>
          freelancer.id !== userId
        ));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    } else {
      // User clicked "Cancel" in the confirmation dialog
      console.log('User canceled deletion');
    }
  };


  const banUser = async ({ userId }: { userId: number }) => {
    try {
      const confirmBan = window.confirm("Are you sure you want to ban this user?");
      if (confirmBan) {
        const response = await axios.put(`http://localhost:3000/user/ban/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          console.log('User banned successfully');
        } else {
          console.error('Failed to ban user. Server returned:', response.data);
        }
      } else {
        console.log('User canceled banning');
      }
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };
  const unbanUser = async ({ userId }: { userId: number }) => {
    try {
      const confirmUnban = window.confirm("Are you sure you want to unban this user?");
      if (confirmUnban) {
        const response = await axios.put(`http://localhost:3000/user/unban/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (response.status === 200) {
          console.log('User unbanned successfully');
        } else {
          console.error('Failed to unban user. Server returned:', response.data);
        }
      } else {
        console.log('User canceled unbanning');
      }
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };





  return (
    <>
      



      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark.bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Freelancers
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark.bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                username
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                email
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                country
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                phone
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                description
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                delete
              </h5>
            </div>
          </div>

          {freelancers.map((freelancer, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 ${key === freelancers.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <div className="flex-shrink-0">
                    {freelancer.imgUrl ? (
                      <img src={freelancer.imgUrl} alt="freelancer" width={48} height={48} onClick={() => { console.log("image clicekd "); }} />
                    ) : (
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/basic-ui-set/100/Admin-128.png" // Replace with the actual path to your default image
                        alt="Default freelancer"
                        width={48}
                        height={48}
                      />
                    )}
                  </div>
                  <p className="hidden text-black dark:text-white sm:block">
                    {freelancer.userName}
                  </p>
                </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{freelancer.email}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{freelancer.country}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{freelancer.phone || 'N/A'}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{freelancer.description || 'N/A'}</p>
              </div>
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <button onClick={() => handleDeletee({ userId: freelancers[key].id })} className="hover:text-primary">
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                    fill=""
                  />
                  <path
                    d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                    fill=""
                  />
                  <path
                    d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                    fill=""
                  />
                  <path
                    d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                    fill=""
                  />
                </svg>
                
              </button>
              <button  className="p-5" onClick={() => banUser({ userId: freelancers[key].id })}>
              <FontAwesomeIcon icon={faUserSlash} />
              </button>
              <button className="p-5" onClick={() => unbanUser({ userId: freelancers[key].id })}>
              <FontAwesomeIcon icon={faUser} />
              </button>
              </div>
            </div>
          ))}

        </div>
      </div>

    </>
  );
};

export default FreelancersTable;
