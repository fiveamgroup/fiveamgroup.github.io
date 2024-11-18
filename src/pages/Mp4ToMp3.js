{/* Mp4ToMp3.js 
import React, { useState, useRef } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const Mp4ToMp3 = () => {
    const [mp3File, setMp3File] = useState(null);
    const [mp4File, setMp4File] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const inputRef = useRef(null);

    const ffmpeg = createFFmpeg({ log: true });
    let isFFmpegLoaded = false;

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setMp4File(URL.createObjectURL(file));
            setMp3File(null); // Reset MP3 preview on new file upload
        }
    };

    const convertToMp3 = async () => {
        if (!mp4File) return;

        setIsProcessing(true);

        try {
            const fileResponse = await fetch(mp4File);
            const fileArrayBuffer = await fileResponse.arrayBuffer();

            // Load FFmpeg if not already loaded
            if (!isFFmpegLoaded) {
                await ffmpeg.load();
                isFFmpegLoaded = true;
            }

            // Write file into FFmpeg's virtual filesystem
            ffmpeg.FS('writeFile', 'input.mp4', new Uint8Array(fileArrayBuffer));

            // Convert MP4 to MP3
            await ffmpeg.run('-i', 'input.mp4', '-q:a', '0', '-map', 'a', 'output.mp3');

            // Read the output MP3 file
            const data = ffmpeg.FS('readFile', 'output.mp3');
            const mp3Blob = new Blob([data.buffer], { type: 'audio/mpeg' });

            setMp3File(mp3Blob);
        } catch (error) {
            console.error('Error during conversion:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (mp3File) {
            const url = URL.createObjectURL(mp3File);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'converted.mp3';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <div className="tool-page">
            <div className="content-container">
                <h2>MP4 to MP3 Converter</h2>
                <input
                    type="file"
                    accept="video/mp4"
                    onChange={handleFileChange}
                    ref={inputRef}
                />
                <button
                    className="action-button file-label"
                    onClick={() => inputRef.current.click()}
                >
                    Select MP4 File
                </button>
                {mp4File && <video src={mp4File} controls width="400" />}
                {mp4File && (
                    <button
                        className="action-button convert-button"
                        onClick={convertToMp3}
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Converting...' : 'Convert to MP3'}
                    </button>
                )}
                {mp3File && (
                    <>
                        <h3>MP3 Preview:</h3>
                        <audio controls src={URL.createObjectURL(mp3File)} />
                        <button
                            className="action-button download-button"
                            onClick={handleDownload}
                        >
                            
                            Download MP3
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Mp4ToMp3;
*/}