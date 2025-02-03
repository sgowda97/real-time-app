import React, { useState } from 'react';
import ShareModal from '../ShareModal/ShareModal';
import './DocumentList.css';

const DocumentList = ({ documents, onDocumentClick }) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedDocumentId, setSelectedDocumentId] = useState(null);

    const handleShareClick = (documentId) => {
        setSelectedDocumentId(documentId);
        setShowShareModal(true);
    };

    return (
        <div className="document-list">
            {documents.map((doc) => (
                <div key={doc.id} className="document-item" onClick={() => onDocumentClick(doc.id)}>
                    <h3>{doc.title}</h3>
                    <p>Created: {new Date(doc.created_at).toLocaleString()}</p>
                    <button onClick={(e) => { e.stopPropagation(); handleShareClick(doc.id); }}>Share</button>
                </div>
            ))}
            {showShareModal && (
                <ShareModal
                    documentId={selectedDocumentId}
                    onClose={() => setShowShareModal(false)}
                />
            )}
        </div>
    );
};

export default DocumentList;