import { createPortal } from 'react-dom';

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h3 id="modal-title" className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
            aria-label="Cancel action"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger"
            aria-label="Confirm action"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
