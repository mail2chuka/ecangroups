import Layout from "@/components/Layout";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getError } from "../../utils/error";

export default function LoginScreen(params) {
  const initialState={
    email:"",
    password:"",
  }
    const [state, setState]=useState(initialState);
const [pass, setPassword] = useState("");
  
  const [passwordVisible, setPasswordVisible] = useState(false);
 

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

  };
 

  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

   const handleChange= (event)=>{
    const {name, value}=event.target;
    setState({...state,[name]:value,})
  }
  const{email, password}=state;
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("email:",email, "pass",password)
    try {
       const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
      console.log("sign in successful")
      if (result.error) {
       console.log("error", result.error);
      } 
    } catch (err) {
      console.log(getError(err));
    }
  };

  return (
    <Layout>
          <div className="h-screen p-6 bg-black bg-opacity-70 ">
      <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>
      <form
        className="max-w-xl  mx-auto p-6 bg-black bg-opacity-70 rounded-md border border-white"
        onSubmit={submitHandler}
      >
      <div className="mb-4">
          <label
            className="block text-white text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full p-2 border-b-2 border-yellow-300 bg-transparent focus:outline-none focus:border-white"
            type="email"
            id="email"
            name="email"
            onChange={(e)=>{handleChange(e)}}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="w-full p-2 border-b-2 border-yellow-300 bg-transparent focus:outline-none focus:border-white"
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e)=>{handlePasswordChange(e)
                handleChange(e)}}
              required
            />
            <span
              className="absolute top-0 right-0 mt-2 mr-2 text-white cursor-pointer focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        

        {/* ... other form fields ... */}

        <button
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
          type="submit"
          disabled={""}
        >
          Login
        </button>
        <div>Dont have an Account?{" "} <Link href="/register"><span className="text-yellow-300 font-semibold"> Register here</span></Link> </div>
              </form>
              </div>
    </Layout>
  );
};
