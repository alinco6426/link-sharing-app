"use client";
import Navbar from "@/components/NavBar";
import DashBoard from "@/components/DashBoard";
import List from "@/components/List";
import "../styles/main.css";
import { useState, useEffect } from "react";

export default function Home() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/hello"); // Note the /api prefix
      const data = await res.json();
      setResponse(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <DashBoard />
      {/* <List /> */}
      {/* <p>Response: {response}</p> */}
    </div>
  );
}