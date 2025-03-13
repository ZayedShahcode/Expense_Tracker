import { useState } from "react"

export const Login = () => {

    const [signUp,setSignUp] = useState(true);

  return (
    <div className="grid place-items-center h-[90vh]">
        <div className="flex flex-col items-center border border-[#0092FB] h-auto w-[70vw] md:w-96 rounded-xl  bg-gradient-to-r from-blue-500 to-[#0092FB]">
            <h1 className="text-white font-bold text-3xl mt-4 ">{signUp?<>Register</>:<>Welcome back</>}</h1>
            <div className="flex flex-col gap-4 items-center justify-around mt-8 ">
                {signUp?<input type="text"  className="border border-black bg-gray-200 w-56 h-8 m-4 p-2 " placeholder="Username"/>:<></>}
                <input type="email"  className="border border-black bg-gray-200 w-56 h-8 m-4 p-2 " placeholder="Email"/>
                <input type="password" className="border border-black bg-gray-200 w-56 h-8 m-4 p-2" placeholder="Password" />
                {signUp?
                <button type="submit" className="w-20 h-8  bg-white text-[#0092FB] font-medium rounded-lg cursor-pointer">SignUp</button>:
                <button type="submit" className="w-20 h-8  bg-white text-[#0092FB] font-medium rounded-lg cursor-pointer">Login</button>  
            }
            </div>
          
            <div className="text-white text-xs my-4 font-medium cursor-pointer" onClick={()=>setSignUp(()=>!signUp)}>{signUp?<>Already have an account? Login</>:<>New User? SignUp</>}</div>
           
        </div>
    </div>
  )
}
