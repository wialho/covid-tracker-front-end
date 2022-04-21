import styled from "styled-components";

interface rowStyle {
    justifyContent?: string;
}

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${(p: rowStyle) => !!p.justifyContent ? p.justifyContent : 'flex-start'};
    padding: 5px;
    flex-wrap: wrap;
    gap: 10px;
`