import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toastOption } from "../toastifyOptions";
import { toast, ToastContainer } from "react-toastify";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const demouser1 = {
    email: "demo1@gmail.com",
    password: "demo@123",
};
const demouser2 = {
    email: "demo2@gmail.com",
    password: "demo@123",
};

function Login() {
    const [details, setDetails] = useState({ email: "", password: "" });
    const { getUser } = useGlobalContext();
    const navigate = useNavigate();

    const handleDemoUsers = (no) => {
        if (no === 1) {
            setDetails(demouser1);
        }
        if (no === 2) {
            setDetails(demouser2);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "/auth/login/",
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
            <section className="section login">
                <div className="section-center">
                    <div className="login-container">
                        <h4>wecome back</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="example@gmail.com"
                                    name="email"
                                    onChange={handleChange}
                                    value={details.email}
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={details.password}
                                />
                            </div>
                            <button className="btn btn-primary login-btn">
                                Login
                            </button>
                        </form>
                        <p>
                            not registered yet?{" "}
                            <Link to={"/register"}>Register</Link>
                        </p>
                        <div className="demo-btns">
                            <button
                                className="btn btn-primary btn-primary-sm"
                                onClick={() => handleDemoUsers(1)}
                            >
                                demo 1
                            </button>
                            <button
                                className="btn btn-primary btn-primary-sm"
                                onClick={() => handleDemoUsers(2)}
                            >
                                demo 2
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </Wrapper>
    );
}

const Wrapper = styled.main`
    .login {
        height: 80vh;
    }
    .login-container {
        h4 {
            font-size: 1.2rem;
            text-align: center;
            text-transform: capitalize;
            margin-bottom: 3rem;
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
        .login-btn {
            width: 100% !important;
            margin-bottom: 1rem;
        }
        .demo-btns {
            display: flex;
            gap: 1rem;
        }
    }
`;

export default Login;
