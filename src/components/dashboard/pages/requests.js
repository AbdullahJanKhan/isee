import React, { useState } from "react";
import './styles.css'
import DocNav from '../navbar/DocNav'
import { useLocation, useHistory } from "react-router-dom";
import * as GoIcons from 'react-icons/go';

export default function Requests() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
            setUser(location.state.user)
            setToken(location.state.token)
        }
    }, [location]);

    return (
        <div>
            <div> <DocNav token={token} user={user} /> </div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <div className='container'>
                        <p>User Requests</p>
                        <hr />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        {user ? <Card userid={user} id={user._id} token={token} /> : <p>Test</p>}
                    </div>

                </div>
            </div>
        </div>
    )
}

const Card = (props) => {
    const history = useHistory()
    const handelClick = () => {
        history.push({
            pathname: '/doctor/details/609e4af763e13608382301c6',
            state: {
                user: props.userid,
                token: props.token
            }
        })
    }
    return (
        <div className='box' key={props.id} style={{ justifyContent: 'space-between', display: 'flex' }}>
            <div style={{ width: '80%' }}>
                <p>{props.userid.fname + ' ' + props.userid.lname}</p>
                <p>Reason: Imbalance in Sugar cannot control</p>
                <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handelClick}>View Details ?</p>
            </div>
            <div style={{
                width: '15%',
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'center',
                paddingRight: '10px',
                justifyContent: 'space-between'
            }}>
                <p style={{ border: '1px solid', borderRadius: '5px' }}>
                    <GoIcons.GoCheck />
                </p>
                <p style={{ border: '1px solid', borderRadius: '5px' }}>
                    <GoIcons.GoX />
                </p>

            </div>
        </div>
    )
}