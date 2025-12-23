"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const BASE_URL = "http://localhost:4000/api";

function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/login`, form);
            console.log(res.data);

            if (res.status === 200) {
                // Save token for authenticated requests
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userIMG", res.data.user.profileImg)
                router.push("/profile"); // or wherever you want after login
            } else {
                alert("Login failed. Please try again.");
            }
            } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-3xl font-semibold text-white text-center mb-6">
            Login
            </h2>

            <form onSubmit={submitHandler} className="space-y-5">
            <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                name="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={inputHandler}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white outline-none transition"
                />
            </div>

            <div>
                <label className="block text-sm text-gray-400 mb-2">Password</label>
                <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={inputHandler}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-white outline-none transition"
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-lg hover:shadow-blue-500/40"
            >
                Log In
            </button>
            </form>

            <p className="text-gray-400 text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
                Sign up
            </a>
            </p>
        </div>
        </div>
    );
}

export default LoginPage;
