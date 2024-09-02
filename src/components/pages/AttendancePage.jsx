import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';

export default function AttendanceEdit() {
  const { jwtToken } = useOutletContext();
  const { postid } = useParams();
  const [attendanceData, setAttendanceData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URI}/api/attendance/${postid}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
            mode: 'cors',
          }
        );
        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.message || 'Failed to fetch attendance record');
        } else {
          setAttendanceData(data.attendance);
        }
      } catch (err) {
        setErrorMessage('An error occurred. Please try again later.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [jwtToken, postid]);

  const handleChange = (index, field, value) => {
    const updatedAttendance = attendanceData.attendance.map((camper, i) =>
      i === index ? { ...camper, [field]: value } : camper
    );
    setAttendanceData({ ...attendanceData, attendance: updatedAttendance });

    const errors = { ...formErrors };
    if (field === 'signin' || field === 'signout') {
      if (value !== '' && !/^\d{3}$/.test(value)) {
        errors[`${field}_${index}`] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } time must be a 3-digit string or empty`;
      } else {
        delete errors[`${field}_${index}`];
      }
    }
    setFormErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formErrors).length > 0) {
      setErrorMessage('Please correct the errors before submitting.');
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URI}/api/attendance`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          mode: 'cors',
          body: JSON.stringify({
            id: attendanceData._id,
            attendance: attendanceData.attendance.map((camper) => ({
              camper_id: camper.camper_id._id,
              signin: camper.signin,
              signout: camper.signout,
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Failed to update attendance record');
        setSuccessMessage(null); // Clear success message on error
      } else {
        setErrorMessage(null); // Clear previous error messages
        setSuccessMessage('Attendance record updated successfully.');
      }
    } catch (err) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Error:', err);
    }
  };

  const calculateCounts = () => {
    const signedIn = attendanceData.attendance.filter(
      (camper) => camper.signin !== ''
    ).length;
    const signedOut = attendanceData.attendance.filter(
      (camper) => camper.signout !== ''
    ).length;
    const stillAtCamp = signedIn - signedOut;

    return { signedIn, signedOut, stillAtCamp };
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  const { signedIn, signedOut, stillAtCamp } = calculateCounts();

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Edit Attendance Record</h2>

      {errorMessage && (
        <div className="alert alert-danger text-center">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="alert alert-success text-center">{successMessage}</div>
      )}

      {attendanceData && (
        <div>
          <h5 className="text-center mb-4">
            Attendance Date:{' '}
            {new Date(attendanceData.date).toLocaleDateString()}
          </h5>

          <div className="d-flex justify-content-around mb-4">
            <div>
              <h6>Signed In</h6>
              <p>{signedIn}</p>
            </div>
            <div>
              <h6>Signed Out</h6>
              <p>{signedOut}</p>
            </div>
            <div>
              <h6>Still at Camp</h6>
              <p>{stillAtCamp}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Camper</th>
                  <th>Sign-In</th>
                  <th>Sign-Out</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.attendance.map((camper, index) => {
                  const isSignedIn = camper.signin !== '';
                  const isSignedOut = camper.signout !== '';
                  const rowClass =
                    isSignedIn && isSignedOut
                      ? 'table-success'
                      : !isSignedIn && isSignedOut
                      ? 'table-danger'
                      : '';

                  return (
                    <tr key={camper.camper_id._id} className={rowClass}>
                      <td>{`${camper.camper_id.first_name} ${camper.camper_id.last_name}`}</td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            formErrors[`signin_${index}`] ? 'is-invalid' : ''
                          }`}
                          value={camper.signin}
                          onChange={(e) =>
                            handleChange(index, 'signin', e.target.value)
                          }
                        />
                        {formErrors[`signin_${index}`] && (
                          <div className="invalid-feedback">
                            {formErrors[`signin_${index}`]}
                          </div>
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          className={`form-control ${
                            formErrors[`signout_${index}`] ? 'is-invalid' : ''
                          }`}
                          value={camper.signout}
                          onChange={(e) =>
                            handleChange(index, 'signout', e.target.value)
                          }
                        />
                        {formErrors[`signout_${index}`] && (
                          <div className="invalid-feedback">
                            {formErrors[`signout_${index}`]}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
