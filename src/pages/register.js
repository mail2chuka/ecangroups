import Layout from "@/components/Layout";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getError } from "../../utils/error";
import axios from "axios";


export default function Register(params) {

  const initialState={
        fname:'',
        surname:'',
        email:'',
        phone:'',
        residence:'',
        password:'',
  }

  const [state, setState]=useState(initialState)
    
  const [pass, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible(!repeatPasswordVisible);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (repeatPassword && event.target.value !== repeatPassword) {
      setPasswordMatchError("Passwords do not match");setState((state)=>{
        return {...state, password:""};
      });
    } else {
      setPasswordMatchError("");
      setState((state)=>{
        return {...state, password:event.target.value};
      });
    } 
  };
  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
    if (pass && event.target.value !== pass) {
      setPasswordMatchError("Passwords do not match");
       setState((state)=>{
        return {...state, password:""};
      });
    } else {
      setPasswordMatchError("");
       setState((state)=>{
        return {...state, password:event.target.value};
      });
    }
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
  const { fname, surname, email, phone, residence, password }= state;
  const submitHandler = async (event) => {
    event.preventDefault()
    try { 
      console.log(fname,surname,email,phone,residence,);
      await axios.post('./api/auth/signup', {
        fname,
        surname,
        email,
        phone,
        residence,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
       console.log(result.error);
      }
    } catch (err) {
      console.log(getError(err));
    }
  };
 

  return (
    <Layout title="Sign-Up">
       <div className="h-screen p-6 bg-black bg-opacity-70 ">
      <h1 className="text-3xl font-bold mb-4 text-center">New User Registration</h1>
      <form
        className="max-w-xl mx-auto p-6 bg-black bg-opacity-70 rounded-md "
        onSubmit={submitHandler}
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-semibold mb-2"
            htmlFor="fname"
          >
            First Name
          </label>
          <input
            className="w-full p-2 border-b-2 border-yellow-300 bg-transparent focus:outline-none focus:border-white"
            type="text"
            id="fname"
            name="fname"
          onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-semibold mb-2"
            htmlFor="surname"
          >
            Surname
          </label>
          <input
            className="w-full p-2 border-b-2 border-yellow-300 bg-transparent focus:outline-none focus:border-white"
            type="text"
            id="surname"
            name="surname"
          onChange={handleChange}
          />
        </div>

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
          onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-semibold mb-2"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            className="w-full p-2 border-b-2 border-yellow-300 bg-transparent focus:outline-none focus:border-white"
            type="tel"
            id="phone"
            name="phone"
          onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-semibold mb-2"
            htmlFor="residence"
          >
            State of Residence
          </label>
          <input
            className="w-full p-2 border-b-2 border-yellow-300 bg-transparent focus:outline-none focus:border-white"
            type="text"
            id="residence"
            name="residence"
          onChange={handleChange}
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
              onChange={handlePasswordChange}
                         />
            <span
              className="absolute top-0 right-0 mt-2 mr-2 text-white cursor-pointer focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-semibold mb-2"
            htmlFor="repeatPassword"
          >
            Repeat Password
          </label>
          <div className="relative">
            <input
              className="w-full p-2 border-b-2 border-yellow-300 bg-transparent focus:outline-none focus:border-white"
              type={repeatPasswordVisible ? "text" : "password"}
              id="repeatPassword"
              name="repeatPassword"
              value={repeatPassword}
              onChange={handleRepeatPasswordChange}
           
            />
            <span
              className="absolute top-0 right-0 mt-2 mr-2 text-white cursor-pointer focus:outline-none"
              onClick={toggleRepeatPasswordVisibility}
            >
              {repeatPasswordVisible ? "🙈" : "👁️"}
            </span>
          </div>
          {passwordMatchError && (
            <p className="text-red-500 text-sm mt-1">{passwordMatchError}</p>
          )}
        </div>

        {/* ... other form fields ... */}
{state.password}
        <button
          className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
          type="submit"
        
        >
          Register
        </button>
        <div>If you already have an account, {" "} <Link href="/login"><span className="text-yellow-300 font-semibold"> Login Here</span></Link> </div>
        
      </form></div>
    </Layout>
  );
};
