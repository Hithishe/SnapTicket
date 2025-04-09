import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { aadhar } = useParams(); // Get Aadhar ID from URL
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!aadhar) {
      console.error("Error: aadhar is undefined");
      setEmail("Invalid Aadhar ID.");
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log("Fetching data for Aadhar ID:", aadhar);
        const docRef = doc(db, "users", String(aadhar));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setEmail(docSnap.data().email);
        } else {
          console.log("No such document!");
          setEmail("User not found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setEmail("Error loading data.");
      }
    };

    fetchUserData();
  }, [aadhar]);

  // Function to send an email
  const sendEmail = async () => {
    if (!email || email.includes("Invalid") || email.includes("User not found")) {
      setMessage("Invalid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Welcome to Our Service!",
          message: `Hello, your Aadhar ID is ${aadhar}. This is a test email from our system.`,
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Failed to send email.");
    }
  };
  useEffect(() => {
    console.log("Email State:", email);
  }, [email]);
  
  return (
    
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-100 px-4 py-12">
         <div className="absolute top-4 left-4">
                <Link
                  to="/"
                  className="bg-white text-black px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  ← Back to Home
                </Link>
              </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">User Details</h2>
          <p className="text-gray-700 mb-6">
            <span className="font-semibold">Email:</span> {email}
          </p>
  
          <button
            onClick={sendEmail}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
          >
            Send Email
          </button>
  
          {message && (
            <p className="mt-4 text-sm text-gray-800 font-medium">{message}</p>
          )}
        </div>
      </div>
  );
};  

export default UserDetails;