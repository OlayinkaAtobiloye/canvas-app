import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { CanvasApp } from './pages/canvas-app';


function App(props) {
  
 
  
  return (
    <div className="App">
      <CanvasApp/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    state: state
  };
};

const mapDispatchToProps = (dispatch) => {
return {
  setState: (state) => dispatch({type: "SET_STATE", state: state})
};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
