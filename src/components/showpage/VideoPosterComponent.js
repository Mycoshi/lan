import React, { useEffect, useRef } from 'react';

const VideoPosterComponent = ({ base64VideoData, timeInSeconds }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = base64VideoData;

    video.addEventListener('loadeddata', () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Seek to the desired time
      video.currentTime = timeInSeconds;

      // Capture the current frame and draw it on the canvas
      video.addEventListener('seeked', () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas content to a base64-encoded image
        const base64ImageData = canvas.toDataURL('image/png');

        // Set the base64-encoded image as the source of the image element
        imageRef.current.src = base64ImageData;
      });
    });
;
  }, [base64VideoData, timeInSeconds]);

  return (
    <div>
      <canvas ref={canvasRef} width="240" height="120" style={{ display: 'none' }}></canvas>
      <img ref={imageRef} width="240" height="120" alt="Video Poster" />
    </div>
  );
};

export default VideoPosterComponent;