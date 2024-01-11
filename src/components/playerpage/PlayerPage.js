import {React, useState, useEffect } from 'react'
import styles from './PlayerPage.module.css'
import axios from 'axios'


const PlayerPage = (props) => {
  let [fileObject, setFileObject] = useState(props.fileData)
  let movieArray = props.movieArray
  let [index, setIndex] = useState(props.fileIndex)
  let Episode = fileObject.fileName
  const [mp4Data, setMp4Data] = useState(null);

  const handleNext = () => {
    const nextIndex = index + 1
    setFileObject((prevFileData) => {
      return movieArray[nextIndex]; // Return the new state
    });
    setIndex(index + 1)
  }
  const handlePrev = () => {
    const prevIndex = index - 1
    setFileObject((prevFileData) => {
      return movieArray[prevIndex]; // Return the new state
      
    });
  }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/mp4data', {
          responseType: 'arraybuffer', // Specify responseType as 'arraybuffer' to handle binary data
        });
        // Assuming response.data is the file path received from the server
        
        setMp4Data(response.data);
      } catch (error) {
        console.error('Error fetching MP4 data:', error);
      }
    };
  
    fetchData();
  }, []);





  return (
      <div className={styles.showContainer}>
        <button onClick = {() => (console.log(mp4Data))}>Data</button>
        <video controls width="640" height="360">
        {mp4Data && (
          <source
          src={`data:video/mp4;base64,${arrayBufferToBase64(mp4Data)}`}
          type="video/mp4"
          />
        )}
        Your browser does not support the video tag.
      </video>


        <div className={styles.uiContainer}>

        {<button className={styles.button64} onClick = {handleNext}>Next Episode</button>}
        
        <h2>{Episode}</h2>

        {<button className={styles.button64} onClick = {handlePrev}>Previous Episode</button>}
        </div>
      </div>
  )
}

// Function to convert ArrayBuffer to base64
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export default PlayerPage;