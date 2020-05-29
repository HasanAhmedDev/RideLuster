import React from 'react';
import FileUpload from './FileUpload'

export default function photoUpload() {
  return (
    <div className='container mt-4'>
      <h4 className='display-4 text-center mb-4'>
        User Photo Upload
      </h4>

      <FileUpload />
    </div>
  );
}
