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

const  handleUpload = (event) => {
  const files = event.target.files;
  const titlesArray = [];


  for ( let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file=files[i];
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
  }
  reader.readAsDataURL(file);
}
} 


  return (
    <div className="App">
      <header className="App-header">

            <nav className='Nav'>
                <img className='navlogo' src={logo} onClick={() => pageChangeHandler(1)}/>
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
           videoListHandler={movieListChangeHandler}
           
            />}
      </header>
    </div>
  );
}

export default App;
