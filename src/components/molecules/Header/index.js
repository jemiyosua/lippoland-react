import React , { useState, useEffect, useRef } from 'react';
import { Button, Form, Nav, Navbar, NavDropdown, Container , Card, CardDeck } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IconStarpoin, IcStarmall, Playstore, Appstore, QrDownloadApp, StarMallKategoriProduk, StarMallChat, StarMallCart, StarMallUser, IcLogoLippoTextHeader, IcLogoLippoTextBrownHeader, IcWhatappHeader, IcWhatappDarkHeader, IcWhatsappWhite, IcWhatsappDark, IcWhatsappBlack, IcArrowWhiteHeader, IcArrowBlackHeader } from '../../../assets';
import { setForm } from '../../../redux';
import './header.css';
import './sidebar-menu.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { paths } from '../../../utils';
import { fetchStatus, generateSignature } from '../../../utils/functions';

const Header = ({ pageActive, onClickSection }) => {

    const history =useHistory();
    const [cookies, setCookie,removeCookie] = useCookies([]);
    const {form}=useSelector(state=>state.PaketReducer);
    const dispatch = useDispatch();
    const sidebarRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [HoverWhatsapp, setHoverWhatsapp] = useState(false);
    const [LanguageHeader, setLanguageHeader] = useState("ID")
    const [DropdownLanguage, setDropdownLanguage] = useState(false)

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const [PageActive, setPageActive] = useState("home")

    const [ListHeaderMenu, setListHeaderMenu] = useState([])
    const [ImageDark, setImageDark] = useState([])
    const [ImageLight, setImageLight] = useState("")

    useEffect(() => {

        getListHeaderMenu()
        getListHeaderLogo()
        setPageActive(pageActive)

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const getListHeaderLogo = () => {
        var requestBody = JSON.stringify({
            "Ip": "",
            "Id": ""
        });

        var url = paths.URL_API_WEB + 'HeaderLogo';
        var Signature = generateSignature(requestBody)

        fetch(url, {
            method: "POST",
            body: requestBody,
            headers: {
                'Content-Type': 'application/json',
                'Signature': Signature
            },
        })
        .then(fetchStatus)
        .then(response => response.json())
        .then((data) => {
            if (data.ErrorCode === "0") {
                setImageDark(data.Result[0].ImagesDark)
                setImageLight(data.Result[0].ImagesLight)
            } else {
                // setErrorMessageAlert(data.ErrorMessage);
                // setShowAlert(true);
                return false;
            }
        })
        .catch((error) => {
            if (error.message == 401) {
                // setErrorMessageAlert("Maaf anda tidak memiliki ijin untuk mengakses halaman ini.");
                // setShowAlert(true);
                return false;
            } else if (error.message != 401) {
                // setErrorMessageAlert(AlertMessage.failedConnect);
                // setShowAlert(true);
                return false;
            }
        });
    }

    const handleToggle = () => {
        setIsMobile(!isMobile);
    };

    const closeMobileMenu = () => {
        setIsMobile(false);
    };

    const handleScroll = () => {
        const scrollThreshold = 150; // Pixels to trigger background change
        if (window.scrollY > scrollThreshold) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsDropdownOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    };

    const handleDropDownLanguage = (language) => {
        setIsRotated(!isRotated)
        setIsDropdownOpen(!isDropdownOpen)
        setLanguageHeader(language)
    }

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsSidebarOpen(false)
        }
    };

    const toggleRotation = () => {
        setIsRotated(!isRotated); // Toggle the rotation state
        setIsDropdownOpen(!isDropdownOpen);
    };

    const changePage = (page, pageActive) => {
        // console.log(pageActive)
        if (pageActive == "developments") {
            onClickSection()
            setIsSidebarOpen(false)
        } else {
            window.location.href = page
        }
        
        // history.push(page)
    }

    const getListHeaderMenu = () => {
        var requestBody = JSON.stringify({
            "Ip": "",
            "Id": ""
        });

        var url = paths.URL_API_WEB + 'ListHeaderMenu';
        var Signature = generateSignature(requestBody)

        fetch(url, {
            method: "POST",
            body: requestBody,
            headers: {
                'Content-Type': 'application/json',
                'Signature': Signature
            },
        })
        .then(fetchStatus)
        .then(response => response.json())
        .then((data) => {
            if (data.ErrorCode === "0") {
                setListHeaderMenu(data.Result)
            } else {
                // setErrorMessageAlert(data.ErrorMessage);
                // setShowAlert(true);
                return false;
            }
        })
        .catch((error) => {
            // setLoading(false)
            if (error.message == 401) {
                // setErrorMessageAlert("Maaf anda tidak memiliki ijin untuk mengakses halaman ini.");
                // setShowAlert(true);
                return false;
            } else if (error.message != 401) {
                // setErrorMessageAlert(AlertMessage.failedConnect);
                // setShowAlert(true);
                return false;
            }
        });
    }

    return (
        <>
        <header className={isScrolled ? "blur-header-scrolled" : "blur-header"}>
            <div className="header-content-blur">

                <div style={{ display:'flex', justifyContent:'flex-start', alignItems:'center', height:'100%' }}>
                    <div className="header-content-left-menu-logo">
                        <div className="logo">
                            <a href="/">
                                <img src={isScrolled ? ImageDark : ImageLight} style={{ width:155 }} />
                            </a>
                        </div>
                    </div>

                    {windowWidth > 1024 &&
                    <div className="header-content-left-menu">
                        {ListHeaderMenu.map((item,index) => {
                            var pageActive = ""
                            if (item.MenuName == "ABOUT US") {
                                pageActive = "about-us"
                            } else if (item.MenuName == "DEVELOPMENTS") {
                                pageActive = "developments"
                            } else if (item.MenuName == "SERVICES") {
                                pageActive = "services"
                            } else if (item.MenuName == "PROMOTION") {
                                pageActive = "promosi"
                            } else if (item.MenuName == "SUSTAINABILITY") {
                                pageActive = "sustainability"
                            }
                            return <div className={isScrolled ? "header-menu-blur-scrolled" : "header-menu-blur"} onClick={() => changePage(item.UrlPage, pageActive)} style={{ borderBottom:PageActive == pageActive ? isScrolled ? '3px solid #632B2B' : '3px solid #FFFFFF' : '' }}>{item.MenuName}</div>
                        })}
                        {/* <div className={isScrolled ? "header-menu-blur-scrolled" : "header-menu-blur"} onClick={() => changePage('/tentang-kami')} style={{ borderBottom:PageActive == "tentang-kami" ? isScrolled ? '3px solid #632B2B' : '3px solid #FFFFFF' : '' }}>TENTANG KAMI</div>
                        <div className={isScrolled ? "header-menu-blur-scrolled" : "header-menu-blur"} style={{ borderBottom:PageActive == "developments" ? isScrolled ? '3px solid #632B2B' : '3px solid #FFFFFF' : '' }}>DEVELOPMENTS</div>
                        <div className={isScrolled ? "header-menu-blur-scrolled" : "header-menu-blur"} style={{ borderBottom:PageActive == "layanan" ? isScrolled ? '3px solid #632B2B' : '3px solid #FFFFFF' : '' }}>LAYANAN</div>
                        <div className={isScrolled ? "header-menu-blur-scrolled" : "header-menu-blur"} style={{ borderBottom:PageActive == "keberlanjutan" ? isScrolled ? '3px solid #632B2B' : '3px solid #FFFFFF' : '' }}>KEBERLANJUTAN</div>
                        <div className={isScrolled ? "header-menu-blur-scrolled" : "header-menu-blur"} style={{ borderBottom:PageActive == "promosi" ? isScrolled ? '3px solid #632B2B' : '3px solid #FFFFFF' : '' }}>PROMOSI</div> */}
                    </div>}
                </div>
                
                <nav className={isMobile ? "nav-links mobile" : "nav-links"}>
                    <ul>
                        <li>
                            <a href="#home" onClick={closeMobileMenu}>
                                <div className="language-container">
                                    {LanguageHeader == "ID" ?
                                    <div style={{ fontSize:16, fontWeight:500, color:isScrolled ? '#000000' : '#FFFFFF' }}>ID</div>
                                    :
                                    <div style={{ fontSize:16, fontWeight:500, color:isScrolled ? '#000000' : '#FFFFFF' }}>EN</div>
                                    }
                                    <div className={`arrow ${isRotated ? 'rotate' : ''}`} onClick={toggleRotation} style={{ fontSize: '30px', cursor: 'pointer' }}>
                                        <img src={isScrolled ? IcArrowBlackHeader : IcArrowWhiteHeader} />
                                    </div>
                                </div>
                                {isDropdownOpen && (
                                <div className={isScrolled ? "dropdown-content-scrolled" : "dropdown-content"}>
                                    <div onClick={() => handleDropDownLanguage("ID")}>INDONESIA</div>
                                    <div onClick={() => handleDropDownLanguage("EN")}>ENGLISH</div>
                                </div>
                                )}
                            </a>
                        </li>
                        <li>
                            <a href="https://api.whatsapp.com/send?phone=6283101058830&text=asd" onClick={closeMobileMenu}>
                                <div style={{ display:'flex', alignItems:'center' }}>
                                {windowWidth > 1200 ?
                                    <div className="whatsapp-container" onMouseEnter={() => setHoverWhatsapp(true)} onMouseLeave={() => setHoverWhatsapp(false)}>
                                        <img src={isScrolled ? IcWhatsappBlack : HoverWhatsapp ? IcWhatsappBlack : IcWhatsappWhite} className="ic-wa-container" />
                                        <div style={{ color:isScrolled ? '#000000' : HoverWhatsapp ? '#000000' : '#FFFFFF', fontSize:16, fontWeight:'500' }}>WHATSAPP</div>
                                    </div>
                                    :
                                    <div className="whatsapp-container" onMouseEnter={() => setHoverWhatsapp(true)} onMouseLeave={() => setHoverWhatsapp(false)}>
                                        <img src={isScrolled ? IcWhatsappBlack : HoverWhatsapp ? IcWhatsappBlack : IcWhatsappWhite} width={20} />
                                    </div>
                                }
                                </div>
                            </a>
                        </li>
                    </ul>
                </nav>
                
                {isSidebarOpen && windowWidth < 1024 &&
                <div className="sidebar-menu-container">
                    {/* Burger Button */}

                    {/* Sidebar */}
                    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                        <div className="burger" onClick={toggleSidebar}>✕</div>
                        <nav className="menu">
                            <a href="/" className={PageActive == "home" ? "menu-item active" : "menu-item"}>
                                <div style={{ fontSize:22, fontWeight:400 }}>HOME</div>
                            </a>
                            {ListHeaderMenu.map((item,index) => {
                                var pageActive = ""
                                if (item.MenuName == "ABOUT US") {
                                    pageActive = "about-us"
                                } else if (item.MenuName == "DEVELOPMENTS") {
                                    pageActive = "developments"
                                } else if (item.MenuName == "SERVICES") {
                                    pageActive = "services"
                                } else if (item.MenuName == "PROMOTION") {
                                    pageActive = "promosi"
                                } else if (item.MenuName == "SUSTAINABILITY") {
                                    pageActive = "sustainability"
                                }
                                return <div className={PageActive == pageActive ? "menu-item active" : "menu-item"} onClick={() => changePage(item.UrlPage, pageActive)} style={{ textDecoration:'none', color:'#000000', cursor:'pointer' }}>
                                <div style={{ fontSize:22, fontWeight:400 }}>{item.MenuName}</div>
                            </div>
                            })}
                            {/* <a href="/" className={PageActive == "home" ? "menu-item active" : "menu-item"}>
                                <div style={{ fontSize:22, fontWeight:400 }}>HOME</div>
                            </a>
                            <a href="/tentang-kami" className={PageActive == "tentang-kami" ? "menu-item active" : "menu-item"} style={{ textDecoration:'none', color:'#000000' }}>
                                <div style={{ fontSize:22, fontWeight:400 }}>TENTANG KAMI</div>
                            </a>
                            <a href="/" className={PageActive == "developments" ? "menu-item active" : "menu-item"} style={{ textDecoration:'none', color:'#000000' }}>
                                <div style={{ fontSize:22, fontWeight:400 }}>DEVELOPMENTS</div>
                            </a>
                            <a href="/" className={PageActive == "layanan" ? "menu-item active" : "menu-item"} style={{ textDecoration:'none', color:'#000000' }}>
                                <div style={{ fontSize:22, fontWeight:400 }}>LAYANAN</div>
                            </a>
                            <a href="/" className={PageActive == "keberlanjutan" ? "menu-item active" : "menu-item"} style={{ textDecoration:'none', color:'#000000' }}>
                                <div style={{ fontSize:22, fontWeight:400 }}>KEBERLANJUTAN</div>
                            </a>
                            <a href="/" className={PageActive == "promosi" ? "menu-item active" : "menu-item"} style={{ textDecoration:'none', color:'#000000' }}>
                                <div style={{ fontSize:22, fontWeight:400 }}>PROMOSI</div>
                            </a> */}
                        </nav>
                        <div className="language">
                            <div style={{ backgroundColor:LanguageHeader == "EN" ? '#4E2222' : '#FFFFFF', padding:10, color:LanguageHeader == "EN" ? '#FFFFFF' : '#000000', cursor:'pointer' }} onClick={() => setLanguageHeader("EN")}>EN</div>
                            <div style={{ backgroundColor:LanguageHeader == "ID" ? '#4E2222' : '#FFFFFF', padding:10, color:LanguageHeader == "ID" ? '#FFFFFF' : '#000000', cursor:'pointer' }} onClick={() => setLanguageHeader("ID")}>ID</div>
                        </div>
                        <div className="contact">
                        <span><img src={IcWhatsappBlack} /></span>
                        <a href="https://api.whatsapp.com/send?phone=6283101058830&text=asd" target="_blank" rel="noopener noreferrer">
                            <div style={{ fontSize:26 }}>Whatsapp</div>
                        </a>
                        </div>
                    </div>
                </div>
                }
               
                {/* <div className="hamburger" onClick={toggleSidebar}>
                {windowWidth <= 1024 ?
                <div className="container-burger">
                    <img src={IcWhatsappWhite} />
                    <FaBars style={{ color:isScrolled ? '#000000' : '#FFFFFF' }} />
                </div>
                :
                <div className="container-burger">
                    <img src={isScrolled ? IcWhatsappBlack : IcWhatsappWhite} />
                    <FaBars style={{ color:isScrolled ? '#000000' : '#FFFFFF' }} />
                </div>

                }
                </div> */}
                
                <div className="hamburger">
                    <div className="container-burger">
                        <a href="https://api.whatsapp.com/send?phone=6283101058830&text=asd" className="container-burger">
                            <img src={isScrolled ? IcWhatsappBlack : IcWhatsappWhite} />
                        </a>
                        <FaBars style={{ color:isScrolled ? '#000000' : '#FFFFFF' }} onClick={toggleSidebar} />
                    </div>
                </div>

            </div>
        </header>
        </>
    )
}


export default Header
