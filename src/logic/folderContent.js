import React, { useState } from 'react';


//THIS IS TEMPLATE CODE TO REBUILD FOLDER STRUCTURE 

const FolderContentList = () => {
  const [folderContent, setFolderContent] = useState([]);

  const handleFolderSelect = async (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const folderEntries = organizeFilesIntoTree(files);
      setFolderContent(folderEntries);
    }
  };

  const organizeFilesIntoTree = (files) => {
    const fileTree = {};

    for (const file of files) {
      const pathParts = file.webkitRelativePath.split('/');
      let currentLevel = fileTree;

      for (const part of pathParts) {
        if (!currentLevel[part]) {
          if (pathParts.indexOf(part) === pathParts.length - 1) {
            // If it's the last part, it's a file
            currentLevel[part] = 'file';
          } else {
            // If it's not the last part, it's a folder
            currentLevel[part] = {};
          }
        }
        currentLevel = currentLevel[part];
      }
    }

    return fileTree;
  };

  const renderFileTree = (tree, level = 0) => {
    return (
      <ul style={{ paddingLeft: `${level * 20}px` }} key={level}>
        {Object.entries(tree).map(([key, value]) => (
          <li key={key}>
            {typeof value === 'object' ? (
              <React.Fragment>
                {key}
                {renderFileTree(value, level + 1)}
              </React.Fragment>
            ) : (
              key
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <input type="file" directory="" webkitdirectory="" onChange={handleFolderSelect} />
      {folderContent && (
        <div>
          <h2>Folder Content:</h2>
          {renderFileTree(folderContent)}
        </div>
      )}
    </div>
  );
};

export default FolderContentList;