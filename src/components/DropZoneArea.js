import styled from 'styled-components';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useFiles from '../hooks/useFiles';

const BorderedBox = styled.div`
  width: 100%;
  height: 6rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #f8f8f8;
  border: 1px #b7b7b7 dashed;
  color: #b7b7b7;

  text-transform: uppercase;
  font-weight: bold;

  :hover {
    background-color: #f6f6f6;
    border: 1px #a181ff dashed;
    color: #989898;
  }
`;

function DropZoneArea() {
  const files = useFiles();

  const onDrop = useCallback(
    (acceptedFiles) => {
      files.set(acceptedFiles);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.docx',
  });

  return (
    <BorderedBox {...getRootProps()} isDragActive={isDragActive}>
      <input {...getInputProps()} />
      {isDragActive
        ? 'Drop templates here'
        : 'Drag&Drop template files here...'}
    </BorderedBox>
  );
}

export default DropZoneArea;
