import React, { useState, useEffect } from 'react';
import './App.css';
//import handleupload from './logic/upload'


import logo from './assets/lanlogo.png';
import { FaUpload } from 'react-icons/fa'

import Homepage from './components/homepage/Homepage.js'
import Showpage from './components/showpage/ShowPage.js'
import Playerpage from './components/playerpage/PlayerPage.js'

function App() {


//Page Render Method smart people would use context, we're not smart.
const [isCurrentPage, setIsCurrentPage] = useState(1)
const [isFilePath, setIsFilePath] = useState(null)
const [fileArray, setFileArray] = useState([])
const [movieArray, setMovieArray] = useState([])
const [fileIndex, setFileIndex] = useState(0)


const pageChangeHandler = (newState) => {
  setIsCurrentPage(newState);
  console.log(isCurrentPage);
}
const videoChangeHandler = (newState) => {
  setIsFilePath(newState);
  console.log(isFilePath);
  setMovieArray(fileArray.filter((file) => file.filePath.includes('video/mp4')));
}
const fileIndexHandler = (newState) => {
  setFileIndex(newState)
  console.log(fileIndex)
}

const [folderTitle, setFolderTitle] = useState([])
const [fileImage, setFileImage] = useState(null)
const [filePath, setFilePath] = useState('')

const  handleUpload = (event) => {
  const files = event.target.files;
  const fileData = [];
  const titlesArray = [];


  for ( let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file=files[i];

      reader.onload = (e) => {
          const folderTitle = file.webkitRelativePath.split('/')[1];
          const fileName = file.webkitRelativePath.split('/')[2];
          const filePath = e.target.result;
        
        if (!titlesArray.includes(folderTitle)) {
          titlesArray.push(folderTitle);
          let newarray = [folderTitle];
          fileArray.push(newarray);
        }

        fileData.push({ folderTitle, filePath, fileName})
        console.log(fileArray[0])



          if (fileData.length === files.length) {

              setFolderTitle(folderTitle)

              const jpegFiles = fileData.filter((file) => file.filePath.includes('image/jpeg'));
              
              if (jpegFiles.length > 0) {
                setFileImage(jpegFiles[0].filePath)
          }
        }
  }
  reader.readAsDataURL(file);
}
setFileArray(fileData)
console.log(fileArray)
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
           folderTitle={folderTitle}
           current={pageChangeHandler}
           img={fileImage}
            />}
          {isCurrentPage === 2 && <Showpage
           current={pageChangeHandler}
           fileArray={fileArray}
           videoHandler={videoChangeHandler}
           fileIndexHandler={fileIndexHandler}
            />}
          {isCurrentPage === 3 && <Playerpage
           current={pageChangeHandler}
           filePath={isFilePath}
           movieArray={movieArray}
           fileIndex={fileIndex}
            />}
      </header>
    </div>
  );
}

export default App;
