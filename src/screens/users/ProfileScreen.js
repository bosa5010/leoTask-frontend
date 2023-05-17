import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailsUser,
  updateUserProfile,
} from "../../redux/actions/userActions";

import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";
import { ActionStatus } from "../../components/ActionStatus";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      setTimeout(function () {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
      }, 2000);

      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [dispatch, successUpdate]);

  useEffect(() => {
    if (userInfo._id) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setUserName(userInfo.userName);
      dispatch(detailsUser(userInfo._id));
    }
  }, [dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password && confirmPassword && newPassword) {
      dispatch(
        updateUserProfile({
          userId: user._id,
          password: password,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        })
      );
    }
  };

  return (
    <div>
      <form
        className="form"
        onSubmit={submitHandler}
        autocomplete="new-password"
      >
        <h1>User Profile</h1>
        <ActionStatus loading={loading} error={error} />
        <ActionStatus
          loading={loadingUpdate}
          error={errorUpdate}
          success={successUpdate}
          message={"User Password Updated Successfuly"}
        />
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            disabled={true}
            autoComplete="off"
          ></input>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            disabled={true}
            autocomplete="new-password"
          ></input>
        </div>
        <div>
          <label htmlFor="email">User Name</label>
          <input
            id="username"
            type="text"
            placeholder="Enter User Name"
            value={userName}
            disabled={true}
            autocomplete="new-password"
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            autocomplete="new-password"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            placeholder="Enter New password"
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="off"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            placeholder="Enter Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
            required
          ></input>
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
