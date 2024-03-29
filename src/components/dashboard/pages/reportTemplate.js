import React from "react";

export default function Report(props) {
  const [user, setUser] = React.useState(null)
  const [data, setData] = React.useState(null)
  var date = new Date(Date.now()).toISOString()
  date = date.slice(0, 10) + ' @ ' + date.slice(11, date.length - 1)

  React.useEffect(() => {
    console.log(props)
    if (props.user) {
      setUser(props.user)
    }
    if (props.data) {
      setData(props.data)
    }
  }, [props])
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "rgb(40,44,52)",
          color: "#fff",
          padding: "10px",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "500" }}>
          iSEE | Blindness Detection System
        </p>
        <p style={{ alignSelf: "center" }}>
          Diabetic Retinopathy Screening Report
        </p>
      </div>
      <div style={{ backgroundColor: "rgba(40,44,52,0.2)", padding: "10px" }}>
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
            display: "flex",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Patient Information:
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            color: "#282c34",
            textDecoration: "underline",
            padding: "10px",
          }}
        >
          <div >
            <p>
              <strong>Patient ID:</strong> {user ? user._id : ''}
            </p>
            <p>
              <strong>Report ID:</strong> {data ? data._id : ''}
            </p>
            <p>
              <strong>Submission Date:</strong> {date}
            </p>
          </div>
          <div>
            <p>
              <strong>Patient Name:</strong> {user ? user.fname + ' ' + user.lname : ''}
            </p>
            <p>
              <strong>Date Of Birth:</strong> {user ? user.dob.slice(0, 10) : ''}
            </p>
            <p>
              <strong>Gender:</strong> {user ? user.gender : ''}
            </p>
          </div>
        </div>
        <hr />
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Diabetic Retinopathy Screening Summary:
          </p>
          <p>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                marginLeft: "5px",
                marginRight: "5px",
              }}
            >
              Screening Result:
            </span>
            Negative for referable diabetic retinopathy.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div
            style={{
              padding: "0px 10px 0px 10px",
              color: "#282c34",
            }}
          >
            <p>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              >
                Patient Eye Scan:
              </span>
              <br />
              <span>No apparent signs of DR detected [0.0]</span>
            </p>
            <img
              src={data ? `http://localhost:5000/images/${data.scan}` : ''}
              alt="Eye Scan"
              style={{
                width: "128px",
                height: "128px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
        <hr />
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Plan and Recommendations:
          </p>
          <ul>
            <li>
              <p>Return for retinal imaging within 12 months.</p>
            </li>
            <li>
              <p>
                As per ADA recommendations, emphasize the importance of
                controlling blood sugar, cholesterol and blood pressure as well
                the importance of routine follow-up with an ophthalmologist
                regardless of whether visual symptoms are present or absent.
              </p>
            </li>
            <li>
              <p>Report Date: {new Date(Date.now()).toString()}</p>
            </li>
          </ul>
        </div>
        <hr />
        <div
          style={{
            padding: "0px 10px 0px 10px",
            color: "#282c34",
          }}
        >
          <p style={{ fontSize: "12px", fontWeight: "500" }}>
            Note: This report is automatically generated using iSee DR
            Classifier and only provides a Diabetic Retinopathy (DR)
            screeningassessment. This 1/1 screening does not take place of a
            regular eye examination for the purpose of assessing the presence of
            age-related macular degeneration, glaucoma, cataract, anterior
            segment diseases or other possible vision threatening conditions
          </p>
        </div>
      </div>
    </div>
  );
}
