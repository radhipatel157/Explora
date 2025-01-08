

// import React, { useState, useEffect } from 'react';
// import Navbar from '../../component/Navbar';
// import TravelStoryCard from '../../component/cards/TravelStoryCard';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosinstance';
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import Modal from 'react-modal'; // Add the Modal import

// import AddEditTravelStory from './AddEditTravelStory'; // Make sure the path is correct
// import { MdAdd } from 'react-icons/md'; // Add the MdAdd icon import

// function Home() {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [allStories, setAllStories] = useState([]);
//   const [openAddEditModal, setOpenAddEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   // Get User Info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get('/get-user');
//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user); // Set user info
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate('/login');
//       }
//     }
//   };

//   // Get All Travel Stories
//   const getAllTravelStories = async () => {
//     try {
//       const response = await axiosInstance.get('/get-all-travel-stories');
//       if (response.data && response.data.stories) {
//         setAllStories(response.data.stories); // Set all stories
//       }
//     } catch (error) {
//       console.log('An unexpected error occurred. Please try again.');
//     }
//   };

//   // Update Favourite Status
//   const updateIsFavourite = async (storyData) => {
//     const storyId = storyData._id;

//     try {
//       const response = await axiosInstance.put(`/update-is-favourite/${storyId}`, {
//         isFavourite: !storyData.isFavourite,
//       });

//       if (response.data && response.data.story) {
//         toast.success("Story successfully updated");
//         getAllTravelStories(); // Refresh the list of stories
//       }
//     } catch (error) {
//       console.log('An unexpected error occurred. Please try again.');
//     }
//   };

//   // Handle Edit (Open the modal with the current story's data)
//   const handleEdit = (story) => {
//     setOpenAddEditModal({
//       isShown: true,
//       type: "edit",
//       data: story, // Pass the story data to the modal for editing
//     });
//   };

//   // Handle View Story (Placeholder)
//   const handleViewStory = (story) => {
//     console.log('View story:', story);
//   };

//   // Fetch user info and stories on component mount
//   useEffect(() => {
//     getUserInfo();
//     getAllTravelStories();
//   }, []);

//   return (
//     <div>
//       {/* Pass user info to Navbar */}
//       <Navbar userInfo={userInfo} />

//       {/* Main Container */}
//       <div className="container mx-auto py-10">
//         {allStories.length > 0 ? (
//           <div className="grid grid-cols-3 gap-4">
//             {allStories.map((story, index) => (
//               <TravelStoryCard
//                 key={index}
//                 title={story.title}
//                 imageUrl={story.imageUrl}
//                 createdOn={story.createdOn}
//                 story={story.story}
//                 visitedDate={story.visitedDate}
//                 visitedLocation={story.visitedLocation}
//                 isFavourite={story.isFavourite}
//                 onEdit={() => handleEdit(story)} // Trigger edit when clicked
//                 onClick={() => handleViewStory(story)}
//                 onFavouriteClick={() => updateIsFavourite(story)}
//               />
//             ))}
//           </div>
//         ) : (
//           <p>No travel stories found.</p>
//         )}
//       </div>

//       {/* Add Travel Story Button */}
//       <button
//         className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
//         onClick={() => {
//           setOpenAddEditModal({ isShown: true, type: "add", data: null });
//         }}
//       >
//         <MdAdd className="text-[32px] text-white" />
//       </button>

//       {/* Modal for adding/editing a travel story */}
//       <Modal
//         isOpen={openAddEditModal.isShown}
//         onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.2)",
//             zIndex: 999,
//           },
//         }}
//         appElement={document.getElementById("root")}
//         className="model-box"
//       >
//         <AddEditTravelStory
//           type={openAddEditModal.type} // Pass the type (add/edit)
//           storyData={openAddEditModal.data} // Pass the data for editing
//           onClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })} // Close the modal
//         />
//       </Modal>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Home;


// // import React, { useState, useEffect } from 'react';
// // import Navbar from '../../component/Navbar';
// // import TravelStoryCard from '../../component/cards/TravelStoryCard';
// // import { useNavigate } from 'react-router-dom';
// // import axiosInstance from '../../utils/axiosinstance'; // Ensure axiosInstance is correctly set up
// // import {ToastContainer,toast} from 'react-toastify';
// // import "react-toastify/dist/ReactToastify.css";

