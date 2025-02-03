import React, { useState } from 'react';
import axios from 'axios';
import './ShareModal.css';

const ShareModal = ({ documentId, onClose }) => {
    const [email, setEmail] = useState('');

    const handleShare = async () => {
        if (!email) {
            alert('Please enter an email address.');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/documents/${documentId}/share`, {
                sharedWithEmail: email,
                sharedByEmail: localStorage.getItem('email')
            });

            alert('Document shared successfully!');
            onClose();
        } catch (error) {
            console.error('Error sharing document:', error);
            alert('Failed to share document.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Share Document</h2>
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleShare}>Share</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ShareModal;