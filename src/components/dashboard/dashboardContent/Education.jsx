import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import useContexts from "../../../hooks/useContexts";
import axiosClient from "../../../utils/axios";

function Education() {
  const [isEditing, setIsEditing] = useState(false);
  const [educationInfo, setEducationInfo] = useState({
    educationLevel: "",
    examTitle: "",
    institutionName: "",
    currentlyStudying: false,
    passingYear: "",
    approximatePassingYear: "",
    currentYear: "",
  });

  const { userInfo, setUserInfo } = useContexts();
  const { education = {} } = userInfo;

  // load education information if exist
  useEffect(() => {
    setEducationInfo({ ...educationInfo, ...education });
  }, [userInfo]);

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEducationInfo((prevState) => {
      if (type === "checkbox") {
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

  // function to submitting form data
  const handleSubmit = (e) => {
    console.log(educationInfo);
    e.preventDefault();
    axiosClient
      .put("/add-education", educationInfo)
      .then(({ data }) => {
        console.log(data);
        setUserInfo(data);
        toggleEdit();
      })
      .catch(console.log);
  };

  return (
    <div className="education p-5 m-5 mx-auto">
      <div className="d-flex justify-content-between align-items-start flex-md-row flex-column py-3 mb-3">
        <h3>Education</h3>
        <button
          className="btn btn-primary d-flex align-items-center"
          onClick={toggleEdit}
        >
          <AiFillEdit />
          <span className="mx-2">Edit</span>
        </button>
      </div>
      {isEditing ? (
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Your Education level</strong>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Bachelor/Masters"
              name="educationLevel"
              value={educationInfo.educationLevel}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Exam/Degree Title</strong>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Exam/Degree Title"
              name="examTitle"
              value={educationInfo.examTitle}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Institution Name</strong>
            </label>
            <input
              type="text"
              name="institutionName"
              value={educationInfo.institutionName}
              className="form-control"
              onChange={handleInputChange}
              placeholder="Institution Name"
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="checkbox"
              name="currentlyStudying"
              className="me-2"
              id="currently_studying"
              onChange={handleInputChange}
              checked={educationInfo.currentlyStudying}
            />
            <label htmlFor="currently_studying" className="mb-2 ">
              <strong>Currently studying</strong>
            </label>
          </div>

          {!educationInfo?.currentlyStudying ? (
            <div className="col-lg-6 mb-3">
              <label htmlFor="currently_studying" className="mb-2 d-block">
                <strong className="">Passing year</strong>
              </label>
              <input
                type="number"
                placeholder="Select a Year"
                className="mb-2 d-block form-control"
                name="passingYear"
                step="1"
                value={educationInfo.passingYear || "N/A"}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <>
              <div className="col-lg-6 mb-3">
                <label htmlFor="currently_studying" className="mb-2 d-block">
                  <strong className="">Approximate Passing year</strong>
                </label>
                <input
                  type="number"
                  placeholder="Year"
                  className="mb-2 d-block form-control"
                  name="approximatePassingYear"
                  step="1"
                  value={educationInfo.approximatePassingYear || "N/A"}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="" className="mb-2 d-block">
                  <strong className="">Current year</strong>
                </label>

                <select
                  className="mb-2 d-block form-control"
                  name="currentYear"
                  onChange={handleInputChange}
                  defaultValue={educationInfo.currentYear}
                >
                  <option value="" disabled>
                    -Select Year-
                  </option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                </select>
              </div>
            </>
          )}

          <div className="mt-4 row-gap-2 d-md-block d-flex flex-column">
            <button
              style={{ width: "135px" }}
              type="submit"
              className="btn btn-primary px-5"
            >
              Save
            </button>
            <button
              style={{ width: "135px" }}
              className="btn btn-outline-secondary px-5 mx-md-3"
              onClick={toggleEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="row">
          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Education level</strong>
            </label>
            <span className="py-2 px-3 d-block">
              {educationInfo.educationLevel || "N/A"}
            </span>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Exam/Degree Title</strong>
            </label>
            <span className="py-2 px-3 d-block">
              {educationInfo.examTitle || "N/A"}
            </span>
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Institution name</strong>
            </label>
            <span className="py-2 px-3 d-block">
              {educationInfo.institutionName || "N/A"}
            </span>
          </div>
          {!educationInfo?.currentlyStudying ? (
            <div className="col-12 mb-3">
              <label htmlFor="" className="mb-2 d-block">
                <strong>Passing year</strong>
              </label>
              <span className="py-2 px-3 d-block">
                {educationInfo.passingYear || "N/A"}
              </span>
            </div>
          ) : (
            <>
              <div className="col-lg-6 mb-3">
                <label htmlFor="" className="mb-2 d-block">
                  <strong>Approximate Passing year</strong>
                </label>
                <span className="py-2 px-3 d-block">
                  {educationInfo.approximatePassingYear || "N/A"}
                </span>
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="" className="mb-2 d-block">
                  <strong>Current year</strong>
                </label>
                <span className="py-2 px-3 d-block">
                  {educationInfo.currentYear || "N/A"}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Education;
