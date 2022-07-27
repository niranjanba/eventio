import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOption } from "../toastifyOptions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/context";

function Register() {
    const [details, setDetails] = useState({});
    const { getUser } = useGlobalContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!details.name || details.name.length < 2) {
            toast.error("Enter valid name", toastOption);
        }
        if (!details.email || !details.email.includes("@")) {
            toast.error("Enter valid email", toastOption);
        }
        if (!details.password || details.password.trim().length === 0) {
            toast.error("Enter Password", toastOption);
        }
        try {
            const { data } = await axios.post(
                "/auth/register/",
                { ...details },
                { withCredentials: true }
            );
            localStorage.setItem("user", JSON.stringify(data.data));
            toast.success(data.msg, toastOption);
            getUser();
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (error) {
            const {
                response: { data },
            } = error;
            toast.error(data.msg, toastOption);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setDetails({ ...details, [name]: value });
    };

    return (
        <Wrapper>
            <section className="section register">
                <div className="section-center">
                    <div className="register-container">
                        <h4>
                            wecome to <span>Eventio</span>{" "}
                        </h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label htmlFor="name">Enter Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    onChange={handleChange}
                                />
                            </div>
                            <button className="btn btn-primary register-btn">
                                register
                            </button>
                        </form>
                        <p>
                            already registered? <Link to={"/login"}>Login</Link>
                        </p>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </Wrapper>
    );
}

const Wrapper = styled.main`
    .register {
        height: 80vh;
    }
    .register-container {
        h4 {
            font-size: 1.2rem;
            text-align: center;
            text-transform: capitalize;
            margin-bottom: 3rem;
            span {
                color: var(--clr-primary-5);
            }
        }
        .form-control {
            display: flex;
            flex-direction: column;
            width: 300px;
            margin-bottom: 1.1rem;
            label {
                font-weight: 500;
            }
            input {
                width: 100%;
                height: 2.5rem;
                border: 2px solid var(--clr-primary-5);
                border-radius: 3px;
                outline: none;
                padding: 0.2rem 0.6rem;
                font-weight: 500;
                font-size: 0.9rem;
            }
        }
        .register-btn {
            width: 100% !important;
            margin-bottom: 1rem;
        }
    }
`;

export default Register;
