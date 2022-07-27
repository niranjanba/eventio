import React from "react";
import styled from "styled-components";

function BookedUserTable({ users }) {
    return (
        <Wrapper>
            <table>
                <caption>Bookings: </caption>
                <thead>
                    <tr>
                        <th>Sl.</th>
                        {Object.keys(users[0]).map((key, idx) => {
                            return <th key={idx}>{key}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => {
                        const { _id, name, email } = user;
                        return (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{_id}</td>
                                <td>{name}</td>
                                <td>{email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Wrapper>
    );
}

const Wrapper = styled.article`
    padding: 1rem;
    table {
        width: 100%;
        border: 2px solid var(--clr-primary-2);
        border-collapse: collapse;
        border-radius: 5px;
        th,
        td {
            border-radius: 5px;
            border: 2px solid var(--clr-primary-2);
        }
        thead th {
            width: 25%;
        }
        td {
            text-align: center;
            padding: 0.2rem;
        }
    }
`;

export default BookedUserTable;
