import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Gap, Header, Footer, CarouselHome, SectionDevelopments, SectionProducts, UpcomingProducts } from '../../components';
import { useDispatch } from 'react-redux';
import { fetchStatus, generateSignature, historyConfig } from '../../utils/functions';
import { useCookies } from 'react-cookie';
import './home.css'
import { paths } from '../../utils';

const Home = () => {
    const history = useHistory(historyConfig);
    const dispatch = useDispatch();
    const [cookies, setCookie,removeCookie] = useCookies([]);

    useEffect(() => {
        // window.scrollTo(0, 0)
    },[])

    const scrollToSection = (id) => {
		const element = document.getElementById(id);

		if (element) {
            window.scrollTo({
                top: element.offsetTop,
                behavior: 'smooth',
            });
		}
	};

    return (
        <div style={{ backgroundColor:'#FFFFFF' }}>
            <Header
                onClickSection={() => scrollToSection("section-dev")}
            />

            <CarouselHome />

            <div style={{ paddingTop:50 }} />

            <div id="section-dev" className="section">
                <SectionDevelopments />
            </div>

            <div style={{ paddingTop:50 }} />

            <SectionProducts />

            <div style={{ paddingTop:50 }} />

            <UpcomingProducts/>
            
            <Footer />
        </div>
    )
}

export default Home;