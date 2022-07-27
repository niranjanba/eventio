import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import Event from "../components/Event";
import { useState, useEffect, useCallback } from "react";
import Ticket from "../components/Ticket";
import Loading from "../components/Loading";
import axios from "axios";
function Dashboard() {
    const { user } = useGlobalContext();
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [userEvents, setUserEvents] = useState([]);

    const getUserEventsTickets = useCallback(async () => {
        try {
            setLoading(true);
            const { data: tickets } = await axios("/dashboard/tickets", {
                withCredentials: true,
            });
            const { data: events } = await axios("/dashboard/events", {
                withCredentials: true,
            });
            setUserEvents(events.data.events);
            setTickets(tickets.data.tickets);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [setTickets, setUserEvents]);

    useEffect(() => {
        getUserEventsTickets();
    }, [getUserEventsTickets]);

    if (loading) {
        return (
            <Wrapper>
                <Loading />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <header>
                <h4>Dashboard</h4>
                <p>
                    Hey, <span>{user.name}</span>
                </p>
            </header>
            <div className="tabs">
                <div
                    className={`tab events-tab ${activeTab === 0 && "active"}`}
                >
                    <button className="btn" onClick={() => setActiveTab(0)}>
                        events
                    </button>
                </div>
                <div
                    className={`tab events-tab ${activeTab === 1 && "active"}`}
                >
                    <button className="btn" onClick={() => setActiveTab(1)}>
                        tickets
                    </button>
                </div>
            </div>
            <section className="section">
                <div className="section-center">
                    {activeTab === 0 &&
                        (userEvents.length ? (
                            <div className="events">
                                {userEvents.map((event, idx) => {
                                    return (
                                        <Event
                                            key={idx}
                                            {...event}
                                            Admin={true}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div>No Events Found</div>
                        ))}
                    {activeTab === 1 &&
                        (tickets.length ? (
                            <div className="tickets">
                                {tickets.map((ticket, idx) => {
                                    return <Ticket key={idx} {...ticket} />;
                                })}
                            </div>
                        ) : (
                            <div>No Tickets Found</div>
                        ))}
                </div>
            </section>
        </Wrapper>
    );
}

const Wrapper = styled.main`
    header {
        padding: 0.3rem 1.5rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        h4 {
            font-size: 1.2rem;
        }
        p {
            padding-left: 1.5rem;
            border-left: 3px solid var(--clr-primary-3);
        }
    }
    .tabs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .tab {
            transition: all 0.3s linear;
            padding-bottom: 0.3rem;
            button {
                width: 100%;
                background-color: inherit;
                text-transform: capitalize;
                font-size: 1rem;
                font-weight: 500;
                color: var(--clr-grey-5);
            }
        }
        .active {
            border-bottom: 2px solid var(--clr-primary-3);
        }
    }
    .section-center {
        .events {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            width: 100%;
            row-gap: 1.5rem;
            column-gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .tickets {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
            width: 100%;
            row-gap: 1.5rem;
            column-gap: 1.5rem;
            margin-bottom: 2rem;
            @media (max-width: 568px) {
                padding: 1rem;
            }
        }
    }
`;

export default Dashboard;