// // function Home() {
// //   const navigate = useNavigate();
// //   const [userInfo, setUserInfo] = useState(null);
// //   const [allStories, setAllStories] = useState([]); // State for all travel stories
// //   const [openAddEditModal, setOpenAddEditModal] = useState({
// //     isShown: false,
// //     type: "add",
// //     data: null,
// //   });
  
// //   // Get User Info
// //   const getUserInfo = async () => {
// //     try {
// //       const response = await axiosInstance.get('/get-user');
// //       if (response.data && response.data.user) {
// //         setUserInfo(response.data.user); // Set user info
// //       }
// //     } catch (error) {
// //       if (error.response && error.response.status === 401) {
// //         localStorage.clear(); // Clear local storage if unauthorized
// //         navigate('/login'); // Redirect to login
// //       }
// //     }
// //   };

// //   // Get All Travel Stories
// //   const getAllTravelStories = async () => {
// //     try {
// //       const response = await axiosInstance.get('/get-all-travel-stories');
// //       if (response.data && response.data.stories) {
// //         setAllStories(response.data.stories); // Set all stories
// //       }
// //     } catch (error) {
// //       console.log('An unexpected error occurred. Please try again.');
// //     }
// //   };

// //   // Update Favourite Status
// //   const updateIsFavourite = async (storyData) => {
// //     const storyId = storyData._id;

// //     try {
// //       const response = await axiosInstance.put(/update-is-favourite/${storyId}, {
        
// //         isFavourite: !storyData.isFavourite,
// //       });

// //       if (response.data && response.data.story) {
// //         toast.success("story successfully updated");
// //         console.log('Story Updated Successfully');
// //         getAllTravelStories(); // Refresh the list of stories
// //       }
// //     } catch (error) {
// //       console.log('An unexpected error occurred. Please try again.');
// //     }
// //   };

// //   // Handle Edit (Placeholder)
// //   const handleEdit = (story) => {
// //     console.log('Edit story:', story);
// //   };

// //   // Handle View Story (Placeholder)
// //   const handleViewStory = (story) => {
// //     console.log('View story:', story);
// //   };

// //   console.log(allStories.map((s) => s.visitedDate));


// //   // Fetch user info and stories on component mount
// //   useEffect(() => {
// //     getUserInfo();
// //     getAllTravelStories();
// //   }, []);

// //   return (
// //     <div>
// //       {/* Pass user info to Navbar */}
// //       <Navbar userInfo={userInfo} />
// //       {/* Main Container */}
      
// //       <div className="container mx-auto py-10">
// //         {allStories.length > 0 ? (
// //           <div className="grid grid-cols-3 gap-4">
           
           
// //             {allStories.map((story, index) => (
// //         <TravelStoryCard  key={index}
// //         title={story.title}
// //         imageUrl={story.imageUrl}
// //         createdOn={story.createdOn}
// //         story={story.story}
// //         visitedDate={story.visitedDate}
// //         visitedLocation={story.visitedLocation}
// //         isFavourite={story.isFavourite}
// //         onEdit={() => handleEdit(story)}
// //         onClick={() => handleViewStory(story)}
// //         onFavouriteClick={() => updateIsFavourite(story)}
// //         />
// //       ))}
// //           </div>
// //         ) : (
// //           <p>No travel stories found.</p>
// //         )}
// //       </div>
// //       <ToastContainer></ToastContainer>

// //     </div>
    
// //   );
// // }

// // export default Home;

// import React, { useState, useEffect } from 'react';
// import Navbar from '../../component/Navbar';
// import TravelStoryCard from '../../component/cards/TravelStoryCard';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosinstance'; // Ensure axiosInstance is correctly set up
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import Modal from 'react-modal';
// import AddEditTravelStory from './AddEditTravelStory';  // Import the AddEditTravelStory component

// Modal.setAppElement('#root');

// function Home() {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [allStories, setAllStories] = useState([]);
//   const [openAddEditModal, setOpenAddEditModal] = useState({
//     isShown: false,
//     type: "add",
//     data: null,
//   });

//   // Get User Info
//   const getUserInfo = async () => {
//     try {
//       const response = await axiosInstance.get('/get-user');
//       if (response.data && response.data.user) {
//         setUserInfo(response.data.user);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         localStorage.clear();
//         navigate('/login');
//       }
//     }
//   };

