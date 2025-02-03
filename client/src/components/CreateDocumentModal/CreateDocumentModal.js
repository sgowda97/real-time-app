import React, { useState } from 'react';
import './CreateDocumentModal.css';

const CreateDocumentModal = ({ onClose, onCreate }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert('Title and content are required.');
            return;
        }

        onCreate(title, content);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Document</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit">Create</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CreateDocumentModal;