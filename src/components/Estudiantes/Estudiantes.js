import React from 'react';
import Header from '../Plantilla/Header';
import SideNav from '../Plantilla/SideNav';
import Home from '../Plantilla/Home';
import Footer from '../Plantilla/Footer';

const Estudiantes = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Home/>
            <SideNav/>
            <Footer/>
        </div>
    );
}

export default Estudiantes;