import React from 'react'
import './styles.css'
import DocNav from '../navbar/DocNav'

export default function Details() {
    return (
        <div>
            <div> <DocNav /> </div>
            <div className='avoid_header'>
                User Details
            </div>
        </div>
    )
}