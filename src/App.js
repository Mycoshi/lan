import React, { useState } from 'react';
import './App.css';
//import handleupload from './logic/upload'


import logo from './assets/lanlogo.png';
import { FaUpload } from 'react-icons/fa'

import Homepage from './components/homepage/Homepage.js'

function App() {

//UPLOAD METHOD CURRENTLY ONLY MAPS TITLE
const [fileData, setFileData] = useState([]) 
const handleUpload = (event) => {
  const files = event.target.files;
  const fileData = [];

  for ( let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      const file=files[i];

      reader.onload = (e) => {
          const fileTitle = file.webkitRelativePath.split('/')[0];
          const filePath = e.target.result;

          fileData.push({ fileTitle, filePath });

          if (fileData.length === files.length) {
              setFileData(fileTitle)
              console.log(fileData);
          }
  }
  reader.readAsDataURL(file);
}
}

  return (
    <div className="App">
      <header className="App-header">

            <nav className='Nav'>
                <img className='navlogo' src={logo}/>
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

          <Homepage fileData={fileData} />

      </header>
    </div>
  );
}

export default App;
