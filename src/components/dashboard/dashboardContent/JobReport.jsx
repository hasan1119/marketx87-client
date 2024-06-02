import JoditEditor from 'jodit-react';
import { useEffect, useRef, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import useContexts from '../../../hooks/useContexts';
import axiosClient from '../../../utils/axios';

function JobReport() {
  const { userInfo, setUserInfo } = useContexts();
  const navigator = useNavigate();
  const { job = {} } = userInfo;
  const [isEditing, setIsEditing] = useState(false);

  const [content, setContent] = useState('');
  const [jobReport, setJobReport] = useState({
    jobTitle: '',
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyPhone: '',
    applicationMethod: '',
    jobIndustry: '',
    jobDescription: '',
    appointmentDate: '',
  });

  useEffect(() => {
    setJobReport({ ...jobReport, ...job });
  }, [userInfo]);

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setJobReport((prevState) => {
      if (type === 'checkbox') {
        return {
          ...prevState,
          [name]: checked, // Update the state with the checkbox's checked status
        };
      } else {
        return {
          ...prevState,
          [name]: value, // Update the state for other input elements
        };
      }
    });
  };

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // handleSubmit
  function handleSubmit(e) {
    e.preventDefault();
    axiosClient
      .post('/create-job-report', { ...jobReport, jobDescription: content })
      .then(({ data }) => {
        console.log(data);
        setUserInfo(data);
        toggleEdit();
      })
      .catch(({ response }) => {
        console.log(response.status);
        if (response.status === 401) {
          setUserInfo({});
          navigator('/login');
        } else {
          console.log(response);
        }
      });
  }

  return (
    <div className="job_report  p-5 m-5 mx-auto">
      <div className="d-flex justify-content-between py-3 mb-3">
        <h3>Job Report</h3>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={toggleEdit}
        >
          <AiFillEdit />
          <span className="mx-2">Edit</span>
        </button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="row">
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Job Title</strong>
            </label>
            <input
              type="text"
              name="jobTitle"
              value={jobReport.jobTitle}
              className="form-control"
              onChange={handleInputChange}
              placeholder="Example: QA"
              required
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Company Name</strong>
            </label>
            <input
              type="text"
              name="companyName"
              value={jobReport.companyName}
              className="form-control"
              onChange={handleInputChange}
              placeholder="Example: Google Inc"
              required
            />
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Company Address</strong>
            </label>
            <textarea
              type="text"
              name="companyAddress"
              value={jobReport.companyAddress}
              className="form-control"
              placeholder="Company address"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Company Phone</strong>
            </label>
            <input
              type="text"
              name="companyPhone"
              value={jobReport.companyPhone}
              className="form-control"
              placeholder="Company phone number"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Company Email</strong>
            </label>
            <input
              type="email"
              name="companyEmail"
              value={jobReport.companyEmail}
              className="form-control"
              placeholder="Company email address"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong className="">Application method</strong>
            </label>
            <select
              className="mb-2 d-block form-control"
              name="applicationMethod"
              onChange={handleInputChange}
              value={jobReport.applicationMethod}
              required
            >
              <option value="" disabled selected>
                -Select application method-
              </option>
              <option value="Department Introduction">
                Department Introduction
              </option>
              <option value="Employment Division Introduction">
                Employment Division Introduction
              </option>
              <option value="Free Application">Free Application</option>
              <option value="Connections">Connections</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong className="">Job Industry</strong>
            </label>

            <select
              className="mb-2 d-block form-control"
              name="jobIndustry"
              value={jobReport.jobIndustry}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled selected>
                -Select Job Industry-
              </option>
              <option value="Trending company/Retail trade ">
                Trending company/Retail trade
              </option>
              <option value="IT Industry">IT Industry</option>
              <option value="Food Industry">Food Industry</option>
              <option value="Housing/Real State/Construction">
                Housing/Real State/Construction
              </option>
              <option value="Service Industry">Service Industry</option>
              <option value="Mass Communication Industry">
                Mass Communication Industry
              </option>
              <option value="Manufacturing Industry">
                Manufacturing Industry
              </option>
              <option value="Finance SEcurities">Finance SEcurities</option>
              <option value="Agriculture/Forestry/Fisheries">
                Agriculture/Forestry/Fisheries
              </option>
              <option value="Education">Education</option>
              <option value="Civil Servant">Civil Servant</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="col-12 mb-3 blog">
            <label htmlFor="currently_studying" className="mb-2 ">
              <strong>Job Description </strong>
            </label>

            <JoditEditor
              value={jobReport.jobDescription}
              tabIndex={1}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 ">
              <strong>Appointment Date</strong>
            </label>
            <input
              type="date"
              required
              name="appointmentDate"
              className="appointment_date form-control"
              value={jobReport.appointmentDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary px-5">
              Save
            </button>
            <button
              className="btn btn-outline-secondary px-5 mx-3"
              onClick={toggleEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : job?._id ? (
        <div className="row">
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Job Title</strong>
            </label>
            <span className="py-2 px-3 d-block">{job.jobTitle}</span>
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Company Name</strong>
            </label>
            <span className="py-2 px-3 d-block">{job.companyName}</span>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Company Address</strong>
            </label>
            <span className="py-2 px-3 d-block">{job.companyAddress}</span>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Company Phone</strong>
            </label>
            <span className="py-2 px-3 d-block">{job.companyPhone}</span>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Company Email</strong>
            </label>
            <span className="py-2 px-3 d-block">{job.companyEmail}</span>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Application Method</strong>
            </label>
            <span className="py-2 px-3 d-block">{job.applicationMethod}</span>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Job Industry</strong>
            </label>
            <span className="py-2 px-3 d-block">{job.jobIndustry}</span>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Job Description</strong>
            </label>
            {/* <span className="py-2 px-3 d-block">{job.jobDescription}</span> */}
            <span
              className="py-2 px-3 d-block"
              dangerouslySetInnerHTML={{ __html: job.jobDescription }}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Appointment Date</strong>
            </label>
            <span className="py-2 px-3 d-block">{job.appointmentDate}</span>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Job Status</strong>
            </label>
            <span className="py-2 px-3 d-block">{job.status}</span>
          </div>
        </div>
      ) : (
        <p>Report not added</p>
      )}
    </div>
  );
}

export default JobReport;
