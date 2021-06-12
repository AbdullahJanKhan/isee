import React, { useState } from "react";
import "./styles.css";
import * as AiIcons from "react-icons/ai";
import { GrView } from 'react-icons/gr'
import Navbar from "../navbar/Navbar";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
export default function Report() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [reports, setreports] = useState(null);

  const location = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    if (location.state) {
      setUser(location.state.user);
      setToken(location.state.token);
      axios.get('http://localhost:5000/report/get_reports_list', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Authorization': `Bearer ${location.state.token}`
        }
      })
        .then(res => {
          console.log(res.data)
          setreports(res.data.reports)
        })
    }
  }, [location, token, user]);

  return (
    <div>
      <div>
        <Navbar token={token} user={user} />
      </div>
      <div className="avoid_header">
        <div className="main_body">
          <div>
            <p className='section_header'>Welcome, {user ? user.fname + ' ' + user.lname : ''}</p>
          </div>
          <div className="container">
            <div style={{ width: "min-content" }}>
              <p className='section_header'>Reports</p>
              <hr style={{ height: "3px", backgroundColor: "#282c34" }} />
            </div>
          </div>
          <div className="table_container">
            <div className="table_row table_header">
              <p>SR.</p>
              <p>|</p>
              <p>Name</p>
              <p>|</p>
              <p>Date</p>
              <p>|</p>
              <p>Actions</p>
            </div>
            <div>
              {reports ? reports.map((item, index) => {
                return (
                  <div className="table_row" key={index}>
                    <p>{index + 1}</p>
                    <p>|</p>
                    <p
                      style={{ textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={() => {
                        history.push({
                          pathname: '/user/dr_report',
                          state: {
                            user: user,
                            token: token,
                            data: reports[index].report
                          }
                        })
                      }}>{item.title}</p>
                    <p>|</p>
                    <p>{item.date.slice(0, 10)}</p>
                    <p>|</p>
                    <p>
                      <AiIcons.AiOutlineDownload />
                    </p>
                    <p>
                      <AiIcons.AiOutlineDelete />
                    </p>
                    <p style={{ cursor: 'pointer' }}
                      onClick={() => {
                        history.push({
                          pathname: '/user/dr_report',
                          state: {
                            user: user,
                            token: token,
                            data: reports[index].report
                          }
                        })
                      }}>
                      <GrView />
                    </p>
                  </div>
                )
              }) : <p>Fetching Data</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
