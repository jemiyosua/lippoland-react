import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { BrowserRouter , Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import LeftMenu from '../../components/molecules/LeftMenu'
import { historyConfig } from '../../utils/functions'
import Dashboard from '../Dashboard'
// import Gudang from '../Gudang'
// import Kasir from '../Kasir'
// import Keuangan from '../Keuangan'
// import Others from '../Others'
// import ImportProduct from '../Gudang/MasterProduct/ImportProduct'
// import ScanProduct from '../Gudang/MasterProduct/ScanProduct'
import HeroHome from '../HeroHome'
import SectionDevHome from '../SectionDevHome'
import ProductHome from '../ProductHome'
import UpcomingProject from '../UpcomingProject'
import CompanyOverview from '../CompanyOverview'
import Statistic from '../Statistic'
import VisionMision from '../VisionMision'
import LeadershipInitaitive from '../LeadershipInitaitive'
import Awards from '../Awards'
import CoreValues from '../CoreValues'
import HeaderLogo from '../HeaderLogo'
import HeaderMenu from '../HeaderMenu'

const MainApp = () => {
    const history = useHistory(historyConfig);
    const {form}=useSelector(state=>state.PaketReducer);

    useEffect(() => {
    }, [])
    
    return (
        <div>
            <div className="main-app-wrapper mainapp" style={{ display:'flex', backgroundColor:'#F6FBFF', width:'100%'}}> 

                <LeftMenu />

                <div className="content-wrapper" style={{ backgroundColor:'#F6FBFF', height:'100%', padding:30,  width:'100%' }}> 
                    {/* <Header/> */}
                    <BrowserRouter basename="/admin">
                        <Switch>
                            <Route exact path="/dashboard">
                                <Dashboard />
                            </Route>
                            <Route path="/hero-home">
                                <HeroHome />
                            </Route>
                            <Route path="/dev-section">
                                <SectionDevHome />
                            </Route>
                            <Route path="/our-products">
                                <ProductHome />
                            </Route>
                            <Route path="/upcoming-project">
                                <UpcomingProject />
                            </Route>
                            <Route path="/company-overview">
                                <CompanyOverview />
                            </Route>
                            <Route path="/vision-mission">
                                <VisionMision />
                            </Route>
                            <Route path="/statistic">
                                <Statistic />
                            </Route>
                            <Route path="/leadership-initiatives">
                                <LeadershipInitaitive />
                            </Route>
                            <Route path="/awards">
                                <Awards />
                            </Route>
                            <Route path="/core-values">
                                <CoreValues />
                            </Route>
                            <Route path="/header-logo">
                                <HeaderLogo />
                            </Route>
                            <Route path="/header-menu">
                                <HeaderMenu />
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        </div>
    )
}

export default MainApp