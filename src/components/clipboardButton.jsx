import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function ClipboardButton() {

    const location = useLocation();
    const [buttonText, setButtonText] = useState("Copy ballot URL");

    const formatUrl = () => {
        const path = location.pathname;
        if (path.includes("vote")) {
            return import.meta.env.VITE_ORIGIN_ROOT + path;
        } else {
            return import.meta.env.VITE_ORIGIN_ROOT + "/vote" + path;
        }
    };

    const handleClick = async (event) => {
        event.preventDefault();
        const copyUrl = formatUrl();

        try {
            await navigator.clipboard.writeText(copyUrl);
            setButtonText("URL Copied!");
        } catch (error) {
            console.error("Failed to copy: ", error);
        }
    };

    return (
        <div id='clip-btn-container'>
            <button onClick={handleClick} id='clipboard-btn'>{buttonText}</button>
        </div>
    );
}