//   // Get All Travel Stories
//   const getAllTravelStories = async () => {
//     try {
//       const response = await axiosInstance.get('/get-all-travel-stories');
//       if (response.data && response.data.stories) {
//         setAllStories(response.data.stories);
//       }
//     } catch (error) {
//       console.log('An unexpected error occurred. Please try again.');
//     }
//   };

//   // Update Favourite Status
//   const updateIsFavourite = async (storyData) => {
//     const storyId = storyData._id;

//     try {
//       const response = await axiosInstance.put(/update-is-favourite/${storyId}, {
//         isFavourite: !storyData.isFavourite,
//       });

//       if (response.data && response.data.story) {
//         toast.success("Story successfully updated");
//         getAllTravelStories();
//       }
//     } catch (error) {
//       console.log('An unexpected error occurred. Please try again.');
//     }
//   };

//   // Handle Edit
//   const handleEdit = (story) => {
//     setOpenAddEditModal({ isShown: true, type: 'edit', data: story });
//   };

//   // Handle View Story
//   const handleViewStory = (story) => {
//     console.log('View story:', story);
//   };

//   useEffect(() => {
//     getUserInfo();
//     getAllTravelStories();
//   }, []);

//   return (
//     <div>
//       <Navbar userInfo={userInfo} />
//       <div className="container mx-auto py-10">
//         {allStories.length > 0 ? (
//           <div className="grid grid-cols-3 gap-4">
//             {allStories.map((story, index) => (
//               <TravelStoryCard
//                 key={index}
//                 title={story.title}
//                 imageUrl={story.imageUrl}
//                 createdOn={story.createdOn}
//                 story={story.story}
//                 visitedDate={story.visitedDate}
//                 visitedLocation={story.visitedLocation}
//                 isFavourite={story.isFavourite}
//                 onEdit={() => handleEdit(story)}
//                 onClick={() => handleViewStory(story)}
//                 onFavouriteClick={() => updateIsFavourite(story)}
//               />
//             ))}
//           </div>
//         ) : (
//           <p>No travel stories found.</p>
//         )}
//       </div>

//       {/* Add/Edit Modal */}
//       <Modal
//         isOpen={openAddEditModal.isShown}
//         onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
//         style={{
//           overlay: {
//             backgroundColor: "rgba(0,0,0,0.2)",
//             zIndex: 999,
//           },
//         }}
//       >
//         <AddEditTravelStory
//           type={openAddEditModal.type}
//           data={openAddEditModal.data}
//           onClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
//           onSave={getAllTravelStories}  // Fetch updated stories
//         />
//       </Modal>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import Navbar from '../../component/Navbar';
import TravelStoryCard from '../../component/cards/TravelStoryCard';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import ViewTravelStory from './ViewTravelStory';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-modal'; // Add the Modal import
import EmptyCard from '../../component/cards/EmptyCard';
import { DayPicker } from 'react-day-picker';
import AddEditTravelStory from './AddEditTravelStory'; // Make sure the path is correct
import { MdAdd } from 'react-icons/md'; // Add the MdAdd icon import
import EmptyImg from"../../assets/images/add-story.svg";

function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  // const [openViewModal,setOpenViewModal]=useState({
  //   isShown:false,
  //   data:null,
  // });

  const [openViewModal, setOpenViewModal] = useState({
    isShown: false,
    data: null,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState('');

  const [dateRange, setDateRange]=useState({ form: null, to: null })
  

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      if (response.data && response.data.user) {
        setUserInfo(response.data.user); // Set user info
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  // Get All Travel Stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get('/get-all-travel-stories');
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories); // Set all stories
      }
    } catch (error) {
      console.log('An unexpected error occurred. Please try again.');
    }
  };
  console.log("Printing the all urls");
  console.log(allStories.map((s) => s.imageUrl));

  // Update Favourite Status
  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;

    try {
      const response = await axiosInstance.put(`/update-is-favourite/${storyId}`, {
        isFavourite: !storyData.isFavourite,
      });

      if (response.data && response.data.story) {
        toast.success("Story successfully updated");
        getAllTravelStories(); // Refresh the list of stories
      }
    } catch (error) {
      console.log('An unexpected error occurred. Please try again.');
    }
  };

  // Delete Story
