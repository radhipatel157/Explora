// import React, { useState } from "react";
// import { MdAdd, MdUpdate, MdClose } from "react-icons/md";
// import DateSelector from "../../component/input/DateSelector";
// import ImageSelector from "../../component/input/ImageSelector";
// import TagInput from "../../component/input/TagInput";
// import axiosInstance from "../../utils/axiosinstance";
// import moment from "moment";
// import uploadImage from "../../utils/uploadImage";
// import { toast } from "react-toastify";

// const AddEditTravelStory = ({
//   storyInfo,
//   type,
//   onClose,
//   getAllTravelStories,
// }) => {
//   const [title, setTitle] = useState(storyInfo?.title || "");
//   const [storyImg, setStoryImg] = useState(null);
//   const [story, setStory] = useState(storyInfo?.story || "");
//   const [visitedLocation, setVisitedLocation] = useState(
//     storyInfo?.visitedLocation || []
//   );
//   const [visitedDate, setVisitedDate] = useState(
//     storyInfo?.visitedDate ? moment(storyInfo.visitedDate) : null
//   );
//   const [error, setError] = useState("");

//   // Common function for add/update
//   const handleSaveTravelStory = async () => {
//     if (!title || !story) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     let imageUrl = storyInfo?.imageUrl || "";

//     try {
//       // Upload image if a new file is provided
//       if (storyImg && typeof storyImg === "object") {
//         const imgUploadRes = await uploadImage(storyImg);
//         imageUrl = imgUploadRes.imageUrl || "";
//       }

//       const postData = {
//         title,
//         story,
//         imageUrl,
//         visitedLocation,
//         visitedDate: visitedDate
//           ? moment(visitedDate).valueOf()
//           : moment().valueOf(),
//       };

//       if (type === "add") {
//         await axiosInstance.post("/add-travel-story", postData);
//         toast.success("Story Added Successfully");
//       } else {
//         await axiosInstance.put(`/edit-story/${storyInfo._id}`, postData);
//         toast.success("Story Updated Successfully");
//       }

//       getAllTravelStories();
//       onClose();
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "An unexpected error occurred. Please try again."
//       );
//     }
//   };

//   const handleDeleteImage = async () => {
//     try {
//       await axiosInstance.delete("/delete-image", {
//         params: { imageUrl: storyInfo.imageUrl },
//       });
//       setStoryImg(null);
//       toast.info("Image deleted successfully");
//     } catch {
//       toast.error("Failed to delete image");
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between">
//         <h5 className="text-xl font-medium text-slate-700">
//           {type === "add" ? "Add Story" : "Update Story"}
//         </h5>
//         <div>
//           <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-lg">
//             <button className="btn-small" onClick={handleSaveTravelStory}>
//               {type === "add" ? (
//                 <>
//                   <MdAdd className="text-lg" /> ADD STORY
//                 </>
//               ) : (
//                 <>
//                   <MdUpdate className="text-lg" /> UPDATE STORY
//                 </>
//               )}
//             </button>
//             <button className="" onClick={onClose}>
//               <MdClose className="text-xl text-slate-400" />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col gap-4 pt-4">
//         <label className="input-label">TITLE</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="text-2xl text-slate-950 outline-none"
//           placeholder="A Day at the Great Wall"
//         />

//         <label className="input-label">STORY</label>
//         <textarea
//           value={story}
//           onChange={(e) => setStory(e.target.value)}
//           rows="4"
//           className="text-lg outline-none"
//           placeholder="Write about your experience..."
//         />

//         <ImageSelector
//           image={storyImg || storyInfo?.imageUrl}
//           setImage={setStoryImg}
//           handleDeleteImg={handleDeleteImage}
//         />

//         <label className="input-label">VISITED DATE</label>
//         <DateSelector
//           selectedDate={visitedDate}
//           setSelectedDate={setVisitedDate}
//         />

//         <label className="input-label">VISITED LOCATIONS</label>
//         <TagInput
//           tags={visitedLocation}
//           setTags={setVisitedLocation}
//           placeholder="Add locations..."
//         />

