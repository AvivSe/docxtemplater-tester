import React, { useState } from 'react';

function _useFiles() {
  const [files, setFiles] = useState([]);

  return {
    set: setFiles,
    list: files,
  };
}
const FilesContext = React.createContext(null);

export function ProvideUseFiles({ children }) {
  return (
    <FilesContext.Provider value={_useFiles()}>
      {children}
    </FilesContext.Provider>
  );
}

const useFiles = () => React.useContext(FilesContext);
export default useFiles;
