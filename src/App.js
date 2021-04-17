import "./App.css";
import React from "react";
import store from './reduxStore';
import { Header, GroupAndSearchTool, TodoTabs } from './components';
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App ">
        <Header />
        <GroupAndSearchTool />
        <TodoTabs />
      </div>
    </Provider>
  );
}

export default App;
