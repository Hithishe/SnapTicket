import React, { useState } from "react";
import {
  auth,
  db,
  collection,
  addDoc,
  createUserWithEmailAndPassword,
} from "../firebaseconfig";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      await addDoc(collection(db, role === "conductor" ? "conductors" : "users"), {
        uid: user.uid,
        email,
        role,
        createdAt: new Date(),
      });
      alert("Signup successful!");
      navigate("/admin");
    } catch (error) {
      alert("Signup error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center rom-gray-900 via-gray-600 to-gray-700 px-4 relative">
            <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="bg-gray-500 !text-white px-4 py-2 rounded shadow-md hover:ring-white hover:shadow-lg transition-shadow duration-200"
        >
          ← Back to Home
        </Link>
      </div>
      <form
        onSubmit={handleSignup}
        className="bg-neutral-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded via-gray-700 text-white border border-gray-600 placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 rounded via-gray-700 text-white border border-gray-600 placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

      

        <button
          type="submit"
          className="w-full !bg-white text-black py-2 rounded-md hover:bg-white-600 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className=" hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
