import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Spiner from "../../components/Spiner/Spiner";
import { registerfunc } from "../../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { addData } from "../../components/context/ContextProvider";
import "./register.css";

const Register = () => {
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(true);

  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData);

  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  const setProfile = (e) => {
    setImage(e.target.files[0]);
  };

  const submitUserData = async (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname === "" || lname === "" || email === "" || mobile === "" || gender === "" || status === "" || image === "" || location === "") {
      toast.error("All fields are required!");
    } else if (!email.includes("@")) {
      toast.error("Enter a valid email!");
    } else if (mobile.length !== 10 || isNaN(mobile)) {
      toast.error("Enter a valid mobile number!");
    } else {
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image);
      data.append("location", location);

      const config = {
        "Content-Type": "multipart/form-data",
      };

      try {
        const response = await registerfunc(data, config);
        if (response.status === 200) {
          setInputData({
            ...inputdata,
            fname: "",
            lname: "",
            email: "",
            mobile: "",
            gender: "",
            location: "",
          });
          setStatus("");
          setImage("");
          setUseradd(response.data);
          navigate("/");
        } else {
          toast.error("Error!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error occurred while registering!");
      }
    }
  };

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [image]);

  return (
    <>
      {showspin ? (
        <Spiner />
      ) : (
        <div className="container">
          <h2 className="text-center mt-1">Register Your Details</h2>
          <Card className="shadow reg mt-3 p-3">
            <div className="profile_div text-center">
              <img src={preview ? preview : "/man.png"} alt="Profile Preview" />
            </div>
            <Form>
              <Row>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicFirstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control type="text" name="fname" value={inputdata.fname} onChange={setInputValue} placeholder="Enter First Name" />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name="lname" value={inputdata.lname} onChange={setInputValue} placeholder="Enter Last Name" />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" value={inputdata.email} onChange={setInputValue} placeholder="Enter Email" />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicMobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control type="text" name="mobile" value={inputdata.mobile} onChange={setInputValue} placeholder="Enter Mobile" />
                </Form.Group>
                <Form.Group className="mb-4 col-lg-6" controlId="formBasicGender">
                  <Form.Label>Select Your Gender</Form.Label>
                  <Form.Check type={"radio"} label={`Male`} name="gender" value={"Male"} onChange={setInputValue} />
                  <Form.Check type={"radio"} label={`Female`} name="gender" value={"Female"} onChange={setInputValue} />
                </Form.Group>
                <Form.Group className="mb-4 col-lg-6" controlId="formBasicStatus">
                  <Form.Label>Select Your Status</Form.Label>
                  <Select options={options} onChange={setStatusValue} />
                </Form.Group>
                <Form.Group className="mb-4 col-lg-6" controlId="formBasicProfile">
                  <Form.Label>Select Your Profile</Form.Label>
                  <Form.Control type="file" name="user_profile" onChange={setProfile} placeholder="Select Your Profile" />
                </Form.Group>
                <Form.Group className="mb-3 col-lg-6" controlId="formBasicLocation">
                  <Form.Label>Enter Your Location</Form.Label>
                  <Form.Control type="text" name="location" value={inputdata.location} onChange={setInputValue} placeholder="Enter Your Location" />
                </Form.Group>
                <Button variant="primary"
                className="button" type="submit" onClick={submitUserData}>Submit</Button>
              </Row>
            </Form>
          </Card>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default Register;
