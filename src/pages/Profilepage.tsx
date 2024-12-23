import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1>Profile Page</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </section>
  );
};

export default ProfilePage;
