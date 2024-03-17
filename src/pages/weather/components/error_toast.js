import React from 'react';
import { Toast } from 'react-bootstrap';

const ErrorToast = ({ show, message }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                zIndex: 9999,
            }}
        >
            <Toast show={show} onClose={() => { }} bg="danger" text="light" delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </div>
    );
};

export default ErrorToast;
