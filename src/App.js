import "./App.css";
import React from "react";
import { Header, GroupAndSearchTool, TodoTabs } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <GroupAndSearchTool />
      <TodoTabs />
    </div>
  );
}

export default App;
