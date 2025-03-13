import { Outlet,Link } from "react-router-dom"

export const Layout = () => {
  return (
    <>
        <div className="overflow-hidden min:h-screen ">
            <nav className="border border-black bg-[#0092FB] flex min-w-[340px] h-[10vh] items-center justify-between text-white">
                <h1 className="font-bold text-3xl m-4">Expencier</h1>
                <div className="flex gap-4 mr-4 font-medium" >
                    <Link to="/">Home</Link>
                    <Link to="/dashboard" >Dashboard</Link>
                    <Link to="/reports" >Reports</Link>
                    <Link to="/contact">Contact</Link>
                </div>
            </nav>
        <Outlet/>
        </div>
    </>
  )
}
