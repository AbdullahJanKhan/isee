import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcon from 'react-icons/bs'

export const SidebarData = [
    {
        title: 'Home',
        path: '/user/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Reports',
        path: '/user/reports',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Manage Blood Glucose',
        path: '/user/managebg',
        icon: <BsIcon.BsDroplet />,
        cName: 'nav-text'
    },
    {
        title: 'Manage Blood Pressure',
        path: '/user/managebp',
        icon: <FaIcons.FaHeartbeat />,
        cName: 'nav-text'
    },
    {
        title: 'Doctors',
        path: '/user/searchDoc',
        icon: <IoIcons.IoMdPeople />,
        cName: 'nav-text'
    },
    {
        title: 'Messages',
        path: '/user/messages',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'nav-text'
    },
];
