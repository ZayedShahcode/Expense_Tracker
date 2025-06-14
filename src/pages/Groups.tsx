import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GroupCard } from "../components/GroupCard";
// import { ExpenseType } from "../context/ExpenseContext";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface MemberExpense {
    memberId: string;
    username: string;
    totalPaid: number;
}

export interface Groups {
    groupId: string;
    createdById: string;
    groupName: string;
    memberExpenses: MemberExpense[];
}

interface NewGroup {
    groupName: string;
    createdByUserId: string;
    memberIds: string[]; 
   
}

export const Groups = () => {
    const { auth, user,fetchUserDetails } = useAuth();
    const [loading, setLoading] = useState(false);
    // const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const [groups, setGroups] = useState<Groups[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGroup, setNewGroup] = useState<NewGroup>({
        groupName: "",
        createdByUserId : user ? user.id : "",
        memberIds: []
    });
    const [memberInput, setMemberInput] = useState("");

    const handleCreateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if(!user){
                toast.error("User not found. Please log in.");
                return;
            }
            const token = auth || localStorage.getItem("token");
            if (!token) {
                toast.error("No token found. Please log in.");
                return;
            }
            const reqBody = {...newGroup,createdByUserId: user.id}
            console.log(reqBody)
            const response = await fetch(`${API_URL}/api/groups/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqBody)
            });

            if (!response.ok) {
                throw new Error("Failed to create group");
            }

            const data = await response.json();
            setGroups(prevGroups => [...prevGroups, data]);
            setIsModalOpen(false);
            console.log(newGroup);
            setNewGroup({ groupName: "",createdByUserId:"", memberIds: [] });
            toast.success("Group created successfully!");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to create group");
        }
    };

    useEffect(() => {
        const getUser =  async () => {
            setLoading(true);
            try{
                const token = auth || localStorage.getItem("token");
            
                if (!token) {
                    toast.error("No token found. Please log in.");
                    setLoading(false);
                    return;
                }
                fetchUserDetails(token);
            }
            catch(error){

            }
        
            setLoading(false);
        }
       

        getUser();
    }, [auth]);
    useEffect(() => {
        const fetchUserGroups = async () => {
            try {
                if (!user) return;
                setLoading(true);
                const token = auth || localStorage.getItem("token");
                if (!token) {
                    toast.error("No token found. Please log in.");
                    return;
                }
                const response = await fetch(`${API_URL}/api/groups/member-expenses/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error fetching groups: ${response.statusText}`);
                }
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to fetch user groups");
            } finally {
                setLoading(false);
            }
        };
        fetchUserGroups();
    }, [user, auth,newGroup]);
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 my-6">Please log in to view groups</h2>
                    <button onClick={()=>navigate("/login")} className="cursor-pointer">
                        <span className="mt-4 px-4 py-2 bg-[#0092FB] text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                            Go to Login
                        </span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">My Groups</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="cursor-pointer px-4 py-2 bg-[#0092FB] text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Create Group
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <form onSubmit={handleCreateGroup} className="space-y-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Group</h2>
                                </div>
                                <div>
                                    <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">
                                        Group Name
                                    </label>
                                    <input
                                        type="text"
                                        id="groupName"
                                        value={newGroup.groupName}
                                        onChange={(e) => setNewGroup({ ...newGroup, groupName: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0092FB] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="members" className="block text-sm font-medium text-gray-700 mb-1">
                                        Add Member ID/Email
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            id="members"
                                            placeholder="Enter member ID or email"
                                            value={memberInput}
                                            onChange={e => setMemberInput(e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0092FB] focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (memberInput.trim() && !newGroup.memberIds.includes(memberInput.trim())) {
                                                    setNewGroup({
                                                        ...newGroup,
                                                        memberIds: [...newGroup.memberIds, memberInput.trim()]
                                                    });
                                                    setMemberInput("");
                                                }
                                            }}
                                            className="px-4 py-2 bg-[#0092FB] text-white rounded-xl font-semibold hover:bg-blue-600"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {newGroup.memberIds.map((id, idx) => (
                                            <span key={id + idx} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                                                {id}
                                                <button
                                                    type="button"
                                                    onClick={() => setNewGroup({
                                                        ...newGroup,
                                                        memberIds: newGroup.memberIds.filter((_, i) => i !== idx)
                                                    })}
                                                    className="ml-2 text-gray-400 hover:text-red-500"
                                                    title="Remove"
                                                >
                                                    
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="cursor-pointer px-4 py-2 bg-[#0092FB] text-white rounded-xl font-semibold hover:bg-blue-600"
                                    >
                                        Create Group
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div>Loading...</div>
                    ) : groups.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500">No groups yet. Create your first group!</p>
                        </div>
                    ) : (
                        groups.map((group) => (
                            <GroupCard key={group.groupId || group.groupName} group={group} groups={groups} setGroups={setGroups}/>
                        ))
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss />
        </div>
    );
};
