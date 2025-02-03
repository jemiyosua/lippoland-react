import React, { useEffect, useState } from 'react';
import './comming-soon.css';
import { useHistory } from 'react-router-dom';
import { ImgCommingSoon } from '../../assets';
import { Footer, Header } from '../../components';

const CommingSoon = () => {

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
        window.scrollTo(0, 0)

		const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
	},[])

	return (
		<div style={{ backgroundColor:'#FFFFFF' }}>
            <Header pageActive={"tentang-kami"} />
			<div className="full-width-image-container">
				<img src={ImgCommingSoon} className="full-width-image" />
				<div class="text-overlay">Comming Soon</div>
			</div>
		</div>
	)
}

export default CommingSoon