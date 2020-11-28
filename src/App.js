/* eslint-disable */
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchBox from "./component/SearchBox";

function App() {
  return (
    <div className="App">
      <SearchBox />
    </div>
  );
}

export default App;

/*
1. 검색창
 => input / button / click event
2. 노래리스트 
 => href / click event / print
3. 가사나오는 곳
 => clikc event / print / parseJson
*/
