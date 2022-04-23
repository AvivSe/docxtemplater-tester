import useFiles from '../hooks/useFiles';
import { useEffect, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';

const Transition = forwardRef(function Transition(props, ref) {
  const { children, ...otherProps } = props;
  return <Slide direction="up" ref={ref} children={children} {...otherProps} />;
});

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  border-bottom: 1px solid #eeeeee;
`;

function RejectedFiles() {
  const { rejectedFiles } = useFiles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (rejectedFiles.length) {
      setOpen(true);
    }
  }, [rejectedFiles]);

  function handleClose() {
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
    >
      <DialogTitle>{'Rejected!'}</DialogTitle>
      <DialogContent>
        <div>
          <b>Some files not tested:</b>
        </div>
        <div>
          {rejectedFiles.map((rejection, i) => (
            <Row key={i}>
              <div>{rejection.file.path}</div>
              <div>
                {rejection.errors.map(({ message }) => message).join(', ')}
              </div>
            </Row>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>I Understand</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RejectedFiles;
