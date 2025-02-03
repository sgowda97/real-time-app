import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DocumentList from '../../components/DocumentList/DocumentList';
import CreateDocumentModal from '../../components/CreateDocumentModal/CreateDocumentModal';
import './Home.css';

const HomePage = () => {
    const [documents, setDocuments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        if (!userEmail) {
            navigate('/login');
        } else {
            fetchDocuments();
        }
    }, [userEmail, navigate]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/documents?userEmail=${userEmail}`);

            setDocuments(response.data.documents);
        } catch (error) {
            console.error('Failed to fetch documents:', error);
        }
    };

    const handleCreateDocument = async (title, content) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/documents`, {
                title,
                content,
                ownerEmail: localStorage.getItem('email'),
            });

            fetchDocuments();
            setShowModal(false);
        } catch (error) {
            console.error('Failed to create document:', error);
        }
    };

    const handleDocumentClick = (documentId) => {
        navigate(`/collaboration/${documentId}`);
    };

    return (
        <div className="home-container">
            <h1>My Documents</h1>
            <button onClick={() => setShowModal(true)}>Create New Document</button>
            <DocumentList documents={documents} onDocumentClick={handleDocumentClick} />
            {showModal && (
                <CreateDocumentModal
                    onClose={() => setShowModal(false)}
                    onCreate={handleCreateDocument}
                />
            )}
        </div>
    );
};

export default HomePage;