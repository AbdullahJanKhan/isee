import React, { useState } from 'react';
import './styles.css'
import noImg from '../../../asset/no_img.png';
import axios from 'axios';
import { useLocation } from 'react-router';
import Navbar from '../navbar/Navbar';

export default function Home() {

    const [name, setName] = useState('');
    const fileInput = React.createRef();
    const [scan, setScan] = useState(null)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    
    const location = useLocation();
    React.useEffect(() => {
        if (location.state) {
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
        console.log(token);
        console.log(user);
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

    return (
        <div>
            <div> <Navbar token={token} user={user} /> </div>
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
                                <p className='classify'>Classify Disease</p>
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
