import React from "react";
import "./header.css";
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import { useHistory } from "react-router";

function Header(props) {
    const history = useHistory();
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
            <div>
                <p style={{
                    border: '1px solid #fff',
                    cursor: 'pointer',
                    color: '#fff',
                    fontWeight: '600',
                    padding: '10px',
                    fontSize: '20px',
                    borderRadius: '15px',
                    marginRight: '10px'
                }} onClick={() => history.push('/')}>Logout</p>
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

