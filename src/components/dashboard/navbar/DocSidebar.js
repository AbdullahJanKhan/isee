import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as GrIcons from 'react-icons/gr'

export const DocbarData = [
    {
        title: 'Home',
        path: '/doctor/home',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Request',
        path: '/doctor/view_request',
        icon: <AiIcons.AiOutlineUsergroupAdd />,
        cName: 'nav-text'
    },
    {
        title: 'Classifier',
        path: '/doctor/dr_classifier',
        icon: <GrIcons.GrDocumentTest />,
        cName: 'nav-text'
    },
];
