import styled from "styled-components";

function Ticket({ _id: id, EventName, StartDate, EndDate }) {
    return (
        <Wrapper>
            <div className="info">
                <h6>{id}</h6>
                <h4>{EventName}</h4>
            </div>
            <div className="dates">
                <h6>Start: {StartDate.substring(0, 10)}</h6>
                <h6>End: {EndDate.substring(0, 10)}</h6>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 2fr 1fr;
    padding: 1.5rem;
    border: 1.5px solid var(--clr-grey-7);
    border-radius: 2px;
    position: relative;
    .info {
        h4 {
            margin: 0;
        }
    }
    .dates {
        &::before {
            content: "";
            height: calc(100% - 20px);
            border-right: 1.5px dotted var(--clr-grey-7);
            position: absolute;
            top: 10px;
            left: 60%;
            transform: translateX(-50%);
        }
    }
    &::after {
        content: "";
        position: absolute;
        top: -1.5px;
        left: 60%;
        transform: translateX(-50%);
        width: 20px;
        height: 10px;
        background-color: white;
        border-bottom-left-radius: 11px;
        border-bottom-right-radius: 11px;
        border: 1.5px solid var(--clr-grey-7);
        border-top: 1.5px solid white;
    }
    &::before {
        content: "";
        position: absolute;
        bottom: -1.5px;
        left: 60%;
        transform: translateX(-50%);
        width: 20px;
        height: 10px;
        background-color: white;
        border-top-left-radius: 11px;
        border-top-right-radius: 11px;
        border: 1.5px solid var(--clr-grey-7);
        border-bottom: 1.5px solid white;
    }
`;
export default Ticket;
