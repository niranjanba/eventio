import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";
import Calender from "../images/calendar.png";
import { toastOption } from "../toastifyOptions";
import { toast, ToastContainer } from "react-toastify";
import { useGlobalContext } from "../context/context";
function AddEvent() {
    const [tags, setTags] = useState([]);
    const [event, setEvent] = useState({
        EventRegion: "south bangalore",
        EventType: "entertainment",
    });

    const { getAllEvents } = useGlobalContext();

    const formRef = useRef();

    const createTags = (e) => {
        const { value } = e.target;
        let newTags = value.split(",").filter((tag) => tag.length > 1);
        setTags(newTags);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(event);
        try {
            event.Tags = tags;
            const { data } = await axios.post(
                "/event/",
                { ...event },
                { withCredentials: true }
            );
            toast.success(data.msg, toastOption);
            formRef.current.reset();
            getAllEvents();
            setTags([]);
        } catch (error) {
            const { data } = error.response;
            toast.error(data.msg, toastOption);
        }
    };
    return (
        <Wrapper>
            <section className="section add-event">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="form-container">
                        <div className="form-control">
                            <label htmlFor="name">Name </label>
                            <input
                                type="text"
                                id="name"
                                name="EventName"
                                onChange={handleChange}
                                placeholder="Enter event name"
                            />
                        </div>

                        <div className="form-control">
                            <label htmlFor="name">Event Region</label>
                            <select
                                name="EventRegion"
                                defaultValue="south bangalore"
                                onChange={handleChange}
                            >
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
                        <div className="form-control">
                            <label htmlFor="name">Event Type</label>
                            <select
                                name="EventType"
                                defaultValue={"entertainment"}
                                onChange={handleChange}
                            >
                                <option value="entertainment">
                                    Entertainment
                                </option>
                                <option value="spiritual">Spiritual</option>
                                <option value="professional">
                                    Professional
                                </option>
                                <option value="political">Political</option>
                                <option value="sports">Sports</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="name">Organized By</label>
                            <input
                                type="text"
                                name="By"
                                onChange={handleChange}
                                placeholder="Enter Your Name or Organization"
                            />
                        </div>
                        <div className="form-control">
                            <div className="time-container">
                                <div className="time">
                                    <label htmlFor="start-time">
                                        Start Date
                                    </label>
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
                            <div className="time-container">
                                <div className="time">
                                    <label htmlFor="start-time">
                                        Start Time
                                    </label>
                                    <input
                                        id="start-time"
                                        type="time"
                                        name="StartTime"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="time">
                                    <label htmlFor="end-time">End Time</label>
                                    <input
                                        id="end-time"
                                        type="time"
                                        name="EndTime"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="name">Tags</label>
                            <input
                                type="text"
                                placeholder="Enter Tags with , separated"
                                onChange={createTags}
                            />
                            <div className="tags">
                                {tags.map((tag, idx) => {
                                    return (
                                        <span key={idx} className="tag">
                                            {tag}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="form-control">
                            <label htmlFor="name">Image Url</label>
                            <input
                                type="text"
                                name="Image"
                                onChange={handleChange}
                                placeholder="Paste image url"
                            />
                        </div>
                    </div>
                    <textarea
                        name="Location"
                        // cols="15"
                        rows="2"
                        placeholder="Location"
                        onChange={handleChange}
                    ></textarea>
                    <textarea
                        name="Description"
                        // cols="15"
                        rows="3"
                        placeholder="description"
                        onChange={handleChange}
                    ></textarea>
                    <button
                        type="submit"
                        className="btn btn-primary create-btn"
                    >
                        create event
                    </button>
                </form>
                <img src={Calender} alt="" />
            </section>
            <ToastContainer />
        </Wrapper>
    );
}

const Wrapper = styled.main`
    .add-event {
        display: grid;

        grid-template-columns: 1fr 1fr;
        align-items: center;
        justify-items: center;
        form {
            width: 100%;
            padding: 1rem;
            .form-container {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-bottom: 1rem;
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
            textarea {
                width: 100%;
                border: 2px solid var(--clr-primary-5);
                border-radius: 3px;
                outline: none;
                padding: 0.2rem 0.6rem;
                font-weight: 500;
            }
            .create-btn {
                font-size: 1.1rem;
                font-weight: 500;
                padding: 0.3rem 0.6rem;
                border-radius: 3px;
            }
        }
        img {
            width: 500px;
            border-radius: 15px;
        }
    }
    @media (max-width: 586px) {
        .add-event {
            grid-template-columns: 1fr;
            form {
                .form-container {
                    grid-template-columns: 1fr;
                }
            }
            img {
                width: 300px;
            }
        }
    }
`;

export default AddEvent;
