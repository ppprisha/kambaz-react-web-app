import {
  MdDoNotDisturbAlt,
  MdOutlineAnalytics,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { FaCheck, FaClipboardList, FaDatabase, FaBullhorn } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoHomeOutline, IoNewspaper } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function CourseStatus() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      {currentUser?.role === "FACULTY" && (
        <>
          <h2>Course Status</h2>
          <div className="d-flex">
            <div className="w-50 pe-1">
              <button className="btn btn-lg btn-secondary w-100 text-nowrap">
                <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
              </button>
            </div>
            <div className="w-50">
              <button className="btn btn-lg btn-success w-100">
                <FaCheck className="me-2 fs-5" /> Publish
              </button>
            </div>
          </div>
          <br />
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <BiImport className="me-2 fs-5" /> Import Existing Content
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <IoHomeOutline className="me-2 fs-5" /> Choose Home Page
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <IoNewspaper className="me-2 fs-5" /> View Course Stream
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <FaBullhorn className="me-2 fs-5" /> New Announcement
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <MdOutlineAnalytics className="me-2 fs-5" /> Course Analytics
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <MdOutlineNotificationsActive className="me-2 fs-5" /> View Notifications
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <FaClipboardList className="me-2 fs-5" /> View Assignments
          </button>
          <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
            <FaDatabase className="me-2 fs-5" /> Manage Course Data
          </button>
        </>
      )}
    </div>
  );
}
