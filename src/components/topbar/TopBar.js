import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import { signout } from "../../redux/actions/userActions";
import SearchBox from "../SearchBox";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

export default function TopBar() {
  const [open, setOpen] = useState(Boolean(false));
  const userSignin = useSelector((state) => state.userSignin);

  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="row">
      <div>
        <Link className="brand" to="/">
          LeoTask
        </Link>
      </div>
      <div className="row">
        <Route
          render={({ history }) => <SearchBox history={history}></SearchBox>}
        ></Route>
      </div>
      <div>
        {userInfo ? (
          <div
            className="dropdown"
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div>
              <Link to="#" className="row">
                {userInfo.name}

                {open ? (
                  <IoMdArrowDropdownCircle size={"1.8rem"} />
                ) : (
                  <IoMdArrowDropupCircle size={"1.8rem"} />
                )}
              </Link>
            </div>
            {open && (
              <ul className="dropdown-content">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Log Out
                  </Link>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </div>
  );
}
