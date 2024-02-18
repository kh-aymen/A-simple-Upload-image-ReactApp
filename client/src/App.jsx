import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import DrpoZone from 'react-dropzone'

const App = () => {
  const [imageUrl, setImageUrl] = useState(null)

  const handleDrop = (theFile) => {
    console.log(theFile)
    const formData = new FormData()
    formData.append('file', theFile[0])
    axios.post('http://localhost:3001/upload', formData)
      .then(res => setImageUrl(res.data.imageUrl))
      .catch(err => console.log(err))
  }

  console.log(imageUrl)
  return (
    <div className="main-container">
      <DrpoZone
        onDrop={handleDrop}
        minSize={1024}
        maxSize={10 * 1024 * 1024}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
          const additionalClass = isDragAccept ? 'accept' : isDragReject ? 'reject' : ''
          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass}`
              })}
            >
              <input {...getInputProps()} />
              <p>Drop Or Click to select files</p>
            </div>
          )
        }}
      </DrpoZone>
      {imageUrl && (
        <>
          <h4>file uploaded successfully !!</h4>
          <img src={imageUrl} className='' alt='uploadded image' />
        </>
      )}
    </div>
  )
}

export default App