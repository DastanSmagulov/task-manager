import React from "react";
import TaskList from "../features/task/ui/TaskList";
import Header from "../shared/components/Header";

const TaskPage: React.FC = () => {
  return (
    <>
      <Header />
      <TaskList />
    </>
  );
};

export default TaskPage;
