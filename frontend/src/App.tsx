import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ExpenseProvider } from './context/ExpenseContext';
import { AddExpense } from './pages/AddExpense';
import { Reports } from './pages/Reports';


function App() {
  return(
    <ExpenseProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='add' element={<AddExpense/>}/>
          <Route path='reports' element={<Reports/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </ExpenseProvider>
  )
}

export default App
