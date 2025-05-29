// // App.js
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [file, setFile] = useState(null);
//   const [uploadResult, setUploadResult] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response.data); 
//       setUploadResult(response.data);
      
//       alert("File uploaded successfully!");
//     } catch (error) {
//       console.error("Upload failed", error);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>File Upload to Express Backend</h2>
//       <input type="file" onChange={handleFileChange} />
//       <br />
//       <button onClick={handleUpload}>Upload</button>
//       {uploadResult?.jobMatches && (
//   <div style={{ marginTop: "1rem" }}>
//     <h3>Job Matches</h3>
//     <ul>
//       {uploadResult.jobMatches.map((job, index) => (
//         <li key={index}>
//           <strong>{job.job_title}</strong> at {job.employer_name} — {job.job_city}
//           <br />
//           <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">Apply</a>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}

//     </div>
//   );
// }

// export default App;




// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [file, setFile] = useState(null);
//   const [uploadResult, setUploadResult] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }

//     // File validation
//     if (file.type !== "application/pdf") {
//       alert("Please upload a PDF file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/upload', formData); // Removed 'Content-Type' header
//       console.log(response.data);
//       setUploadResult(response.data);
      
//       alert("File uploaded successfully!");
//     } catch (error) {
//       console.error("Upload failed:", error);
//       if (error.response) {
//         console.error("Response data:", error.response.data); // Log the backend response for debugging
//       }
//       alert("Upload failed: " + (error.response?.data?.message || error.message));
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>File Upload to Express Backend</h2>
//       <input type="file" onChange={handleFileChange} />
//       <br />
//       <button onClick={handleUpload}>Upload</button>

//       {uploadResult?.jobMatches && (
//         <div style={{ marginTop: "1rem" }}>
//           <h3>Job Matches</h3>
//           <ul>
//             {uploadResult.jobMatches.map((job, index) => (
//               <li key={index}>
//                 <strong>{job.job_title}</strong> at {job.employer_name} — {job.job_city}
//                 <br />
//                 <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">Apply</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './pages/Spinner';

function App() {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for UI

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true); // Start loading when the upload begins

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data)
      setUploadResult(response.data); // Set the job matches in state
      setLoading(false); // Stop loading when the response is received

      alert("File uploaded and analyzed successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      setLoading(false); // Stop loading if there's an error
      alert("Upload failed");
    }
  };

  return (
      <>
     
       <div className='h-screen bg-gradient-to-r from-slate-900 via-gray-600 to-zink-600  bg-transparent '>
       <div className='h-auto  w-screen flex  flex-col items-center relative '>
        <h2 className='text-5xl mt-9 p-10 bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent'>Resume Analyzer</h2>
          <div className='absolute max-sm:hidden  h-45 w-60 top-10 left-30 text-2xl bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent '>Are you tired of searching for jobs on online platforms?</div>
          <div className='absolute max-sm:hidden h-45 w-60  right-30 top-10 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent text-2xl  '>Don't Worry! We have a Solution...Just Upload Your Resume and Get a list of Jobs </div>
        
        <div className='mt-1 h-auto   '>
         <div  className='flex gap-2'>
           <input className=' bg-gradient-to-r from-blue-400  to-emerald-500 bg-clip-text text-transparent outline-2 m-2 rounded-md outline-indigo-400 p-1 hover:outline-2 hover:outline-blue-400 duration-4000' type="file" onChange={handleFileChange} />
           <button className='h-10 w-25  bg-gradient-to-r from-blue-400  to-emerald-500 bg-clip-text text-transparent   ' onClick={handleUpload}>Upload</button>
         </div>
   
       
      {loading && <div className='flex' ><Spinner/>
      
      </div>} {/* Show loading indicator while processing */}
      
      {uploadResult?.jobMatches && (
        <div className='border rounded-md max-sm:h-90 h-100 w-105 mt-4 overflow-auto  '>
          <h3 className='text-xl text-center '>Matched Jobs</h3>
          <ul className='flex flex-col gap-4 p-3 '>
            {uploadResult.jobMatches.map((job, index) => (
              <li className='border rounded-md  p-2 ' key={index}>
                <strong>{job.job_title}</strong> at {job.employer_name} — {job.job_city} {job.job_employment_type}
                <br />
                <a className=''  href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                  Apply
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* In case there are no job matches */}
      {!loading && uploadResult?.jobMatches?.length === 0 && (
        <div>No job matches found for the given resume.</div>
      )}
    </div>
        </div>
      
       </div>
      
      </>
  );
}

export default App;
