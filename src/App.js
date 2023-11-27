import React, { useState, useEffect } from 'react';
import './App.css';
//import handleupload from './logic/upload'


import logo from './assets/lanlogo.png';
import { FaUpload } from 'react-icons/fa'

import Homepage from './components/homepage/Homepage.js'
import Showpage from './components/showpage/ShowPage.js'
import Playerpage from './components/playerpage/PlayerPage.js'
import SeasonPage from './components/seasonpage/SeasonPage.js'

function App() {


//Page Render Method smart people would use context, we're not smart.
const [isCurrentPage, setIsCurrentPage] = useState(1)
const [isFilePath, setIsFilePath] = useState(null)
const [fileArray, setFileArray] = useState([])
const [currentFileArray, setCurrentFileArray] = useState(null)
const [movieArray, setMovieArray] = useState([])
const [fileIndex, setFileIndex] = useState(0)


const pageChangeHandler = (newState) => {
  setIsCurrentPage(newState);
}
const currentFileArrayChangeHandler = (newState) => {
  setCurrentFileArray(newState)
}
const movieListChangeHandler = (newState) => {
  const selectedArray = newState
  .filter( file => file.fileData && file.fileData.includes('video/mp4'))
  .sort((a, b) => {
    const extractNumber = (fileName) => {
      const match = fileName.match(/\d+/); // Extract numeric part using regex
      return match ? parseInt(match[0], 10) : 0; // Parse the numeric part as an integer
    };

    const numericPartA = extractNumber(a.fileName);
    const numericPartB = extractNumber(b.fileName);

    return numericPartA - numericPartB;
  })
  setMovieArray(selectedArray)
}

const currentFileChangeHandler = (newState) => {
  setIsFilePath(newState)
}
const fileIndexHandler = (newState) => {
  setFileIndex(newState)
}

const [folderTitle, setFolderTitle] = useState([])
const [fileImage, setFileImage] = useState(null)

const  handleUpload = async (event) => {
  const files = event.target.files;
  const titlesArray = [];

  const processFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
          const depthMap = file.webkitRelativePath.split('/')
          const depth = depthMap.length
          const folderTitle = file.webkitRelativePath.split('/')[1];
          const fileName = depthMap[depthMap.length - 1]
          const fileData = e.target.result;
          const filePath = file.webkitRelativePath

        if (!titlesArray.includes(folderTitle)) {
          titlesArray.push(folderTitle);
          let newarray = [folderTitle];
          fileArray.push(newarray);
        }

        for (let j = 0; j < fileArray.length; j++) {
          if (folderTitle === fileArray[j][0]) {
            fileArray[j].push({ folderTitle, fileName, fileData, filePath, depth }); 
            break; 
          }
          if (fileData.includes('image/jpeg')){
            setFileImage(fileData)
          }
        }
        resolve(); 
  };
  reader.onerror = (error) =>{
    reject(error);
  };
  reader.readAsDataURL(file);
});
} 

const promises = [];

for (let i = 0; i < files.length; i++) {
  promises.push(processFile(files[i]));
}
try {
  await Promise.all(promises);
  console.log('async file process completed')
  console.log(fileArray)
} catch (error) {
  console.log('Error Proccessing files', error)
}
};


  return (
    <div className="App">
      <header className="App-header">

            <nav className='Nav'>
                <img className='navlogo' alt='Logo' src={logo} onClick={() => pageChangeHandler(1)}/>
              <div className='ui-container'>

                <div className='upload-container'>
                  <label htmlFor='folderUpload'>
                    <FaUpload className='upload' />
                  </label>
                  <input
                    type='file'
                    id='folderUpload'
                    webkitdirectory='true'
                    directory='true'
                    multiple
                    onChange={handleUpload}
                  />
                </div>
 
                <input className='Search' type='search' />
              </div>
            </nav>

          {isCurrentPage === 1 && <Homepage
           currentFileArray={currentFileArray}
           fileArray={fileArray}
           folderTitles={folderTitle}
           current={pageChangeHandler}
           videoHandler={movieListChangeHandler}
           fileArrayHandler={currentFileArrayChangeHandler}
           movieArray={movieArray}
            />}
          {isCurrentPage === 2 && <Showpage
           current={pageChangeHandler}
           movieArray={movieArray}
           fileChangeHandler={currentFileChangeHandler}
           fileIndexHandler={fileIndexHandler}
            />}
          {isCurrentPage === 3 && <Playerpage
           current={pageChangeHandler}
           fileData={isFilePath}
           movieArray={movieArray}
           fileIndex={fileIndex}
            />}
            {isCurrentPage === 4 && <SeasonPage
           currentFileArray={currentFileArray}
           fileArrayHandler={currentFileArrayChangeHandler}
           fileArray={movieArray}
           folderTitles={folderTitle}
           current={pageChangeHandler}
           movieArray={movieArray}
           videoListHandler={movieListChangeHandler}
           
            />}
      </header>
    </div>
  );
}

export default App;
