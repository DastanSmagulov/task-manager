import React, { useState, useEffect, useMemo } from "react";
import ModalWrapper from "./ModalWrapper";
import { FaTimes } from "react-icons/fa";
import "../../../../styles/TaskFormModal.scss";
import { Task, TaskStatus } from "../../../../entities/task/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Partial<Task>) => void;
  initial?: Partial<Task>;
}

const defaultInitial = {
  title: "",
  description: "",
  status: "pending" as TaskStatus,
};

const TaskFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  initial,
}) => {
  // Memoize the initial values so the reference remains the same unless `initial` changes.
  const initialValues = useMemo(() => initial || defaultInitial, [initial]);

  const [title, setTitle] = useState(initialValues.title);
  const [description, setDescription] = useState(initialValues.description);
  const [status, setStatus] = useState<TaskStatus>(
    initialValues.status || "pending"
  );

  useEffect(() => {
    if (isOpen) {
      setTitle(initialValues.title);
      setDescription(initialValues.description);
      setStatus(initialValues.status || "pending");
    }
  }, [isOpen, initialValues]);

  const handleSave = () => {
    onSubmit({
      ...initialValues,
      title: title?.trim(),
      description: description?.trim(),
      status,
    });
  };

  return (
    <ModalWrapper isOpen={isOpen} onRequestClose={onClose}>
      <div className="form-header">
        <h3>
          {initialValues && initialValues.hasOwnProperty("id")
            ? "Edit Task"
            : "New Task"}
        </h3>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <div className="form-body">
        <input
          type="text"
          placeholder="Title"
          style={{ width: "90%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          style={{ width: "90%" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="form-actions">
        <button
          className="btn confirm"
          onClick={handleSave}
          disabled={!title?.trim()}
        >
          {initial && initial.hasOwnProperty("id") ? "Save" : "Create"}
        </button>
        <button className="btn cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
};

export default TaskFormModal;
