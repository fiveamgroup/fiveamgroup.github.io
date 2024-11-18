import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import '../styles.css'; // Import the CSS file

const QrCode = () => {
  const [text, setText] = React.useState('');
  const [qrCode, setQrCode] = React.useState(null);
  const qrCodeRef = useRef(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleGenerateQrCode = () => {
    setQrCode(text);
  };

  const handleDownload = () => {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector('canvas');
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="tool-page">
      <div className="content-container">
        <h2>QR Code Tool</h2>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text to generate QR code"
        />
        <button className="action-button" onClick={handleGenerateQrCode}>
          Generate QR Code
        </button>
        <div ref={qrCodeRef}>
          {qrCode && <QRCodeCanvas value={qrCode} size={256} level="H" />}
        </div>
        {qrCode && (
          <button className="download-button" onClick={handleDownload}>
            Download
          </button>
        )}
      </div>
    </div>
  );
};

export default QrCode;
