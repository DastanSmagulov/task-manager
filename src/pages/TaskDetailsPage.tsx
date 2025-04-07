import React from "react";
import Header from "../shared/components/Header";
import TaskDetail from "../features/task/ui/TaskDetail";

const TaskDetailsPage: React.FC = () => {
  return (
    <>
      <Header />
      <TaskDetail />
    </>
  );
};

export default TaskDetailsPage;
