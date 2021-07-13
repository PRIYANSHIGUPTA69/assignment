import logo from './logo.svg';
import './App.css';
import MainPage from './component/MainPage';
import {BrowserRouter , Route} from 'react-router-dom'
import Books from './component/Books';
import Appbar from './component/Appbar';
import ItemsDetails from './component/ItemsDetails';
function App() {
  return (
    <div >
      <>
      
   <BrowserRouter>
      <Appbar></Appbar>
        <Route path='/books' component={Books}></Route>
        <Route path='/' component={MainPage}></Route>
     </BrowserRouter>
      </>
    </div>
  );
}

export default App;
