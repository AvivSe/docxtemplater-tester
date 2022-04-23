import styled from 'styled-components';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useFiles from '../hooks/useFiles';

const BorderedBox = styled.div`
  width: 100%;
  height: ${({ initialState }) => (initialState ? '100vh' : '15vh')};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #f8f8f8;
  color: #b7b7b7;

  text-transform: uppercase;
  font-weight: bold;

  :hover {
    color: #989898;
  }
`;

function DropZoneArea() {
  const files = useFiles();

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      files.set(acceptedFiles);
      files.setRejectedFiles(fileRejections);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.docx',
  });

  return (
    <BorderedBox {...getRootProps()} initialState={!files.list.length}>
      <input {...getInputProps()} />
      {isDragActive
        ? 'Drop templates here'
        : 'Drag&Drop template files here...'}
    </BorderedBox>
  );
}

export default DropZoneArea;
