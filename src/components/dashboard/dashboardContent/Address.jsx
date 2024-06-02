import { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import useContexts from '../../../hooks/useContexts';
import axiosClient from '../../../utils/axios';

function Address() {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo, setUserInfo } = useContexts();
  const { address = {} } = userInfo;

  const [addressLocal, setAddressLocal] = useState({
    present: {
      country: '',
      city: '',
      street: '',
    },
    permanent: {
      country: '',
      city: '',
      street: '',
    },
  });

  // load address information if exist
  useEffect(() => {
    setAddressLocal({ ...addressLocal, ...address });
  }, [userInfo]);

  const { present, permanent } = addressLocal;
  // Function to handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddressLocal({
      ...addressLocal,
      [name.split('-')[0]]: {
        ...addressLocal[name.split('-')[0]],
        [name.split('-')[1]]: value,
      },
    });
  };

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to submitting form data
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosClient
      .put('/add-address', addressLocal)
      .then(({ data }) => {
        console.log(data);
        setUserInfo(data);
        toggleEdit();
      })
      .catch(console.log);
  };
  return (
    <div className="address p-5 m-5 mx-auto">
      <div className="d-flex justify-content-between py-3 mb-3">
        <h3>Address</h3>
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
          <div className="mb-3">
            <h4>Present Address:</h4>
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Your Country:</strong>
            </label>

            <input
              type="text"
              name="present-country"
              value={present.country}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Your City:</strong>
            </label>
            <input
              type="text"
              name="present-city"
              value={present.city}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-lg-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Street Address:</strong>
            </label>
            <textarea
              name="present-street"
              value={present.street}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="mb-3 mt-5">
            <h4>Permanent Address:</h4>
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Your Country:</strong>
            </label>
            <input
              type="text"
              name="permanent-country"
              value={permanent.country}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Your City:</strong>
            </label>
            <input
              type="text"
              name="permanent-city"
              value={permanent.city}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-lg-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Street Address:</strong>
            </label>
            <textarea
              name="permanent-street"
              value={permanent.street}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          {/* Add more input fields for other information */}
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
      ) : (
        <div className="row">
          <div className="mb-3">
            <h4>Present Address:</h4>
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Your Country</strong>
            </label>
            <span className="py-2 px-3 d-block">
              {present.country || 'N/A'}
            </span>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Your City</strong>
            </label>
            <span className="py-2 px-3 d-block">{present.city || 'N/A'}</span>
          </div>
          <div className="col mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Street Address</strong>
            </label>
            <span className="py-2 px-3 d-block">{present.street || 'N/A'}</span>
          </div>

          <div className="mb-3 mt-5">
            <h4>Permanent Address:</h4>
          </div>

          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Your Country</strong>
            </label>
            <span className="py-2 px-3 d-block">
              {permanent.country || 'N/A'}
            </span>
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Your City</strong>
            </label>
            <span className="py-2 px-3 d-block">{permanent.city || 'N/A'}</span>
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="" className="mb-2 d-block">
              <strong>Street Address</strong>
            </label>
            <span className="py-2 px-3 d-block">
              {permanent.street || 'N/A'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Address;
