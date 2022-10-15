import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { CanvasApp } from './pages/canvas-app';
import io from "socket.io-client";





function App(props) {
  useEffect(() => {
    const socket = io.connect("http://localhost:5000");
    // socket = io("http://localhost:5000", {transports: ["websocket"]});
    //  { transports: ["websocket", "polling", "flashsocket"] }
    // socket = io.connect("http://localhost:5000");
    // socket = io("localhost:5000/", {
    //   transports: ["polling"],
    //   cors: {
    //     origin: "http://localhost:3000/",
    //   },
    // });
    // listen for chat events
    socket.on("chat", (chat) => {
      // when we recieve a chat, add it into our messages array in state
      console.log(chat)
  })
    console.log(socket)
    socket.on('connect', function() { socket.emit('my event', {data: 'I\'m connected!'})});
    socket.on('change', (state) => {console.log(socket); props.setState(state)});
    socket.emit('change', { state: props.state });
    return (() => {
            socket.disconnect()
        })
  }, []);

  
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
