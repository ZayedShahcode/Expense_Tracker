import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Layout } from './pages/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { Login } from './pages/Login.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { ExpenseProvider } from './context/ExpenseContext.tsx';
import { AddExpense } from './pages/AddExpense.tsx';
import { Reports } from './pages/Reports.tsx';
import {AuthProvider} from "./context/AuthContext.tsx";
import Profile from "./pages/Profile.tsx";
import { EditExpense } from './pages/EditExpense.tsx';


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
          <Route path='edit' element={<EditExpense/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </ExpenseProvider>
    </AuthProvider>
  )
}

export default App