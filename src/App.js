import React, { useState, useEffect } from 'react';
import './App.css';


import logo from './assets/lanlogo.png';
import { FaUpload } from 'react-icons/fa'

import Homepage from './components/homepage/Homepage.js'
import Showpage from './components/showpage/ShowPage.js'
import Playerpage from './components/playerpage/PlayerPage.js'
import SeasonPage from './components/seasonpage/SeasonPage.js'

function App() {


//Page Render Method smart people would use context, we're not smart.
const [isCurrentPage, setIsCurrentPage] = useState(1);
const [isFilePath, setIsFilePath] = useState(null);
const [fileArray, setFileArray] = useState([]);
const [currentFileArray, setCurrentFileArray] = useState(null);
const [movieArray, setMovieArray] = useState([]);
const [fileIndex, setFileIndex] = useState(0);
const [searchTerm, setSearchTerm] = useState('');
const titlesArray = [];
const [filteredTitles, setFilteredTitles] = useState(null);


const pageChangeHandler = (newState) => {
  setIsCurrentPage(newState);
}
const currentFileArrayChangeHandler = (newState) => {
  setCurrentFileArray(newState)
}
// THIS IS A HACKY SORT AND SHOULD BE ADDRESSED WHEN REAL SORTS ARE IMPLENMENTED THIS WILL BUG OUT IF FILENAMES HAVE OTHER NUMBERS PROLLY
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

// converting to async added some speed, idk if it stopped the hangs from memory overflow

// it didnt and it turns out when we monitored performance it was actually cpu that bottlednecked so its more then likely having issues with the size of the load maybe try to break up the promises?

//changed it for individual uploads resolved cpu  performance but it still crashes right before upload finished. sys monitor does show a huge mem spike so we will prolly retrigger the truncater

// truncater made no difference, this process eats about 16gb of memory according to sys monitor before crashing which is nuts we will probably just have to figure out how to scrap this sooner then later an reorient the videos towards JUST the video page, while preserving the images and filepaths.

//ok here is where we stand. JS lacks the ability to seek relative pathing on local machines for secruity reasons without FileReader. FileReader + Read as URl are EXTREMLY memory intensive. Filerader apparently is creating a 'stream' of the videos to memory, to the point where probably anything beyond 75 episodes will break this, regardless of whether we learn how to learn useEffect properly.

/* so the complete file object has hope, it looks like:

File {name: '1.mp4', lastModified: 1701669988928, lastModifiedDate: Sun Dec 03 2023 23:06:28 GMT-0700 (Mountain Standard Time), webkitRelativePath: 'Lan Samples/Zombie Land Saga/1.mp4', size: 108606380, …}
lastModified
: 
1701669988928
lastModifiedDate
: 
Sun Dec 03 2023 23:06:28 GMT-0700 (Mountain Standard Time) {}
name
: 
"1.mp4"
size
: 
108606380
type
: 
"video/mp4"
webkitRelativePath
: 
"Lan Samples/Zombie Land Saga/1.mp4" 
*/

// With webkitRelativePath we should be able to extract pathing and whether its an image before involving the reader and then target the reader SOLELY on what the component needs. This also gives us a lot of other objects to use in the future.

//think about building a reusable filereader to pass down 


const handleUpload = async (event) => {
  const files = event.target.files;
  const reader = new FileReader()
  const processFile = (file) => {
    return new Promise((resolve, reject) => {
      const fileType = file.type;
      const depthMap = file.webkitRelativePath.split('/');
      const depth = depthMap.length;
      const folderTitle = file.webkitRelativePath.split('/')[1];
      const fileName = depthMap[depthMap.length - 1];
      const filePath = file.webkitRelativePath;
      const fileData = null

      if (!titlesArray.includes(folderTitle)) {
        titlesArray.push(folderTitle);
        let newarray = [folderTitle];
        fileArray.push(newarray);
      }

      for (let j = 0; j < fileArray.length; j++) {
   

        if (folderTitle === fileArray[j][0]) {
          fileArray[j].push({depth, fileType, fileName, filePath, folderTitle});
          break;
        }
        if (fileType.includes('image')) {

          reader.onload = (e) => {
            const Data = e.target.result
            reader.onerror = (error) => {
              reject(error);
              console.log('lost photo')
            };
            fileArray[j].push(Data)
          }
          reader.readAsDataURL(file);
          break;
        }        


      }




      resolve();
    });
  };
  for (let i = 0; i < files.length; i++) {
    try {
      await processFile(files[i]);
    } catch (error) {
    }
  }

  console.log('Async file processing completed');
};

// Search function for nav
const handleSearch = (event) => {
  const searchTerm = event.target.value;
  setSearchTerm(searchTerm);

  // Filter the titlesArray based on the search term
  const filteredTitles = fileArray.filter((array) =>
    array[0].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update the state with the filtered titles
  setFilteredTitles(filteredTitles);
};

  return (
    <div className="App">
      <header className="App-header">

            <nav className='Nav'>
                <img className='navlogo' alt='Logo' src={logo} onClick={() => pageChangeHandler(1)}/>

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

 
                <input
                  className='Search'
                  type='search'
                  placeholder='Search titles'
                  value={searchTerm}
                  onChange={handleSearch}
                  />
            </nav>
            <button onClick = {() => (console.log(fileArray))}>Data</button>

          {isCurrentPage === 1 && <Homepage
           currentFileArray={currentFileArray}
           fileArray={fileArray}
           folderTitles={folderTitle}
           filteredTitles={filteredTitles}
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
