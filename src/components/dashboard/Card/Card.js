import React from "react";
import image from "../../../asset/add.png";
import imag from "../../../asset/arrow.png";
import "./Card.css";
export default function Card(props) {
  const detail = () => {
    return (
      <div>
        <div className="dir_row">
          <div className="blood">{props.name}</div>
        </div>
        <hr />
        <div className="content">
          <div className="form">
            <div className="form-group">
              <label htmlFor="dob">Last Updated: </label>
              <text>Feb 21, 2021 | 10:53 am</text>
            </div>
            <div className="form-group">
              <label htmlFor="average">Average Value: </label>
              <text>145 mg/ss</text>
            </div>
            <div className="form-group">
              <label htmlFor="addaccount" className="space-between">
                Add New Account
              </label>
              <img src={image} alt="Add icon"></img>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="boxcard">
      {props.addDetails ? (
        detail()
      ) : (
        <div className="dir_row">
          <div className="blood">
            <span>{props.name}</span>
          </div>
          <div>
            <img src={imag} className="img_icon" alt='Arrow' />
          </div>
        </div>
      )}
    </div>
  );
}
