import { Link } from 'react-router-dom';
import { ExpenseList } from '../components/ExpenseList';
import { ExpenseTracker } from '../components/ExpenseTracker';




export const Dashboard = () => {

  const date = new Date();
  return (
    <div className='flex flex-col h-full  p-2 m-2 max-w-5xl lg:ml-24 xl:ml-32' >
        <div className='flex items-center justify-between p-3 lg:mx-18 lg:px-10  m-2 h-[15%]'>
            <div className='flex flex-col gap-2 '>
                <h1 className='text-[#0092FB] font-bold text-2xl lg:text-3xl'>Welcome</h1>
                <p className=' font-medium text-[#685D5D] ml-1 '>Date: {date.toLocaleDateString()}</p>
            </div>
            <Link to="/add"><button  className='border border-[#0092FB] font-bold w-16 sm:w-20 sm:h-10 sm:text-lg lg:w-28 h-8 lg:h-12 rounded-xl text-[#0092FB] lg:mr-14 lg:text-xl cursor-pointer hover:bg-stone-200'>Add</button></Link>
        </div>
        <ExpenseTracker/>
        <ExpenseList/>
        

    </div>
  )
}
