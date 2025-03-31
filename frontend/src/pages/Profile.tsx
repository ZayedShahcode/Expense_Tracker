import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {User} from "../context/AuthContext"

const Profile = () => {
    const { auth } = useAuth(); // Get the token from AuthContext
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = auth || localStorage.getItem("token"); // Use AuthContext or localStorage
                if (!token) {
                    setError("No token found. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await fetch("http://localhost:8080/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Send token in Auth header
                        "Content-Type": "application/json"
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data)
                setUser(data);
            } catch (err:any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [auth]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    console.log(user?.createdAt)
    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
            {user ? (
                <div className="mt-4">
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
};

export default Profile;