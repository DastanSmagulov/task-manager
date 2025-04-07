import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Task, TaskStatus } from "../../../entities/task/types";
import { fetchTasks, deleteTask, updateTask, createTask } from "../api/taskApi";
import {
  FaEdit,
  FaTrash,
  FaHourglassStart,
  FaSpinner,
  FaCheckCircle,
  FaFilter,
  FaUndo,
  FaPlus,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "../../../styles/TaskList.scss";
import TaskFormModal from "./modals/TaskFormModal";
import ModalWrapper from "./modals/ModalWrapper";
import Pagination from "../../../shared/components/Pagination";

const statusIcon = {
  pending: <FaHourglassStart />,
  in_progress: <FaSpinner />,
  completed: <FaCheckCircle />,
};

const TaskList: React.FC = () => {
  // API data and pagination state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter and sort state
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const [sortBy, setSortBy] = useState<
    "created_at" | "updated_at" | "title" | "status"
  >("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Modal and editing state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const params = {
        page,
        limit: itemsPerPage,
        status: statusFilter,
        sortBy,
        order: sortOrder,
      };

      const res = await fetchTasks(params);
      setTasks(res.items);
      setTotalTasks(res.total);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, itemsPerPage, statusFilter, sortBy, sortOrder]);

  // Reset filter values and pagination
  const resetFilters = () => {
    setStatusFilter("");
    setSortBy("created_at");
    setSortOrder("asc");
    setPage(1);
  };

  // Create new task then refresh list
  const handleCreate = async (task: Partial<Task>) => {
    try {
      await createTask(task);
      toast.success("Created");
      setIsFormOpen(false);
      setPage(1);
      fetchData();
    } catch (err) {
      console.error("Create task error:", err);
      toast.error("Create failed");
    }
  };

  // Update existing task then refresh the list
  const handleUpdate = async (task: Task) => {
    try {
      await updateTask(task.id, task);
      toast.success("Updated");
      setEditing(null);
      setIsFormOpen(false);
      fetchData();
    } catch (err: any) {
      console.error("Update task error:", err);
      if (err.response?.status === 403) {
        toast.error("You are not allowed to edit this task");
      } else {
        toast.error("Update failed");
      }
    }
  };

  // Prepare deletion then refresh list after delete
  const confirmDelete = async (id: string) => {
    try {
      await deleteTask(id);
      toast.success("Deleted");
      fetchData();
    } catch (err: any) {
      console.error("Delete task error:", err);
      if (err.response?.status === 403) {
        toast.error("You are not allowed to delete this task");
      } else {
        toast.error("Delete failed");
      }
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="task-list">
      <div className="header">
        <h2>Tasks</h2>
        <button
          className="btn new"
          onClick={() => {
            setEditing(null);
            setIsFormOpen(true);
          }}
        >
          <FaPlus /> New
        </button>
      </div>

      <div className="controls">
        <FaFilter />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as TaskStatus | "");
            setPage(1);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(
              e.target.value as "created_at" | "updated_at" | "title" | "status"
            );
            setPage(1);
          }}
        >
          <option value="created_at">Created</option>
          <option value="updated_at">Updated</option>
          <option value="title">Title</option>
          <option value="status">Status</option>
        </select>
        <button
          className="btn sort-order"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
        </button>
        <button className="btn reset" onClick={resetFilters}>
          <FaUndo />
        </button>
      </div>

      <ul className="list">
        {tasks.map((t) => (
          <li key={t.id}>
            <Link to={`/tasks/${t.id}`} className="title">
              {statusIcon[t.status]} {t.title}
            </Link>
            <div className="actions">
              <button
                onClick={() => {
                  setEditing(t);
                  setIsFormOpen(true);
                }}
              >
                <FaEdit />
              </button>
              <button onClick={() => setDeleting(t.id)}>
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        page={page}
        totalPages={Math.ceil(totalTasks / itemsPerPage)}
        itemsPerPage={itemsPerPage}
        onPageChange={(newPage) => setPage(newPage)}
        onItemsPerPageChange={(newItems) => {
          setItemsPerPage(newItems);
          setPage(1);
        }}
      />

      <TaskFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(taskData) => {
          if (editing) {
            handleUpdate({ ...(editing as Task), ...taskData } as Task);
          } else {
            handleCreate(taskData);
          }
        }}
        initial={editing || undefined}
      />

      <ModalWrapper
        isOpen={!!deleting}
        onRequestClose={() => setDeleting(null)}
      >
        <p className="delete-text">Are you sure you want to delete?</p>
        <div className="form-actions">
          <button
            className="btn confirm"
            onClick={() => confirmDelete(deleting!)}
          >
            Yes
          </button>
          <button className="btn cancel" onClick={() => setDeleting(null)}>
            No
          </button>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default TaskList;
