import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";

const AdminPage = () => {
  const [scannedData, setScannedData] = useState(null);
  const [hasScanned, setHasScanned] = useState(false); // prevent multiple redirects
  const navigate = useNavigate();

  const handleScan = (result, error) => {
    if (!!result) {
      const scannedUrl = result?.text || result;
      setScannedData(scannedUrl);
  
      // Only redirect once
      if (!hasScanned) {
        setHasScanned(true);
        window.location.href = scannedUrl; // or navigate(scannedUrl) for routes
      }
    }
  
    if (!!error) {
      // Suppress common decoding errors (like "e2")
      if (
        error.message?.includes("e2") ||
        error.message?.includes("finder") ||
        error.name === "NotFoundException"
      ) {
        return; // Do nothing
      }
  
      console.error("QR scan error:", error.message || error);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-blue-100 text-black px-4 relative">
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          className="bg-white text-black px-4 py-2 rounded shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          ← Back to Home
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-6">🛠️ Bus Administration Page</h2>

      <div className="w-[300px] mb-4">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={handleScan}
          style={{ width: "100%" }}
        />
      </div>

      {scannedData && (
        <p className="bg-white px-4 py-2 rounded shadow text-center">
          <strong>Scanned Aadhar:</strong> {scannedData}
        </p>
      )}
    </div>
  );
};

export default AdminPage;
