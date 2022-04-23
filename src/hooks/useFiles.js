import React, { useState } from 'react';
import { useTest } from './useTest';

function _useFiles() {
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const { tested, testing } = useTest({ files });

  return {
    set: setFiles,
    list: files,
    rejectedFiles,
    setRejectedFiles,
    tested,
    testing,
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
