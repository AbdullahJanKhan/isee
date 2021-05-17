import React from "react";
import "./header.css";
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';

function Header(props) {
    const withSidebar = (
        <div className='header_main'>
            <div className='header'>
                <FaIcons.FaBars onClick={props.showSidebar} className='burger' />
                <p className='title'>ISEE | DR CLASSIFIER</p>
            </div>
            <div className='side_header'>
                <RiIcons.RiAccountCircleLine className='account' onClick={props.accSidebar} />
            </div>
        </div>

    )
    const withoutSidebar = (
        <div className='header_main'>
            <div className='header'>
                <p className='title'>ISEE | DR CLASSIFIER</p>
            </div>
        </div>
    )
    return (
        <div>
            { props.noSidebar ? withoutSidebar : withSidebar}
        </div>
    );
}

export default Header;

