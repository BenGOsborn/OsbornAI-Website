import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

const Inc = (props) => {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="Inc">
      <p>{count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const Hello = (props) => {
  return (
    <div className="Hello">
      <h1>Hello world!</h1>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/hello">Hello</NavLink></li>
      </ul>
      <Switch>
        <Route exact path="/">
          <Inc />
        </Route>
        <Route exact path="/hello">
          <Hello />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
