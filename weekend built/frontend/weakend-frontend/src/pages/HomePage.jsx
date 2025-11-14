import React, { useEffect, useState } from "react";
import API from "../services/api";
import BuildCard from "../components/BuildCard";

const HomePage = () => {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const fetchBuilds = async () => {
      const res = await API.get("/build/list");
      setBuilds(res.data);
    };
    fetchBuilds();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Weekend Builds</h2>
      <div className="row">
        {builds.map((build) => (
          <BuildCard key={build._id} build={build} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
