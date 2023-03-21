import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import StudentEdit from './components/StudentEdit';
import StudentList from './components/StudentList';
import StudentAdd from './components/StudentAdd';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={StudentList} />
          <Route path='/student/:id' Component={StudentEdit} />
          <Route path='/new' Component={StudentAdd} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
