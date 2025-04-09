// src/components/ScanQr.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";

const ScanQr = () => {
  const [scannedData, setScannedData] = useState(null);
  const navigate = useNavigate();

  const handleScan = (result, error) => {
    if (!!result) {
      const scannedUrl = result?.text || result;
      setScannedData(scannedUrl);
  
      // Directly navigate to the scanned URL
      window.location.href = scannedUrl;
    }
  
    if (!!error) {
      console.error("QR scan error:", error);
    }
  };
  

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Scan User QR Code</h2>

      <div style={{ width: "300px", margin: "auto" }}>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={handleScan}
          style={{ width: "100%" }}
        />
      </div>

      {scannedData && (
        <p>
          <strong>Scanned Aadhar:</strong> {scannedData}
        </p>
      )}
    </div>
  );
};

export default ScanQr;