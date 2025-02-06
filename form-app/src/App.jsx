import { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    contact: "",
    subject: "",
    url: "",
    about: "",
  });

  const [savedValues, setSavedValues] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const API_URL = "http://localhost:8080/api/form/submit"; // Backend URL

  // Handle changes in form fields
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(API_URL, values, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Response:", res.data);
      alert("Form submitted successfully!");
      handleReset(); // Reset form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Submission failed! Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Save form data temporarily
  const handleSave = () => {
    setSavedValues(values);
    console.log("Saved Data:", values);
  };

  // Reset form fields
  const handleReset = () => {
    setValues({
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      contact: "",
      subject: "",
      url: "",
      about: "",
    });
  };

  return (
    <div className="container">
      <h1>React Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name*</label>
        <input type="text" placeholder="Enter First Name" name="firstname" onChange={handleChanges} required value={values.firstname} />

        <label htmlFor="lastname">Last Name*</label>
        <input type="text" placeholder="Enter Last Name" name="lastname" onChange={handleChanges} required value={values.lastname} />

        <label htmlFor="email">Email*</label>
        <input type="email" placeholder="Enter Email" name="email" onChange={handleChanges} required value={values.email} />

        <label htmlFor="contact">Contact*</label>
        <input type="text" placeholder="Enter Phone No" name="contact" onChange={handleChanges} required value={values.contact} />

        <label>Gender</label>

        <input type="radio" name="gender" value="male" onChange={handleChanges} checked={values.gender === "male"} /> Male
        <input type="radio" name="gender" value="female" onChange={handleChanges} checked={values.gender === "female"} /> Female
        <input type="radio" name="gender" value="others" onChange={handleChanges} checked={values.gender === "others"} /> Others

        <label htmlFor="subject">Subject</label>
        <select name="subject" id="subject" onChange={handleChanges} value={values.subject}>
          <option value="">Select Subject</option>
          <option value="ai">AI</option>
          <option value="java">Java</option>
          <option value="reactjs">ReactJS</option>
        </select>

        <label htmlFor="url">Linkedin URL</label>
        <input type="text" name="url" placeholder="Enter Linkedin Url" onChange={handleChanges} value={values.url} />

        <label htmlFor="about">About</label>
        <textarea name="about" id="about" cols="30" rows="5" placeholder="Enter Description" onChange={handleChanges} value={values.about}></textarea>

        <div className="buttons">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleReset}>Reset</button>
          <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
        </div>
      </form>

      {savedValues && (
        <div className="saved-data">
          <h2>Saved Data</h2>
          <pre>{JSON.stringify(savedValues, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
