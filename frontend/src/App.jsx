
// import React, { useState } from "react";
// import axios from "axios";
// import Spinner from "./pages/Spinner";

// function App() {
//   const [file, setFile] = useState(null);
//   const [uploadResult, setUploadResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a resume first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);
//       const response = await axios.post("/api/upload", formData);
//       setUploadResult(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Upload failed", error);
//       setLoading(false);
//       alert("Upload failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 flex flex-col items-center px-4">

//       {/* Navbar */}
//       <header className="w-full max-w-7xl flex justify-between items-center py-6">
//         <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
//           ResumeAI
//         </h1>
//         <span className="text-sm text-slate-600 hidden md:block">
//           AI Powered Resume Analysis
//         </span>
//       </header>

//       {/* Hero Section */}
//       <section className="text-center max-w-3xl mt-10">
//         <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
//           Get Matched With The Right Jobs
//         </h2>
//         <p className="mt-4 text-slate-600 text-lg">
//           Upload your resume and let our AI instantly analyze your profile
//           to find the most relevant job opportunities.
//         </p>
//       </section>

//       {/* Upload Card */}
//       <div className="mt-12 bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-slate-100">

//         <div className="flex flex-col gap-5">

//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//           />

//           <button
//             onClick={handleUpload}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
//           >
//             Analyze Resume
//           </button>
//         </div>

//         {loading && (
//           <div className="mt-6 flex justify-center">
//             <Spinner />
//           </div>
//         )}
//       </div>

//       {/* Results Section */}
//       {uploadResult?.jobMatches && (
//         <div className="mt-16 w-full max-w-6xl">
//           <h3 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-10">
//             Matched Opportunities
//           </h3>

//           <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {uploadResult.jobMatches.map((job, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:shadow-2xl transition duration-300"
//               >
//                 <h4 className="text-lg font-semibold text-slate-800 mb-2">
//                   {job.job_title}
//                 </h4>

//                 <p className="text-slate-500 text-sm mb-4">
//                   {job.employer_name} • {job.job_city} •{" "}
//                   {job.job_employment_type}
//                 </p>

//                 <a
//                   href={job.job_apply_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//                 >
//                   Apply Now
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {!loading && uploadResult?.jobMatches?.length === 0 && (
//         <div className="mt-8 text-slate-500 text-center">
//           No job matches found for this resume.
//         </div>
//       )}

//       {/* Footer */}
//       <footer className="mt-20 py-6 text-sm text-slate-500 text-center">
//         © 2026 ResumeAI. Built with AI.
//       </footer>

//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setProgress(0);
      setUploadResult(null);

      const steps = [
        { progress: 15, message: "Uploading resume..." },
        { progress: 35, message: "Extracting resume content..." },
        { progress: 55, message: "Analyzing skills with AI..." },
        { progress: 75, message: "Matching relevant jobs..." },
        { progress: 95, message: "Finalizing results..." },
      ];

      let stepIndex = 0;

      const interval = setInterval(() => {
        if (stepIndex < steps.length) {
          setProgress(steps[stepIndex].progress);
          setStatusMessage(steps[stepIndex].message);
          stepIndex++;
        }
      }, 1200);

      const response = await axios.post("/api/upload", formData);

      clearInterval(interval);
      setProgress(100);
      setStatusMessage("Analysis Complete ✅");

      setTimeout(() => {
        setUploadResult(response.data);
        setLoading(false);
      }, 800);

    } catch (error) {
      console.error("Upload failed", error);
      setLoading(false);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-cyan-50 flex flex-col items-center px-4">

      {/* Navbar */}
      <header className="w-full max-w-7xl flex justify-between items-center py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
          ResumeAI
        </h1>
        <span className="text-sm text-slate-600 hidden md:block">
          AI Powered Resume Analysis
        </span>
      </header>

      {/* Hero */}
      <section className="text-center max-w-3xl mt-10">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
          Get Matched With The Right Jobs Instantly
        </h2>
        <p className="mt-4 text-slate-600 text-lg">
          Upload your resume and let our AI analyze your skills and match
          you with the most relevant opportunities.
        </p>
      </section>

      {/* Upload Card */}
      <div className="mt-12 bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-slate-100">

        <div className="flex flex-col gap-5">
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            onClick={handleUpload}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Analyze Resume
          </button>
        </div>

        {/* Professional Loader */}
        {loading && (
          <div className="mt-8 w-full">
            <div className="mb-3 text-sm text-indigo-600 font-medium text-center">
              {statusMessage}
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-xs text-slate-500 text-center mt-2">
              {progress}% completed
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {uploadResult?.jobMatches && (
        <div className="mt-16 w-full max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-10">
            Matched Opportunities
          </h3>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {uploadResult.jobMatches.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 hover:shadow-2xl transition duration-300"
              >
                <h4 className="text-lg font-semibold text-slate-800 mb-2">
                  {job.job_title}
                </h4>

                <p className="text-slate-500 text-sm mb-4">
                  {job.employer_name} • {job.job_city} •{" "}
                  {job.job_employment_type}
                </p>

                <a
                  href={job.job_apply_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && uploadResult?.jobMatches?.length === 0 && (
        <div className="mt-8 text-slate-500 text-center">
          No job matches found for this resume.
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 py-6 text-sm text-slate-500 text-center">
        © 2026 ResumeAI. Built with AI.
      </footer>

    </div>
  );
}

export default App;