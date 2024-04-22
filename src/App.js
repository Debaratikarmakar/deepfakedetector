// App.js
import React, { useState,useEffect } from 'react';
import './App.css'; // Import CSS file for styling

// Functional component for the video uploader
const VideoUploader = ({ onVideoUpload }) => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  const handleVideoUpload = () => {
    onVideoUpload(videoUrl);
  };

  return (
    <div className="center">
      <div className="urlSubmitContainer">
        <input className="inputField" type="url" placeholder="Enter video URL" value={videoUrl} onChange={handleVideoUrlChange} />
        <button className="submitButton" onClick={handleVideoUpload}>Submit</button>
      </div>
    </div>
  );
};

// Functional component for the start button
const StartButton = ({ onClick }) => {
  return (
    <button className="startButton" onClick={onClick}>Start</button>
  );
};

// Functional component for the video processor
const VideoProcessor = ({ videoUrl }) => {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const processVideo = async () => {
    setResult(null); // Reset result state
    setProcessing(true);
  
    try {
      // Call your deepfake detection API here with the video URL
      const detectionResult = await detectDeepfake(videoUrl);
      setResult(detectionResult);
    } catch (error) {
      console.error('Error detecting deepfake:', error);
      setResult('Error');
    }

    setProcessing(false);
  };

  const detectDeepfake = async (videoUrl) => {
    // Simulate calling an API to detect deepfake
    // You should replace this with actual API call to your deepfake detection service
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulating whether video is original or fake
        const isOriginal = Math.random() < 0.5;
        resolve(isOriginal ? 'Original' : 'Fake');
      }, 5000); // Simulating longer processing time for video
    });
  };

  useEffect(()=>{
    const overlay = document.createElement("div");
    overlay.innerHTML = `
    <div  style="z-index: 1000; position: absolute; top: 20px; left: 20px; background-color: rgba(255, 255, 255, 0.8); padding: 10px;">
        <p style="color: red;">Overlay Content</p>
    </div>
    `;
    
    // Get the YouTube video container element
    const videoContainer = document.querySelector('.html5-video-player');
    
    // Append the overlay content to the video container
    if(videoContainer)
    videoContainer.appendChild(overlay);
  },[])

  return (
    <div className="center bg-red-500">
      {videoUrl && (
        <div className="videoContainer">
          <video controls autoPlay className="videoPlayer">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {videoUrl && (
        <div className="buttonAndProcessingContainer">
          <div className="buttonContainer">
            <StartButton onClick={processVideo} />
          </div>
          {processing && <div className="processingBox">Processing...</div>}
          {result && (
            <div className={result === 'Original' ? 'originalBox' : 'fakeBox'}>
              Result: {result}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Parent component
const App = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoUpload = (url) => {
    setVideoUrl(url);
  };

  return (
    <div className="app">
      <h1 className="text-red-600 font-bold text-[20px]">Fake Detection</h1>
      <VideoUploader onVideoUpload={handleVideoUpload} />
      <VideoProcessor videoUrl={videoUrl} />
    </div>
  );
};

export default App;
