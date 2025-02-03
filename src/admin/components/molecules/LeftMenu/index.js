import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AlertMessage, paths } from '../../../utils'
import { historyConfig, generateSignature, fetchStatus } from '../../../utils/functions';
import { setForm } from '../../../redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import './LeftMenu.css';
import { FaHome, FaServer, FaMoneyBill, FaCashRegister, FaWarehouse, FaMicrosoft, FaBuilding, FaMicrochip, FaHandHoldingHeart, FaHandshake, FaShoePrints, FaBorderAll, FaSortUp, FaSortDown, FaGem, FaArrowRight } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Menu, MenuItem, Sidebar, SubMenu, useProSidebar } from 'react-pro-sidebar';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const LeftMenu = () => {
	const history = useHistory(historyConfig);
    const dispatch = useDispatch();
    const containerRef = useRef(null);
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [LoadingMenuSidebar, setLoadingMenuSidebar] = useState(false)
	const [ListMenuSidebar, setListMenuSidebar] = useState([])
	const [Loading, setLoading] = useState(false)
	const { form }=useSelector(state=>state.PaketReducer);
	const { collapseSidebar } = useProSidebar();
	const [PageActive, setPageActive] = useState(1)
	
	const [ShowAlert, setShowAlert] = useState(true)
    const [SessionMessage, setSessionMessage] = useState("")
    const [SuccessMessage, setSuccessMessage] = useState("")
    const [ErrorMessageAlert, setErrorMessageAlert] = useState("")
    const [ErrorMessageAlertLogout, setErrorMessageAlertLogout] = useState("")

	const [IdMenu, setIdMenu] = useState("")
	const [IsSubMenuOpen, setIsSubMenuOpen] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
		getLeftMenu()
	},[])

	const logout = ()=>{
        removeCookie('varCookie', { path: '/'})
        // dispatch(setForm("ParamKey",''))
        // dispatch(setForm("Username",''))
        // dispatch(setForm("Name",''))
        // dispatch(setForm("Role",''))
        if (window) {
            sessionStorage.clear();
		}
		history.push('/admin/login')
		return
    }

	const getCookie = (tipe) => {
		var SecretCookie = cookies.varCookie;
		if (SecretCookie !== "" && SecretCookie != null && typeof SecretCookie=="string") {
			var LongSecretCookie = SecretCookie.split("|");
			var Username = LongSecretCookie[0];
			var ParamKeyArray = LongSecretCookie[1];
			var ParamKey = ParamKeyArray.substring(0, ParamKeyArray.length)
		
			if (tipe === "username") {
				return Username;
			} else if (tipe === "paramkey") {
				return ParamKey;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	const getLeftMenu = () => {

		var CookieParamKey = getCookie("paramkey");
        var CookieUsername = getCookie("username");

		var requestBody = JSON.stringify({
			"Username": CookieUsername,
			"ParamKey": CookieParamKey,
			"Method": "SELECT",
			"Page": 1,
			"RowPage": -1,
			"OrderBy": "",
			"Order": ""
		});

		setLoadingMenuSidebar(true)

		var url = paths.URL_API_ADMIN + 'LeftMenu';
		var Signature  = generateSignature(requestBody)

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

			setLoadingMenuSidebar(false)

			if (data.ErrorCode === "0") {
				setListMenuSidebar(data.Result)
				return
			} else {
				if (data.ErrorCode === "2") {
					setSessionMessage("Session Anda Telah Habis. Silahkan Login Kembali.");
                    setShowAlert(true);
					return;
				} else {
					setErrorMessageAlert(data.ErrorMessage);
					setShowAlert(true);
					return;
				}
			}
		})
		.catch((error) => {
			setLoading(false)
			if (error.message === 401) {
				setErrorMessageAlert("Maaf anda tidak memiliki ijin untuk mengakses halaman ini.");
				setShowAlert(true);
				return false;
			} else if (error.message !== 401) {
				setErrorMessageAlert(AlertMessage.failedConnect);
				setShowAlert(true);
				return false;
			}
		});
    }

	const handlePage = (urlPage) => {
		// history.push(urlPage)
		window.location.href=urlPage;
		// return
	}

	const handleOpenSubmenu = (id) => {
		if (IdMenu == id) {
			setIsSubMenuOpen(true)
		}
	}
    
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>

			{SessionMessage !== "" ?
			<SweetAlert
				warning 
				show={ShowAlert}
				onConfirm={() => {
					setShowAlert(false)
					logout()
					window.location.href="/";
				}}
				btnSize="sm">
				{SessionMessage}
			</SweetAlert>
			:""}

			{SuccessMessage !== "" ?
			<SweetAlert 
				success 
				show={ShowAlert}
				onConfirm={() => {
					setShowAlert(false)
					setSuccessMessage("")
					history.replace("/overview")
				}}
				btnSize="sm">
				{SuccessMessage}
			</SweetAlert>
			:""}          

			{ErrorMessageAlert !== "" ?
			<SweetAlert 
				danger 
				show={ShowAlert}
				onConfirm={() => {
					setShowAlert(false)
					setErrorMessageAlert("")
				}}
				btnSize="sm">
				{ErrorMessageAlert}
			</SweetAlert>
			:""}

			{ErrorMessageAlertLogout !== "" ?
			<SweetAlert 
				danger 
				show={ShowAlert}
				onConfirm={() => {
					setShowAlert(false)
					setErrorMessageAlertLogout("")
					window.location.href="admin/login";
				}}
				btnSize="sm">
				{ErrorMessageAlertLogout}
			</SweetAlert>
			:""}
			
			<Sidebar style={{ height: "100vh", backgroundColor:'#E3E3E3' }}>
				<Menu>
					<MenuItem
						icon={<MenuOutlinedIcon />}
						onClick={() => {
							collapseSidebar();
						}}
					><h5>Lippoland Admin</h5>
					</MenuItem>

					{LoadingMenuSidebar ?
					<Skeleton count={ListMenuSidebar.length} />
					:
					ListMenuSidebar.length > 0 && ListMenuSidebar.map((item,index) => {
						var Icon = ""
						var pageActive = ""
						if (item.MenuNameEn === "Home") {
							pageActive = "HOME"
							Icon = <FaMicrosoft />
						} else if (item.MenuNameEn === "About Us") {
							pageActive = "ABOUT-US"
							Icon = <FaBuilding />
						} else if (item.MenuNameEn === "Developments") {
							pageActive = "DEVELOPMENTS"
							Icon = <FaMicrochip />
						} else if (item.MenuNameEn === "Services") {
							pageActive = "SERVICE"
							Icon = <FaHandHoldingHeart />
						} else if (item.MenuNameEn === "Sustainablity") {
							pageActive = "SUSTAINABILITY"
							Icon = <FaServer />
						} else if (item.MenuNameEn === "Promotion") {
							pageActive = "PROMOTION"
							Icon = <FaHandshake />
						} else if (item.MenuNameEn === "Header") {
							pageActive = "HEADER"
							Icon = <FaSortUp />
						} else if (item.MenuNameEn === "Footer") {
							pageActive = "FOOTER"
							Icon = <FaSortDown />
						}
						return <>
							{item.Item.length > 0 ?
							<SubMenu 
								label={item.MenuNameEn}
								icon={Icon} 
								open={item.Id == IdMenu || form.PageActive == pageActive ? true : false}
								onOpenChange={() => {
									handleOpenSubmenu(item.Id)
									setIdMenu(item.Id)
								}}
							>
							{item.Item.length > 0 && item.Item.map((item2,index2) => {
								var subPageActive = ""
								if (item2.MenuNameEn == "Hero Home") {
									subPageActive = "HERO-HOME"
								} else if (item2.MenuNameEn == "Dev Section") {
									subPageActive = "DEV-SECTION"
								} else if (item2.MenuNameEn == "Our Products") {
									subPageActive = "OUR-PRODUCTS"
								} else if (item2.MenuNameEn == "Upcoming Project") {
									subPageActive = "UPCOMING-PROJECT"
								} else if (item2.MenuNameEn == "Company Overview") {
									subPageActive = "COMPANY-OVERVIEW"
								} else if (item2.MenuNameEn == "Statistic") {
									subPageActive = "STATISTIC"
								} else if (item2.MenuNameEn == "Vision & Mission") {
									subPageActive = "VISION-MISION"
								} else if (item2.MenuNameEn == "Leadership & Initiatives") {
									subPageActive = "LEADERSHIP-INITIATIVE"
								} else if (item2.MenuNameEn == "Awards") {
									subPageActive = "AWARDS"
								} else if (item2.MenuNameEn == "Core Values") {
									subPageActive = "CORE-VALUES"
								} else if (item2.MenuNameEn == "Header Logo") {
									subPageActive = "HEADER-LOGO"
								} else if (item2.MenuNameEn == "Header Menu") {
									subPageActive = "HEADER-MENU"
								} 
								return <MenuItem
									icon={<FaArrowRight />}
									style={{ color:form.SubPageActive == subPageActive ? '#004372' : '#000000', fontWeight:form.SubPageActive == subPageActive ? 'bold' : '' }}
									onClick={() => handlePage(item2.UrlPage)}
								>{item2.MenuNameEn}</MenuItem>
							})}
							</SubMenu>
							:
							<MenuItem icon={Icon}>{item.MenuNameEn}</MenuItem>
							}
						</>
					})}
				</Menu>
			</Sidebar>

		</div>
    )
}

export default LeftMenu;
