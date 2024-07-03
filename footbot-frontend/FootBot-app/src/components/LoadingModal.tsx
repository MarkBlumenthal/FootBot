// footbot-frontend/FootBot-app/src/components/LoadingModal.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface LoadingModalProps {
  show: boolean;
  handleClose: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Loading Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Sorry, but it is taking a little longer to load all the data. Please be patient for 15-20 seconds.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoadingModal;
