import React from "react";
import AllEvents from "../components/AllEvents";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

function Home() {
    return (
        <main>
            <Hero />
            <AllEvents />
            <Footer />
        </main>
    );
}

export default Home;