//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default AddEditTravelStory;



import React, { useState, useEffect } from "react";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import DateSelector from "../../component/input/DateSelector";
import ImageSelector from "../../component/input/ImageSelector";
import TagInput from "../../component/input/TagInput";
import axiosInstance from "../../utils/axiosinstance";
import moment from "moment";
import uploadImage from "../../utils/uploadImage";
import { toast } from "react-toastify";

const AddEditTravelStory = ({ storyInfo, type, onClose, getAllTravelStories }) => {
    console.log(storyInfo?.title);
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate ? moment(storyInfo.visitedDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"));
  const [error, setError] = useState("");

  // Add new travel story
  const addNewTravelStory = async () => {
    try {
      let imageUrl = "";

      // Upload image if present
      if (storyImg && typeof storyImg === "object") {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/add-travel-story", {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success("Story Added Successfully");
        // Directly update the parent component with the new story
        getAllTravelStories((prevStories) => [...prevStories, response.data.story]); // Update the state directly
        // Close modal or form
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Update travel story
  const updateTravelStory=async()=>{

    const storyId=storyInfo._id;

    try {
        let imageUrl = "";
      
        let postData={
            
                title,
                story,
                imageUrl: storyInfo.imageUrl || "",
                visitedLocation,
                visitedDate: visitedDate
                  ? moment(visitedDate).valueOf()
                  : moment().valueOf(),
        };
        // Upload image if present
        if (typeof storyImg === "object") {
            // Upload New Image
            const imgUploadRes = await uploadImage(storyImg);
            imageUrl = imgUploadRes.imageUrl || "";
          }
          
          postData = {
            ...postData,
            imageUrl: imageUrl,
          };
          
          const response = await axiosInstance.put(`/edit-story/${storyId}`, postData);
      
        if (response.data && response.data.story) {
          toast.success("Story Added Successfully");
          // Refresh stories
          getAllTravelStories();
          // Close modal or form
          onClose();
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          // Handle unexpected errors
          setError("An unexpected error occurred. Please try again.");
      }
}
}


  // Handle add or update click
  const handleAddOrUpdateClick = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!story) {
      setError("Please enter the story");
      return;
    }

    setError("");

    if (type === "edit") {
      updateTravelStory();
      
    } else {
      addNewTravelStory();
    }
  };

  // Handle delete image
  const handleDeleteStoryImg = async () => {
    if (storyInfo.imageUrl) {
      const deleteImgRes = await axiosInstance.delete("/delete-image", {
        params: { imageUrl: storyInfo.imageUrl },
      });

      if (deleteImgRes.data) {
        const storyId = storyInfo._id;

        const postData = {
          title,
          story,
          visitedLocation,
          visitedDate: moment().valueOf(),
          imageUrl: "",
        };

        // Updating story
        await axiosInstance.put(`/edit-story/${storyId}`, postData);
        setStoryImg(null);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium text-slate-700">
            {type === "add" ? "Add Story" : "Update Story"}
          </h5>
        </div>

        <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-lg">
          {type === "add" ? (
            <button className="btn-small" onClick={handleAddOrUpdateClick}>
              <MdAdd className="text-lg" /> ADD STORY
            </button>
          ) : (
            <button className="btn-small" onClick={handleAddOrUpdateClick}>
              <MdUpdate className="text-lg" /> UPDATE STORY
            </button>
          )}
          <button className="" onClick={onClose}>
            <MdClose className="text-xl text-slate-400" />
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
        )}
      </div>

      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">TITLE</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="A Day at the Great Wall"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImg={handleDeleteStoryImg}
          />
          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">STORY</label>
            <textarea
              type="text"
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              placeholder="Your Story"
              rows={10}
              value={story}
              onChange={({ target }) => setStory(target.value)}
            />
          </div>

          <div className="pt-3">
            <label className="input-label">VISITED LOCATIONS</label>
            <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;

