import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InputPodcast = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(false); // New loading state

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setFrontImage(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setFrontImage(file);
  };

  const handleAudioFile = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
  };

  const onChangeInputs = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const uploadToCloudinary = async (file, preset) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtgmjvfms/upload",
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      throw new Error("Failed to upload to Cloudinary");
    }
  };

  const handleSubmitPodcast = async () => {
    if (!inputs.title || !inputs.description || !inputs.category || !frontImage || !audioFile) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true); // Set loading to true when the upload starts

    try {
      // First API call: Upload files to Cloudinary
      const frontImageUrl = await uploadToCloudinary(frontImage, "imgpreset");
      const audioFileUrl = await uploadToCloudinary(audioFile, "vidpreset");

      // Second API call: Send podcast data to backend
      const podcastData = {
        ...inputs,
        frontImage: frontImageUrl,
        audioFile: audioFileUrl,
      };

      const res = await axios.post(
        "https://super-pod-backend.vercel.app/api/v1/add-podcast",
        podcastData,
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit podcast");
    } finally {
      setLoading(false); // Set loading to false when the upload is complete
      setInputs({
        title: "",
        description: "",
        category: "",
      });
      setFrontImage(null);
      setAudioFile(null);
    }
  };

  return (
    <div className="my-6 px-4 lg:px-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Create Your Podcast</h1>
      {loading ? (
        <div className="text-center mb-4">
          <p className="text-blue-500">Your podcast is being uploaded, please wait...</p>
          <div className="flex justify-center mt-2">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-4">
          For faster upload, consider uploading a smaller audio file.
        </p>
      )}
      <div className={`flex flex-col lg:flex-row gap-6 ${loading ? "opacity-50 pointer-events-none" : ""}`}>
        <div className="w-full lg:w-2/5">
          <div
            className={`h-[30vh] lg:h-[60vh] w-full flex items-center justify-center border-2 rounded-lg overflow-hidden ${
              dragging ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-gray-100"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDropImage}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept="image/*"
              id="file"
              className="hidden"
              onChange={handleChangeImage}
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              <label
                htmlFor="file"
                className="w-full h-full flex items-center justify-center cursor-pointer text-center text-lg"
              >
                Drag and Drop the Thumbnail or click to browse
              </label>
            )}
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <div className="flex flex-col mb-6">
            <label htmlFor="title" className="text-lg font-semibold mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title for your podcast"
              className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition duration-200"
              value={inputs.title}
              onChange={onChangeInputs}
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="description" className="text-lg font-semibold mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description for your podcast"
              className="px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition duration-200"
              rows={4}
              value={inputs.description}
              onChange={onChangeInputs}
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex flex-col w-full lg:w-1/2">
              <label htmlFor="audioFile" className="text-lg font-semibold mb-2">Select Audio</label>
              <input
                type="file"
                accept=".mp3,.wav,.flac,.m4a"
                id="audioFile"
                className="border border-gray-300 rounded-lg py-2 px-4"
                onChange={handleAudioFile}
              />
            </div>
            <div className="flex flex-col w-full lg:w-1/2">
              <label htmlFor="category" className="text-lg font-semibold mb-2">Select Category</label>
              <select
                name="category"
                id="category"
                className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 transition duration-200"
                value={inputs.category}
                onChange={onChangeInputs}
              >
                <option value="">Select Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Technology">Technology</option>
                <option value="Travel">Travel</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Government">Government</option>
              </select>
            </div>
          </div>
          <div className="flex">
            <button
              className="bg-green-600 text-white rounded-lg px-8 py-3 font-semibold hover:bg-gray-500 transition duration-300 w-full"
              onClick={handleSubmitPodcast}
              disabled={loading} // Disable button when loading
            >
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
