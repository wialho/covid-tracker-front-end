import styled from "styled-components";

export const TextInput = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;

    &:invalid {
        border-color: red;
    }

    &:valid {
        border-color: #ccc;
    }
`;