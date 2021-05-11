import React, { Component } from 'react';
import './styles.css';
import * as AiIcons from 'react-icons/ai';
export default class Report extends Component {
    render() {
        return (
            <div className='avoid_header'>
                <div className='main_body'>
                    <div className='container'>
                        <div style={{ width: 'min-content' }}>
                            <h2>Reports</h2>
                            <hr style={{ height: '3px', backgroundColor: '#282c34' }} />
                        </div>
                    </div>
                    <div className='table_container'>
                        <div className='table_row table_header'>
                            <p>SR.</p>
                            <p>|</p>
                            <p>Name</p>
                            <p>|</p>
                            <p>Date</p>
                            <p>|</p>
                            <p>Actions</p>
                        </div>
                        <div className='table_row'>
                            <p>1</p>
                            <p>|</p>
                            <p>DR Report</p>
                            <p>|</p>
                            <p>12/03/2020</p>
                            <p>|</p>
                            <p>
                                <AiIcons.AiOutlineDownload />
                            </p>
                            <p>
                                <AiIcons.AiOutlineDelete />
                            </p>
                        </div>
                        <div className='table_row'>
                            <p>1</p>
                            <p>|</p>
                            <p>DR Report</p>
                            <p>|</p>
                            <p>12/03/2020</p>
                            <p>|</p>
                            <p>
                                <AiIcons.AiOutlineDownload />
                            </p>
                            <p>
                                <AiIcons.AiOutlineDelete />
                            </p>
                        </div>
                        <div className='table_row'>
                            <p>1</p>
                            <p>|</p>
                            <p>DR Report</p>
                            <p>|</p>
                            <p>12/03/2020</p>
                            <p>|</p>
                            <p>
                                <AiIcons.AiOutlineDownload />
                            </p>
                            <p>
                                <AiIcons.AiOutlineDelete />
                            </p>
                        </div>
                        <div className='table_row'>
                            <p>1</p>
                            <p>|</p>
                            <p>DR Report</p>
                            <p>|</p>
                            <p>12/03/2020</p>
                            <p>|</p>
                            <p>
                                <AiIcons.AiOutlineDownload onClick={() => alert('clicked')} />
                            </p>
                            <p>
                                <AiIcons.AiOutlineDelete />
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}