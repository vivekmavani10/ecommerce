import React from "react";
import HeroSection from "./components/HeroSection";
import { useProductContext } from "./context/productcontext";


function About() {
  const { myName } = useProductContext();

  const data = {
    name: "Ecommerce Website",
  };

  return (
    <div>
      {myName}
      <HeroSection myData={data} />
    </div>
  );
}

export default About;
