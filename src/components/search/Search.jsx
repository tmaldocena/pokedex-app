import React, { useState, useEffect } from 'react';
import Autocomplete from './autocomplete/Autocomplete';
import Dropdown from './selects/Dropdown';

function Search() {

    useEffect(() => {
        document.getElementById('footerID').classList.add('position');
        
    }, []);

    return (
    <div style={{textAlign: 'center'}}>
        <h1 style={{fontWeight: 'normal'}}>Type below to search for a pokemon</h1>
        <Autocomplete/>
        <p>Or you can use the filters</p>
        <Dropdown />
    </div>
    );
};

export default Search;
