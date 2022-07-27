import axios from "axios";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";

function FilterEvents() {
    const { tags, setEvents, getAllEvents, setLoading } = useGlobalContext();
    const [filters, setFilters] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);

    const formRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };
    const handleTags = (e) => {
        const { checked, name } = e.target;
        if (checked) {
            setSelectedTags([...selectedTags, name]);
        } else {
            let tagsCopy = selectedTags;
            const myIndex = tagsCopy.indexOf(name);
            if (myIndex !== -1) {
                tagsCopy.splice(myIndex, 1);
            }
            setSelectedTags([...tagsCopy]);
        }
    };
    const filterEvents = async () => {
        // let queryString = "";
        // for (let key of Object.keys(filters)) {
        //     if (queryString.length < 1) {
        //         queryString += `?${key}=${filters[key]}`;
        //     } else {
        //         queryString += `&${key}=${filters[key]}`;
        //     }
        // }
        // for (let tag of selectedTags) {
        //     if (queryString.length < 1) {
        //         queryString += `?Tags=${tag}`;
        //     } else {
        //         queryString += `&Tags=${tag}`;
        //     }
        // }
        setLoading(true);
        filters.Tags = selectedTags;
        const { data } = await axios.post(`/event/search/`, { ...filters });
        setEvents(data.data);
        setLoading(false);
    };
    const resetFilters = () => {
        setFilters({});
        setSelectedTags([]);
        formRef.current.reset();
        getAllEvents();
    };

    return (
        <Wrapper className="filter-container">
            <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
                <div className="sec1">
                    <div className="form-control">
                        <label htmlFor="name">Event Type</label>
                        <select name="EventType" onChange={handleChange}>
                            <option value="">Select event type</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="spiritual">Spiritual</option>
                            <option value="professional">Professional</option>
                            <option value="political">Political</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <div className="time-container">
                            <div className="time">
                                <label htmlFor="start-time">Start Date</label>
                                <input
                                    id="start-time"
                                    type="date"
                                    name="StartDate"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="time">
                                <label htmlFor="end-time">End Date</label>
                                <input
                                    id="end-time"
                                    type="date"
                                    name="EndDate"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-control">
                        <label htmlFor="name">Event Region</label>
                        <select name="EventRegion" onChange={handleChange}>
                            <option value="">Select Region</option>

                            <option value="south bangalore">
                                South Bangalore
                            </option>
                            <option value="nort bangalore">
                                North Bangalore
                            </option>
                            <option value="central bangalore">
                                Central Bangalore
                            </option>
                            <option value="east bangalore">
                                East Bangalore
                            </option>
                        </select>
                    </div>
                </div>
                <div className="tags">
                    {!tags.length < 1 ? (
                        tags.map((tag, idx) => {
                            return (
                                <div key={idx}>
                                    <input
                                        type="checkbox"
                                        id={`${tag.name}`}
                                        name={`${tag.name}`}
                                        onChange={handleTags}
                                    />
                                    <label htmlFor={`${tag.name}`}>
                                        {tag.name}
                                    </label>
                                </div>
                            );
                        })
                    ) : (
                        <h4>No tags</h4>
                    )}
                </div>
                <div className="filter-btns">
                    <button className="btn btn-primary" onClick={filterEvents}>
                        Filter
                    </button>
                    <button className="btn btn-primary" onClick={resetFilters}>
                        reset
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    form {
        margin-bottom: 2rem;
        display: grid;
        place-items: center;
        gap: 2rem;
        .sec1 {
            display: flex;
            gap: 2rem;
            .form-control {
                /* margin: 1.5rem; */
                display: flex;
                flex-direction: column;
                label {
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--clr-primary-6);
                }
                input,
                select {
                    width: 100%;
                    height: 2.5rem;
                    border: 2px solid var(--clr-primary-5);
                    border-radius: 3px;
                    outline: none;
                    padding: 0.2rem 0.6rem;
                    font-weight: 500;
                }
                .time-container {
                    display: flex;
                    gap: 1rem;
                    .time {
                        display: flex;
                        flex-direction: column;
                        /* margin-right: 1rem; */
                        width: 50%;
                    }
                    #start-time,
                    #end-time {
                        width: 100%;
                    }
                }
                .tags {
                    .tag {
                        background-color: var(--clr-grey-2);
                        padding: 0.2rem;
                        font-size: 0.7rem;
                        margin-right: 0.5rem;
                        border-radius: 3px;
                    }
                }
            }
        }
        .tags {
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 1rem;
            div {
                display: inline-flex;
                label {
                    text-transform: capitalize;
                    margin-left: 0.3rem;
                    font-size: 0.85rem;
                }
            }
        }
        .filter-btns {
            display: flex;
            gap: 1rem;
        }
        @media (max-width: 768px) {
        }
        @media (max-width: 556px) {
            gap: 1rem;
            .sec1 {
                flex-direction: column;
                gap: 1rem;
            }
            .tags {
                flex-wrap: wrap;
                padding: 0.7rem;
            }
        }
    }
`;

export default FilterEvents;
