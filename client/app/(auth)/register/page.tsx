"use client"
import PasswordChecker from '@/features/register/components/PasswordChecker';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';


const BASE_URL = "http://localhost:4000/api"



function RegisterPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: ""
  });

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm((state) => ({...state, [name]: value}))
  };
  console.log(form)
  
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const data = {...form, password}
    const res = await axios.post(`${BASE_URL}/register`, data)
    console.log(res)

    if(res.status === 200) {
      router.push("/login");
      return;
    }
  }

  console.log(password);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Create an Account
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name='fullName'
              onChange={inputHandler}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              name='email'
              onChange={inputHandler}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white outline-none transition"
            />
          </div>

          <PasswordChecker password={password} setPassword={setPassword}/>


          <button
            onClick={submitHandler}
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-lg hover:shadow-blue-500/40"
          >
            Register
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>

  )
}

export default RegisterPage