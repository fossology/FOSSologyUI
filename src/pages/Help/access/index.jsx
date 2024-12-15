import React,{useEffect,useState} from "react";

import { useLocation } from "react-router-dom";

import Title from "components/Title";

import About from "../About";
import Overview from "../Overview";
import LicenseBrowser from "../LicenseBrowser";
import ThirdPartyLicenses from "../ThirdPartyLicenses";
import { Navbar } from "react-bootstrap";

import externalLinks from "constants/externalLinks";

const Access = () => {
    const location = useLocation();
    const [localExpanded, setLocalExpanded] = useState(false);

    useEffect(() => {
        if (location.state && location.state.isActiveNavItem !== undefined) {
            setLocalExpanded(location.state?.isActiveNavItem ?? false);
        }
    }, [location.state]);

    const styles = {
        secondNavbar: {
            top: localExpanded ? '232px' : '70px',
            zIndex: 100,
            position: 'sticky',
            // display: 'flex',
            overflow: 'auto'
        },
    };
    return (
        <>
            <Navbar bg="dark" variant="dark" style={styles.secondNavbar}>
                <Navbar.Brand href="#About" overflow="scroll">
                    About
                </Navbar.Brand>
                <Navbar.Brand href="#Overview" overflow="scroll">
                    Getting Started
                </Navbar.Brand>
                <Navbar.Brand href="#LicenseBrowser" overflow="scroll">
                    Licence Browser
                </Navbar.Brand>
                <Navbar.Brand href={externalLinks.fossologyWiki} target="_blank" rel="noreferrer" overflow="scroll">
                    Documentation
                </Navbar.Brand>
                <Navbar.Brand href="#ThirdPartyLicenses" overflow="scroll">
                    Third Party Licenses
                </Navbar.Brand>
            </Navbar>

            <Title title="Help" />
            <h1 className="text-center">About</h1>
            <a href="#About" id="About" />
            <About />
            <h1 className="text-center">Getting Started</h1>
            <a href="#Overview" id="Overview" />
            <Overview />
            <h1 className="text-center">Licence Browser</h1>
            <a href="#LicenseBrowser" id="LicenseBrowser" />
            <LicenseBrowser />
            <h1 className="text-center">Third Party Licenses</h1>
            <a href="#ThirdPartyLicenses" id="ThirdPartyLicenses" />
            <ThirdPartyLicenses />
        </>
    );
}

export default Access;