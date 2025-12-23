"use client";
import Image from "next/image"; // Note: You aren't using the next/image component
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useState
import defaultImage from "../../../assets/images/download.jpeg";
import axios from "axios";

const BASE_URL = "http://localhost:4000/";

function ProfilePage() {
    const router = useRouter();
    // 1. Use state to store the image URL. Default to null or a default image.
    const [fullImageUrl, setFullImageUrl] = useState<string | null>(null);

    // 2. Move ALL localStorage logic inside useEffect
    useEffect(() => {
        // This code now runs ONLY on the client-side
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return; // Stop execution if no token
        }

        const userImage = localStorage.getItem("userIMG");
        if (userImage) {
            setFullImageUrl(`${BASE_URL}${userImage}`);
        } else {
            // Set a fallback if no image is in storage
            setFullImageUrl(defaultImage.src); 
        }

    }, [router]); // Dependency array

    const InputImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return; // Make sure a file was selected

        const formData = new FormData();
        formData.append("profileImg", file);
        
        try {
            const res = await axios.put(`${BASE_URL}api/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            
            // // OPTIONAL: Update image on success
            const newImageUrl = res.data.imageUrl; // Assuming the server returns the new URL
            localStorage.setItem("userIMG", newImageUrl); // Update storage
            setFullImageUrl(`${BASE_URL}${newImageUrl}`); // Update state

            console.log(res);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // 3. Conditionally render or show a loader
    //    This prevents a "flash" of the wrong content
    if (!fullImageUrl) {
        return <div>Loading profile...</div>; // Or a loading spinner
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
            <div className="relative inline-block">
                
                {/* 4. Use the state variable in your img tag */}
                <img 
                    src={fullImageUrl} 
                    alt="Profile" 
                    className="w-28 h-28 rounded-full mx-auto border-4 border-blue-500 object-cover" 
                />
                
                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full text-xs hover:bg-blue-700 transition">
                    <input 
                        type="file" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // Make input invisible but clickable
                        onChange={InputImageHandler} 
                    />
                    ✏️
                </button>
            </div>

            <div className="mt-6 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                    FULL NAME : John Doe
                </h2>
                <p className="text-gray-600 text-sm">EMAIL : john.doe@example.com</p>
                <p className="text-gray-500 text-xs">Member since: Jan 2023</p>
            </div>
        </div>
    );
}

export default ProfilePage;