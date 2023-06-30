"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userprompts, setUserprompts] = useState([]);

  useEffect(() => {
    const fetchprompts = async () => {
      const response = await fetch(`/api/users/${params?.id}/prompts`);
      const data = await response.json();

      setUserprompts(data);
    };

    if (params?.id) fetchprompts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userprompts}
    />
  );
};

export default UserProfile;
