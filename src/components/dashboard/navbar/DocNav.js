import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DocbarData } from './DocSidebar';
import { AccbarData } from './AccbarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Header from './header/header';

function Navbar(props) {
    const [sidebar, setSidebar] = useState(false);
    const [accbar, setAccbar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const showAccbar = () => setAccbar(!accbar);

    return (
        <div>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div>
                    <Header setSidebar={setSidebar} showSidebar={showSidebar} accSidebar={showAccbar} setAccbar={setAccbar} />
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {DocbarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={{
                                        pathname: item.path,
                                        state: {
                                            token: props.token,
                                            user: props.user
                                        }
                                    }}>
                                        {item.icon}
                                        <span className='span_sidebar'>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <nav className={accbar ? 'nav-menu-right active' : 'nav-menu-right'}>
                    <ul className='nav-menu-items' onClick={showAccbar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {AccbarData.map((item, index) => {
                            if (item.path === '/') {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={{
                                            pathname: item.path,
                                            state: {
                                                token: props.token,
                                                user: props.user
                                            }
                                        }}>
                                            {item.icon}
                                            <span className='span_sidebar'>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            }
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={{
                                        pathname: '/doctor' + item.path,
                                        state: {
                                            token: props.token,
                                            user: props.user
                                        }
                                    }}>
                                        {item.icon}
                                        <span className='span_sidebar'>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

            </IconContext.Provider>
        </div >
    );
}

export default Navbar;