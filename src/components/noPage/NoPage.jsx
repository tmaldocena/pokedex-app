import React, { useEffect } from 'react';
import pikachu from '../../assets/detectivePikachu.png';
import './NoPage.css';

const NoPage = () => {

    useEffect(() => {
        const footer = document.getElementById('footerID');
        if(footer.classList.contains('position')){
            footer.classList.remove('position');
        }
    }, []);

    return (
        <div className="container-noPage">
            <h1 className="title">Oops! Page not found.</h1>
            <img className="image-noPage" src={pikachu} alt="Pikachu" />
            <p className="message">
                It looks like the page you're looking for does not exist.
            </p>
        </div>
    );
}

export default NoPage;
