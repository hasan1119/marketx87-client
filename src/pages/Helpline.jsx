import { BiPhoneCall } from "react-icons/bi";
import { BsTelegram } from "react-icons/bs";

const Helpline = () => {
  return (
    <div
      className="container mt-3"
      style={{
        minHeight: "",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="row w-100">
        <div className="col-md-6 col-12 d-flex justify-content-center flex-column">
          <h2 className="mb-md-5 mb-3">24/7 Support</h2>
          <div className="card py-2 px-2">
            <h3 className="card-header">Phone call</h3>
            <div className="mt-2 ms-2">
              <BiPhoneCall className="fs-5" /> 01978177837
            </div>
          </div>
          <div className="card py-2 mt-4 px-2">
            <h3 className="card-header">Join Telegram</h3>
            <div className="mt-2 ms-2 pb-1">
              <a target="_blank" href="https://t.me/marketx8" rel="noreferrer">
                {" "}
                <BsTelegram className="fs-5" /> https://t.me/marketx8
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12">
          <img
            className="w-100"
            src="https://img.freepik.com/premium-vector/contact-us-woman-with-headphones-microphone-with-computer_113065-280.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Helpline;
