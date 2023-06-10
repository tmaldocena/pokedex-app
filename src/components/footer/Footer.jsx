import React from 'react';
import './Footer.css';
import Pikachu from '../../assets/pikachu.gif';

function Footer() {

  return (
    <div className='footer' id='footerID'>
      <img src={Pikachu} alt='Pikachu gif'/>
      <br/>
      Made by <a href="your-website-link" target="_blank">Tomás M.</a>
    </div>
  );
}

export default Footer;
