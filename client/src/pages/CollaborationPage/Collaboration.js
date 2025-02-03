import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Editor from "../../components/Editor";
import { getSocket } from "../../utils/socket";
import axios from "axios";
import "./Collaboration.css";

const CollaborationPage = () => {
    const { documentId } = useParams();

    const initialValue = [
        {
            type: 'paragraph',
            align: 'center',
            children: [{ text: 'Try it out for yourself!' }],
        },
    ];

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (documentId) {
            fetchDocumentContent(documentId);
        }
    }, [documentId]);

    const fetchDocumentContent = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/documents/${id}`);
            setValue(JSON.parse(response.data.document.content));
        } catch (error) {
            console.error('Failed to fetch document content:', error);
        }
    };

    useEffect(() => {
        const socket = getSocket();

        socket.on("collaborate", (newValue) => {
            if (JSON.stringify(newValue) !== JSON.stringify(value)) {
                console.log("Received new value: ", newValue);
                setValue(newValue);
            }
        });

        return () => {
            socket.off("collaborate");
        };
    }, [value]);

    const handleChange = (newValue) => {
        if (JSON.stringify(newValue) !== JSON.stringify(value)) {
            const socket = getSocket();
            setValue(newValue);

            if (newValue.length > 0) {
                socket.emit("collaborate", {
                    room: "default-room",
                    content: newValue,
                });
            }
        }
    };

    const handleSave = async () => {
        if (!documentId) {
            alert('No document selected for saving.');
            return;
        }

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/documents/${documentId}`, {
                content: JSON.stringify(value),
            });

            alert('Document updated successfully!');
        } catch (error) {
            console.error('Error updating document:', error);
            alert('Failed to update document.');
        }
    };

    return (
        <div className="collaboration-container">
            <Editor value={value} onChange={handleChange} />
            <button className="save-button" onClick={handleSave}>Save Document</button>
        </div>
    );
};

export default CollaborationPage;
