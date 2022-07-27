import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import { ReactComponent as BookedIcon } from "../images/reservation.svg";

function Event({
    _id: EventID,
    EventName,
    StartDate,
    EndDate,
    EventRegion,
    Tags,
    Image,
    Admin,
    Bookings,
}) {
    StartDate = StartDate.substring(0, 10);
    EndDate = EndDate.substring(0, 10);
    const { getAllEvents, getUserEvents, user } = useGlobalContext();
    const [isBooked, setIsBooked] = useState();
    const deleteEvent = async () => {
        try {
            await axios.delete(`/event/${EventID}`);
            getAllEvents();
            getUserEvents();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (user && Bookings.includes(user.userId)) {
            setIsBooked(true);
        }
    }, [user, Bookings]);
    return (
        <Wrapper className="event">
            <div className="event-img">
                <img src={Image} alt={EventName} />
            </div>
            <div className="data-container">
                <div className="event-data">
                    <h4>{EventName}</h4>
                    <div className="tags">
                        {Tags.map((tag, index) => {
                            return (
                                <span key={index} className="tag">
                                    {tag}
                                </span>
                            );
                        })}
                    </div>
                    <div className="dates-location">
                        <div>
                            <div className="dates">
                                <h5>
                                    from: <span>{StartDate}</span>{" "}
                                </h5>
                                <h5>
                                    to: <span>{EndDate}</span>{" "}
                                </h5>
                            </div>
                            <div className="region">
                                <h5>Region:</h5>
                                <p>{EventRegion}</p>
                            </div>
                        </div>
                        {isBooked && (
                            <i
                                className="booked-icon"
                                title="you have booked this event"
                            >
                                <BookedIcon />
                            </i>
                        )}
                    </div>
                    <footer>
                        <Link
                            className="btn btn-primary btn-primary-sm"
                            to={`/event/${EventID}`}
                        >
                            Details
                        </Link>
                        {Admin && (
                            <button
                                className="btn btn-primary-sm delete-btn"
                                onClick={deleteEvent}
                            >
                                Delete
                            </button>
                        )}
                    </footer>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.article`
    max-width: 350px;
    width: 100%;
    height: max-content;
    box-shadow: var(--light-shadow);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    &:hover {
        transform: scale(1.01);
    }
    transition: var(--transition);
    .event-img {
        img {
            width: 100%;
            height: 200px;
            border-top-right-radius: 3px;
            border-top-left-radius: 3px;
        }
    }
    .data-container {
        padding: 1rem;
        h4 {
            text-transform: capitalize;
            letter-spacing: var(--spacing);
        }
        .dates-location {
            display: grid;
            grid-template-columns: 1fr 1fr;

            .booked-icon {
                text-align: center;
                svg {
                    width: 80px;
                }
            }
        }
        .region {
            p {
                text-transform: capitalize;
                font-size: 0.9rem;
            }
        }
        .tags {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            text-transform: uppercase;
            margin-bottom: 0.3rem;
            .tag {
                background-color: var(--clr-grey-2);
                color: var(--clr-primary-1);
                padding: 0.2rem;
                border-radius: 3px;
                font-size: 0.7rem;
                margin-top: 0.3rem;
                margin-right: 0.5rem;
            }
        }
        .dates {
            text-transform: uppercase;
        }
    }
    footer {
        display: flex;
        gap: 1rem;
        .delete-btn {
            cursor: pointer;
            height: 100%;
            background: red;
            color: var(--clr-white);
            &:hover {
                background-color: darkred;
            }
        }
    }
`;

export default Event;
