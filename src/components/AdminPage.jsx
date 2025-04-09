import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

const AdminPage = () => {
  const [scannedData, setScannedData] = useState(null);
  const [hasScanned, setHasScanned] = useState(false);
  const scannerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasScanned) {
      const scanner = new Html5QrcodeScanner("reader", {
        fps: 10,
        qrbox: 250,
      });

      scanner.render(
        (decodedText) => {
          setScannedData(decodedText);

          if (!hasScanned) {
            setHasScanned(true);
            scanner.clear(); // stop scanning
            window.location.href = decodedText; // or navigate(decodedText)
          }
        },
        (error) => {
          // Suppress common scan errors
          if (
            error.message?.includes("e2") ||
            error.message?.includes("finder") ||
            error.name === "NotFoundException"
          ) {
            return;
          }

          console.error("QR scan error:", error);
        }
      );

      scannerRef.current = scanner;
    }

    // Cleanup on unmount
    return () => {
      scannerRef.current?.clear().catch(() => {});
    };
  }, [hasScanned]);

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

      <div id="reader" className="w-[300px] mb-4" />

      {scannedData && (
        <p className="bg-white px-4 py-2 rounded shadow text-center">
          <strong>Scanned Aadhar:</strong> {scannedData}
        </p>
      )}
    </div>
  );
};

export default AdminPage;
