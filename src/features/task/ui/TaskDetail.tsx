import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Task } from "../../../entities/task/types";
import { fetchTask } from "../api/taskApi";
import {
  FaArrowLeft,
  FaHourglassStart,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import "../../../styles/TaskDetail.scss";

const statusIcon = {
  pending: <FaHourglassStart />,
  in_progress: <FaSpinner />,
  completed: <FaCheckCircle />,
};

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) fetchTask(id).then(setTask).catch(console.error);
  }, [id]);

  if (!task) return <p>Loading…</p>;

  return (
    <div className="task-detail">
      <button className="btn back" onClick={() => nav("/tasks")}>
        <FaArrowLeft /> Back to tasks
      </button>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>
        Status: {statusIcon[task.status]}{" "}
        <strong>{task.status.replace("_", " ")}</strong>
      </p>
      <p>Created: {new Date(task.created_at + "").toLocaleString()}</p>
      <p>Updated: {new Date(task.updated_at + "").toLocaleString()}</p>
    </div>
  );
};

export default TaskDetail;
