import { useState } from "react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Software Developer at XYZ Corp.",
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1>Profile</h1>
      <div>
        <h2>{userInfo.name}</h2>
        <p>Email: {userInfo.email}</p>
        <p>Bio: {userInfo.bio}</p>
      </div>
    </div>
  );
};

export default Profile;