import React from 'react'
import { Banner } from "./Banner";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { Projects } from "./Projects";
import { Skills } from "./Skills";

const Home = () => {
    return (
        <>
            <Banner />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </>

    )
}

export default Home