import React, { useEffect, useState } from "react";
import { listTasks } from "../redux/actions/taskActions";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";

export default function SearchBox(props) {
  const [reference, setReference] = useState("");
  const taskList = useSelector((state) => state.taskList);
  const { tasks } = taskList;
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      tasks &&
      tasks.length > 0 &&
      reference.length === 10 &&
      tasks[0].reference === reference
    ) {
      props.history.push(`/subtask/${tasks[0]._id}/edit`);
    }
  }, [props.history, tasks, reference]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (reference.length === 10) {
      dispatch(listTasks({ reference }));
    } else
      props.history.push(`/taskslist/${reference.length > 0 ? reference : ""}`);
  };

  return (
    <form className="search" onSubmit={submitHandler}>
      <div>
        <input
          type="search"
          name="search"
          id="search"
          onChange={(e) => setReference(e.target.value)}
          autoComplete="new-password"
        ></input>
        <button type="submit">
          <FaSearch size={"1.6rem"} />
        </button>
      </div>
    </form>
  );
}
