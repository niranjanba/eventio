import styled from "styled-components";
import { ReactComponent as Stage } from "../images/stage.svg";

function Hero() {
    const goToEvents = () => {
        const ele = document.querySelector(".events-section");
        window.scrollTo({
            top: ele.offsetTop - 90,
            behavior: "smooth",
        });
    };
    return (
        <Wrapper className="section hero-section">
            <div className="section-center">
                <div className="title">
                    <h2>welcome to eventio</h2>
                    <h4>
                        here you can find all the event happening in bengaluru
                    </h4>
                    <h4>Ready to rock?</h4>
                    <button className="btn btn-primary" onClick={goToEvents}>
                        find events
                    </button>
                </div>
                <div className="hero">
                    <Stage />
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    display: grid;
    place-items: center;
    .section-center {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .title {
            text-align: start;
            text-transform: capitalize;
            grid-column: revert;
        }
        .hero {
            width: 100%;
            svg {
                height: 100%;
                width: 100%;
                animation: bounce 2s;
                animation-direction: alternate;
                animation-iteration-count: infinite;
            }
            @keyframes bounce {
                from {
                    transform: translate3d(0, 0, 0);
                }
                to {
                    transform: translate3d(0, 10px, 0);
                }
            }
        }

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
            padding: 1rem;
        }
    }
`;

export default Hero;
