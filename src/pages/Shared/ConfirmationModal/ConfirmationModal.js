import React from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

const ConfirmationModal = ({ modalData, closeModal, successModal }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <RiErrorWarningLine style={{ color: '#f8bb86' }} className='text-8xl mx-auto'></RiErrorWarningLine>
                    <h3 className="font-semibold text-4xl text-center">Are you sure?</h3>
                    <p className="pt-4 text-center text-xl font-medium">{modalData.name || modalData.toolName}</p>
                    <p className="pb-4 text-center text-lg">{modalData.email || ''}</p>
                    <div className="modal-action justify-center">
                        <label
                            onClick={closeModal}
                            htmlFor="confirmation-modal"
                            className="btn text-white"
                        >
                            Cancel
                        </label>
                        <label
                            onClick={() => successModal(modalData)}
                            htmlFor="confirmation-modal"
                            className="btn btn-error text-white"
                        >
                            Delete
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;