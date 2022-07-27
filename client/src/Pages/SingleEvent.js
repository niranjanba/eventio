import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { toastOption } from "../toastifyOptions";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import BookedUserTable from "../components/BookedUserTable";
import Loading from "../components/Loading";

function SingleEvent() {
    const { eventId } = useParams();
    const { getEvent, user, loading, getAllEvents } = useGlobalContext();

    const [event, setEvent] = useState(undefined);
    const [isBooked, setIsBooked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchEvent() {
            try {
                const data = await getEvent(eventId);
                setEvent(data);
                if (!loading) {
                    if (
                        data.Bookings.some(
                            (booking) => booking._id === user.userId
                        )
                    ) {
                        setIsBooked(true);
                    }
                    setIsAdmin(data.CreatedBy === user.userId);
                }
            } catch (error) {
                console.log(error);
                navigate("/");
            }
        }
        fetchEvent();
    }, [eventId, loading, navigate, user.userId, getEvent]);

    if (loading || !event) {
        return (
            <main>
                <Loading />
            </main>
        );
    }

    const bookATicket = async () => {
        if (!user) {
            return navigate("/login");
        }
        try {
            const { data } = await axios.post(
                `/event/${eventId}/ticket/`,
                {},
                { withCredentials: true }
            );
            toast.success(data.msg, toastOption);
            setIsBooked(true);
            getAllEvents();
        } catch (error) {
            toast.error("Something went wrong!", toastOption);
            console.log(error);
        }
    };

    let {
        EventName,
        StartDate,
        EndDate,
        EventType,
        EventRegion,
        Tags,
        Image,
        By,
        Location,
        Description,
        StartTime,
        EndTime,
    } = event;

    StartDate = StartDate.substring(0, 10);
    EndDate = EndDate.substring(0, 10);

    return (
        <Wrapper>
            <div
                className="background"
                style={{ backgroundImage: `url(${Image})` }}
            ></div>
            <div className="event-container">
                <header>
                    <img src={Image} alt={EventName} />
                    <aside className="info">
                        <div className="details">
                            <span>{StartDate}</span>
                            <h3>{EventName}</h3>
                            <p>by {By}</p>
                            <span>Free</span>
                        </div>
                        {!isBooked ? (
                            <button
                                className="btn btn-primary"
                                onClick={bookATicket}
                            >
                                Book Now
                            </button>
                        ) : (
                            <button className="btn btn-primary" disabled>
                                Booked
                            </button>
                        )}
                    </aside>
                </header>
                <div className="data">
                    <div className="sec1">
                        <h5>Description</h5>
                        <p className="description">{Description}.</p>
                        <div className="type">
                            <h5>Event Type</h5>
                            <span>{EventType}</span>
                        </div>
                        <div className="timings">
                            <h5>Timings</h5>
                            <p>
                                {StartTime} - {EndTime}
                            </p>
                        </div>
                        <div className="tags">
                            <h5>Tags</h5>
                            {Tags.map((tag, idx) => {
                                return (
                                    <span className="tag" key={idx}>
                                        {tag}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div className="sec2">
                        <h5>Dates: </h5>
                        <h5>{StartDate}</h5>
                        <h5>{EndDate}</h5>
                        <div className="location">
                            <h5>Location</h5>
                            <p>{Location}</p>
                        </div>
                        <div className="location">
                            <h5>Region</h5>
                            <p>{EventRegion}</p>
                        </div>
                    </div>
                </div>
                {isAdmin && event.Bookings.length >= 1 && (
                    <BookedUserTable users={event.Bookings} />
                )}
            </div>
            <ToastContainer />
        </Wrapper>
    );
}

const Wrapper = styled.main`
    .background {
        height: 325px;
        background-repeat: no-repeat;
        width: 100%;
        background-size: cover;
        filter: blur(3px);
        margin-bottom: 70vh;
    }
    .event-container {
        background-color: var(--clr-white);
        font-weight: bold;
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        width: 60%;
        box-shadow: var(--dark-shadow);
        header {
            display: grid;
            grid-template-columns: 70% 30%;
            text-transform: capitalize;
            img {
                width: 100%;
                height: 100%;
            }
            .info {
                position: relative;
                .details {
                    padding: 2rem 1rem;
                    margin-bottom: 1rem;
                }
                span {
                    font-size: 0.8rem;
                    color: var(--clr-grey-3);
                }
                h3 {
                    margin-top: 3rem;
                }
                button {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    border-radius: 0;
                    text-align: center;
                }
            }
        }
        .data {
            display: grid;
            grid-template-columns: 70% 30%;
            .sec1 {
                padding: 2rem;
                .type {
                    margin-bottom: 1rem;
                    span {
                        font-weight: 500;
                        font-size: 1rem;
                    }
                }
                .tags {
                    .tag {
                        margin-right: 1rem;
                        font-size: 0.8rem;
                        background-color: var(--clr-grey-2);
                        padding: 0.2rem;
                    }
                }
            }
            .sec2 {
                padding: 2rem;
                h6 {
                    color: var(--clr-grey-4);
                }
                .location {
                    margin-top: 1rem;
                    p {
                        text-transform: capitalize;
                        font-size: 0.8rem;
                    }
                }
            }
        }
        @media (max-width: 768px) {
            width: 80%;
            header {
                grid-template-columns: 60% 40%;
            }
        }
        @media (max-width: 556px) {
            width: 80%;
            header {
                grid-template-columns: 100%;
            }
            .data {
                grid-template-columns: 1fr;
            }
        }
    }
`;

export default SingleEvent;
