import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import Event from "./Event";
import FilterEvents from "./FilterEvents";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Loading from "./Loading";

function AllEvents() {
    const { events, loading } = useGlobalContext();
    const [sort, setSort] = useState(true);
    const [Events, setEvents] = useState(events);

    useEffect(() => {
        setEvents(events);
    }, [events]);

    const sortEvents = () => {
        if (!sort) {
            setEvents(
                events.sort(
                    (objA, objB) =>
                        new Date(objA.StartDate) - new Date(objB.StartDate)
                )
            );
            setSort(true);
        } else {
            setEvents(
                events.sort(
                    (objA, objB) =>
                        new Date(objB.StartDate) - new Date(objA.StartDate)
                )
            );
            setSort(false);
        }
    };

    return (
        <Wrapper className="section events-section">
            <div className="section-center">
                <div className="title">
                    <h3>All Events</h3>
                    <p>find the event you need :)</p>
                </div>
                <FilterEvents />
                {loading && <Loading />}
                <button
                    className="btn btn-primary btn-primary-sm sort-btn"
                    onClick={sortEvents}
                >
                    Sort
                    {sort ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
                </button>
                {Events.length >= 1 ? (
                    <div className="events">
                        {Events.map((event, index) => {
                            return <Event key={index} {...event} />;
                        })}
                    </div>
                ) : (
                    <div className="no-events">
                        <h3>No Events Found</h3>
                    </div>
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    .section-center {
        .no-events {
            height: calc(100vh - 70px);
            display: flex;
            align-items: center;
        }
        .title {
            text-align: center;
        }
        .sort-btn {
            margin-bottom: 2rem;
            svg {
                font-size: 1rem;
            }
        }
        .events {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            width: 100%;
            row-gap: 1.5rem;
            column-gap: 1.5rem;
            justify-items: center;
        }
    }
`;

export default AllEvents;
