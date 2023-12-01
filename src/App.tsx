import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import imglyRemoveBackground from "@imgly/background-removal"
import Dropzone, {FileRejection} from "react-dropzone";

function App() {

    const [noBackgroundImage, setNoBackgroundImage] = useState<string>("");

    // useEffect(() => {
    //     console.log("ITTTT1")
    //     // imglyRemoveBackground(image_src)
    //     //     .then((blob: Blob) => {
    //     //       console.log("ITTTT2")
    //     //       const url = URL.createObjectURL(blob);
    //     //
    //     //       console.log(url)
    //     //       setNoBackgroundImage(url);
    //     //     })
    //     //     .catch((ex: any) => {
    //     //       console.log(ex);
    //     //     })
    //
    // }, [])


    const handleFileUpload = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onload = () => {
                const result = reader.result;

                // Check if the result is a valid type for image_src
                if (result instanceof ArrayBuffer) {
                    // setImageSrc(result);
                    let image_src: ImageData | ArrayBuffer | Uint8Array | Blob | URL | string = new URL("https://www.rover.com/blog/wp-content/uploads/2018/11/golden-retriever-2061715_1920.jpg");

                    image_src = result;

                    imglyRemoveBackground(image_src)
                        .then((blob: Blob) => {
                            console.log("ITTTT2")
                            const url = URL.createObjectURL(blob);

                            console.log(url)
                            setNoBackgroundImage(url);
                        })
                        .catch((ex: any) => {
                            console.log(ex);
                        })

                    console.log("HEREEEE")
                } else {
                    console.error('Unsupported file type');
                }
            };

            // Read the file as ArrayBuffer
            reader.readAsArrayBuffer(file);
        }

        // Handle rejected files if needed
        if (rejectedFiles.length > 0) {
            console.error('Rejected files:', rejectedFiles);
        }
    };

    return (
        <div>
            <div>
                <img src={noBackgroundImage} width="350"/>
            </div>

            <Dropzone onDrop={(acceptedFiles, fileRejections) => handleFileUpload(acceptedFiles, fileRejections)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>
        </div>
    );
}

export default App;
