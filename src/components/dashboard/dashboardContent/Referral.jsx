import moment from "moment";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa6";
import { LuCopyCheck } from "react-icons/lu";
import ReferVector from "../../../assets/images/refer.svg";
import useContexts from "../../../hooks/useContexts";

const Referral = () => {
  const { userInfo } = useContexts();
  const referrals = userInfo.referrals;
  const [isCopy, setCopy] = useState(false);

  return (
    <div className="ml-2 mt-2 p-md-5 p-2 w-100">
      <div className="row mb-5">
        <div className="col-md-8 col-12">
          <h3>রেফার করে ইনকাম করুন।</h3>
          <p>
            আপনার বন্ধুদের রেফার করে আপনি প্রতি সফল রেফারের জন্য ৫ টাকা ইনকাম
            করেতে পারবেন।
          </p>
          <div
            className="d-inline-flex text-white justify-content-between py-2 ps-3"
            style={{ background: "#3a3a3a" }}
          >
            <p className="m-0">{`${location.origin}/register?refer=${userInfo.username}`}</p>
            <CopyToClipboard
              text={`${location.origin}/register?refer=${userInfo.username}`}
            >
              <button
                className="btn px-2 py-0 mx-2"
                onClick={() => setCopy(true)}
                style={{
                  background: "white",
                  color: "black",
                  borderRadius: "0",
                }}
              >
                {isCopy ? <LuCopyCheck /> : <FaCopy className="fs-5" />}
              </button>
            </CopyToClipboard>
          </div>
        </div>
        <div className="col-md-4 col-0">
          <img className="w-75" src={ReferVector} alt="" />
        </div>
      </div>
      <div className="">
        <h3 className="">Refer List</h3>
        <div className="table-responsive mt-3 w-100">
          <table
            className="table table-striped uniform-table"
            style={{ minWidth: "1000px" }}
          >
            <thead>
              <tr>
                <th style={{ width: "80px" }} scope="col">
                  #
                </th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals?.map((referral, index) => (
                <tr key={referral._id}>
                  <th scope="row">{index}</th>
                  <td>{`${referral.firstName} ${referral.lastName}`}</td>
                  <td>{referral.username || "N/A"}</td>
                  <td>{moment(referral?.createdAt).format("LLLL")}</td>
                  <td>{referral.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referral;
