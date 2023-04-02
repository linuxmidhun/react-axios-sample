import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import StudentList from './components/StudentList';
import StudentAdd from './components/StudentAdd';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={StudentList} />
          <Route path='/new' element={<StudentAdd data={{ id: 0, name: '', grade: '' }} method="post" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
