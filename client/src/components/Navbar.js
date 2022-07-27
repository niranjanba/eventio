import { FaBars } from "react-icons/fa";
import { links } from "../data";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

function Navbar() {
    const [isToggle, setIsToggle] = useState(false);

    const navigate = useNavigate();

    const { user, logOut } = useGlobalContext();

    const linksRef = useRef(null);
    const linksContainerRef = useRef(null);

    useEffect(() => {
        const height = linksRef.current.getBoundingClientRect().height;

        if (isToggle) {
            linksContainerRef.current.style.height = `${height}px`;
        } else {
            linksContainerRef.current.style.height = "0px";
        }
    }, [isToggle]);
    return (
        <Wrapper className="navbar">
            <div className="navbar-center">
                <div className="navbar-header">
                    <h2 onClick={() => navigate("/")}>Eventio</h2>
                    <FaBars
                        className={`navbar-toggle ${isToggle && "rotate"}`}
                        onClick={() => setIsToggle(!isToggle)}
                    />
                </div>
                <div className="navbar-links-container" ref={linksContainerRef}>
                    <ul className="navbar-links" ref={linksRef}>
                        {links.map((link, index) => {
                            const { url, text } = link;
                            return (
                                <li key={index}>
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "link active" : "link"
                                        }
                                        to={url}
                                    >
                                        {text}
                                    </NavLink>
                                </li>
                            );
                        })}
                        {!user && (
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "link active" : "link"
                                    }
                                    to={"/register"}
                                >
                                    register
                                </NavLink>
                            </li>
                        )}
                        {!user && (
                            <li>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "link active" : "link"
                                    }
                                    to={"/login"}
                                >
                                    login
                                </NavLink>
                            </li>
                        )}
                        {user && (
                            <li>
                                <Link
                                    className="link"
                                    to={"/"}
                                    onClick={logOut}
                                >
                                    logout
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.nav`
    background-color: white;
    .navbar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        text-transform: capitalize;
        h2 {
            cursor: pointer;
            color: var(--clr-primary-4);
        }
    }

    .navbar-toggle {
        cursor: pointer;
        color: rgb(95, 171, 246);
        font-size: 1.35rem;
        transition: all 0.2s linear;
    }
    .navbar-toggle.rotate {
        color: dodgerblue;
        transform: rotate(90deg);
    }

    .navbar-header svg,
    .navbar-social-icons svg {
        fill: dodgerblue;
    }

    .link.active {
        color: var(--clr-primary-4);
    }

    .link {
        cursor: pointer;
        display: block;
        color: var(--clr-grey-7);
        font-size: 1rem;
        padding: 0.5rem 1rem;
        text-transform: capitalize;
        transition: all 0.3s linear;
        font-weight: 500;
        width: 100vw;
        &:hover {
            background: dodgerblue;
            color: white;
            padding-left: 1.5rem;
        }
    }

    .navbar-links-container {
        overflow: hidden;
        transition: all 0.3s linear;
        position: absolute;
        z-index: 4;
        background-color: var(--clr-white);
    }

    @media screen and (min-width: 800px) {
        position: fixed;
        z-index: 3;
        top: 0;
        .navbar-center {
            height: 75px;
            width: 100vw;
            display: flex;
            justify-content: space-around;
            align-items: center;
            box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.3);
        }
        .navbar-links-container {
            height: auto !important;
            position: unset;
        }
        .link {
            width: auto;
        }
        .navbar-links {
            display: flex;
        }
        .navbar-links a {
            padding: 0;
            margin: 0 0.8rem;
            text-transform: capitalize;
            font-weight: 600;
            transition: none;
            width: auto;
        }
        .navbar-links a:hover {
            color: var(--clr-primary-4);
            padding: 0;
            background: transparent;
        }
        .navbar-toggle {
            display: none;
        }
    }
`;

export default Navbar;
