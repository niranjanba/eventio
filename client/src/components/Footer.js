import { social } from "../data";
import styled from "styled-components";

function Footer() {
    return (
        <Wrapper>
            <div className="footer-info">
                <div className="social">
                    {social.map((item) => {
                        const { id, url, icon } = item;
                        return (
                            <a key={id} href={url}>
                                {icon}
                            </a>
                        );
                    })}
                </div>
                <h3>EventIO - For Managing Your Events</h3>
                <p>Term of use - Privacy policy</p>
                <span>© 2021 - Tenzify Pvt Ltd</span>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.footer`
    background-color: var(--clr-primary-7);
    margin-top: 2rem;
    padding: 2rem;
    display: flex;
    justify-content: center;
    text-align: center;
    /* position: absolute;
    bottom: -300px; */
    width: 100%;
    .social {
        display: flex;
        justify-content: space-evenly;
        margin: 1rem;
        svg {
            font-size: 2rem;
            color: var(--clr-primary-3);
        }
    }
`;

export default Footer;
