import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ExpenseProvider } from './context/ExpenseContext';
import { AddExpense } from './pages/AddExpense';
import { Reports } from './pages/Reports';
import {AuthProvider} from "./context/AuthContext.tsx";
import Profile from "./pages/Profile.tsx";


function App() {
  return(
    <AuthProvider >
    <ExpenseProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='add' element={<AddExpense/>}/>
          <Route path='reports' element={<Reports/>}/>
          <Route path={'profile'} element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ExpenseProvider>
    </AuthProvider>
  )
}

export default App
