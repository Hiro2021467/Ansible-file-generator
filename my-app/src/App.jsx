import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import "./pages/PlaybookEditor";
import PlaybookEditor from "./pages/PlaybookEditor";

function App() {
  return (
    <PlaybookEditor />
  );
}

export default App;