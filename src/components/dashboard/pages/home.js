import React, { useState } from 'react';
import './styles.css'
import noImg from '../../../asset/no_img.png';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router';
import Navbar from '../navbar/Navbar';
import DocNav from '../navbar/DocNav';

export default function Home(props) {

    const [name, setName] = useState('');
    const fileInput = React.createRef();
    const [scan, setScan] = useState(null)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const location = useLocation();
    const history = useHistory()
    React.useEffect(() => {
        if (location.state) {
            console.log(location.state)
            setUser(location.state.user)
            setToken(location.state.token)
            setName(location.state.user.fname + ' ' + location.state.user.lname)
        }
    }, [location, user]);

    const handleClick = () => {
        fileInput.current.click();
    };
    const handleChange = event => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', fileInput.current.files[0]);
        axios.post('http://localhost:5000/users/upload', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setScan(res.data)
            });
    }

    const handleClassifyImage = () => {
        const data = new FormData();
        data.append('file', fileInput.current.files[0]);
        axios.post('http://127.0.0.1:5000/classify', data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res.data)
                const data = {
                    'u_id': user._id,
                    'scan': fileInput.current.files[0].name,
                    'prediction': res.data.label[0],
                    'probability': res.data.accuracy
                }
                if (res.data.success) {
                    axios.post('http://localhost:5000/users/add_new_data', data, {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            if (res.data.success)
                                history.push({
                                    pathname: props.isDoctor ? '/doctor/dr_report' : '/user/dr_report',
                                    state: {
                                        user: user,
                                        token: token,
                                        data: res.data.data
                                    }
                                })
                        })
                }
            });

    }

    return (
        <div>
            <div> {props.isDoctor ? <DocNav token={token} user={user} /> : <Navbar token={token} user={user} />} </div>
            <div className='avoid_header'>
                <div className='main_body'>
                    <div className='container'>
                        <p>Welcome, {name}!</p>
                        <hr />
                    </div>
                    <div className='container'>
                        <div className='imageUpload'>
                            <p>DR CLASSIFIER</p>
                            <form className='form_img'>
                                <img src={scan ? `http://localhost:5000/${scan.filename}` : noImg} alt='Eye Scan' className='scan' />
                                <br />
                                <p className='classify' onClick={handleClick}>
                                    Upload Image
                            </p>
                                <input id='scan' type='file' ref={fileInput} accept="image/*" onChange={handleChange} />
                                <p className='classify' onClick={handleClassifyImage}>Classify Disease</p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Method to add a brearer token to the api call
// const updateEmail = () => {
//     axios.patch('http://localhost:5000/users/change_email/' + email, {
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then((res) => {
//             if (res.data.success) {
//                 alert(JSON.stringify(res.data))
//             }
//         })
//         .catch((err) => console.log(err))

// }
