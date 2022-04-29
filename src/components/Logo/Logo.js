import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0 br2 shadow-2' style={{ height: '105px', width: '105px' }}>
            <Tilt className='Tilt'>
                <div style={{ height: '100px', width: '100px' }}>
                    <img alt='logo of brain' src={brain}></img>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;