import React, { useEffect } from 'react';
import './Memes.css';
const images = require.context('../../assets/memes', true);
const imageList = images.keys().map(image => images(image));


const Memes = () => {
    const footer = document.getElementById('footerID');
    console.log('a');
    if(footer.classList.contains('position')){
        footer.classList.remove('position');
    }
    useEffect(() => {
    }, []);

    return (
        <div className='memes-container'>
            {
                imageList.map((img, index) => {
                    return <img src={img} key={index} alt={'meme'+index} />
                })
            }
        </div>
    );
}

export default Memes;
