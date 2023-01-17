
import './App.css';
import FetchAPI from './component/FetchAPI';
import Display from './component/Display';
import GetPosition from './component/GetPosition';
import { store } from './store/store';

import { useSelector, useDispatch} from 'react-redux';
import { createStore } from 'redux';


function App() {

  const data_App = useSelector(state => state.store_Data)

  return (
    <div className="App">
      <GetPosition></GetPosition>
      <FetchAPI></FetchAPI>
      { (JSON.stringify(data_App) === '[]')? null : <Display></Display>}

    </div>
  );
}

export default App;