const deleteTravelStory = async (data) => {
  const storyId = data._id;

  try {
    const response = await axiosInstance.delete("/delete-story/" + storyId);

    if (response.data && !response.data.error) {
      toast.error("Story Deleted Successfully");
      setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
      getAllTravelStories();
    }
  } catch (error) {
    // Handle unexpected errors
    console.log("An unexpected error occurred. Please try again.");
  }
};


  // Handle Edit (Open the modal with the current story's data)
  const handleEdit = (data) => {
  console.log("Data being passed to the modal:", data); // Log the data before setting the state
  setOpenAddEditModal({
    isShown: true,
    type: "edit",
    data: data,
  });
};


  // Handle View Story (Placeholder)
  const handleViewStory = (data) => {
    setOpenViewModal({isShown:true , data})
  };


  // Search Story
const onSearchStory = async (query) => {
  console.log(query)
  try {
    const response = await axiosInstance.get("/search", {
      params: {
        query,
      },
    });

    console.log(response.data)
    if (response.data && response.data.stories) {
      setFilterType("search");
      setAllStories(response.data.stories);
    }
  } catch (error) {
    // Handle unexpected errors
    console.log("An unexpected error occurred. Please try again.");
  }
};

const handleClearSearch = () => {
  setFilterType("");
  getAllTravelStories();
};

//handle filter Travel story by date range 
const filterStoriesByDate = async (day) => {
  try {
    const startDate = day.from ? moment(day.from).valueOf() : null;
    const endDate = day.to ? moment(day.to).valueOf() : null;

    if (startDate && endDate) {
      const response = await axiosInstance.get("/travel-stories/filter", {
        params: { startDate, endDate },
      });

      if (response.data && response.data.stories) {
        setFilterType("date");
        setAllStories(response.data.stories);
      }
    }
  } catch (error) {
    console.log("An unexpected error occurred. Please try again.");
  }
};


//Handle Date Range Select
const handleDayClick=(day)=>{
  setDateRange(day);
  filterStoriesByDate(day);
}

  // Fetch user info and stories on component mount
  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);

   console.log(openAddEditModal.data);

  return (
    <div>
      {/* Pass user info to Navbar */}
      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className='container mx-auto py-10'>
        <div className='flex-gap-7'>
                {/* Main Container */}
      <div className="container mx-auto py-10">
        {allStories.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {allStories.map((story, index) => (
              <TravelStoryCard
                key={index}
                title={story.title}
                imageUrl={story.imageUrl}
                createdOn={story.createdOn}
                story={story.story}
                visitedDate={story.visitedDate}
                visitedLocation={story.visitedLocation}
                isFavourite={story.isFavourite}
                onEdit={() => handleEdit(story)} // Trigger edit when clicked
                onClick={() => handleViewStory(story)}
                onFavouriteClick={() => updateIsFavourite(story)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard imgSrc={EmptyImg} message={`Start creating your first Travel Story! Click the 'Add' button 
            to jot down your thoughts, ideas, and memories. Let's get started `}></EmptyCard>
        )}
      </div>

      <div className="w-[340px]">
        <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
          <div className="p-3">
            <DayPicker
              captionLayout="dropdown-buttons"
              mode="range"
              selected={dateRange} 
              onSelect={handleDayClick}
              pagedNavigation
            />
          </div>
        </div>
      </div>
        </div>
      </div>



      {/* Add Travel Story Button */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* Modal for adding/editing a travel story */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
      
        <AddEditTravelStory
          type={openAddEditModal.type} // Pass the type (add/edit)
          storyInfo={openAddEditModal.data} // Pass the data for editing
          onClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })} // Close the modal
        />
      </Modal>

        {/* View Travel story Modal */}
      <Modal
        isOpen={openViewModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ ...openAddEditModal, isShown: false })}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="model-box"
      >
        <ViewTravelStory
          // type={openViewModal.type}
          storyInfo={openViewModal.data || null} 
          onClose={() => {
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
          }}
          
          onEditClick={()=>{
            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }));
            handleEdit(openViewModal.data || null)
          }}
          onDeleteClick={()=>{
            deleteTravelStory(openViewModal.data || null);
          }}

        />
      </Modal>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </div>
  );
}

export default Home;
