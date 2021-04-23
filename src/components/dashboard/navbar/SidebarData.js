import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcon from 'react-icons/bs'

export const SidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Reports',
        path: '/reports',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Manage Blood Glucose',
        path: '/managebg',
        icon: <BsIcon.BsDroplet />,
        cName: 'nav-text'
    },
    {
        title: 'Manage Blood Pressure',
        path: '/managebp',
        icon: <FaIcons.FaHeartbeat/>,
        cName: 'nav-text'
    },
    {
        title: 'Doctors',
        path: '/searchDoc',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Messages',
        path: '/messages',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
];
