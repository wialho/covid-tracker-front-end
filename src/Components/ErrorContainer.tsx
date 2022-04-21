import styled from "styled-components";

interface ErrorDivStyle {
    maxWidth: number
}

const ErrorDiv = styled.div`
    color: red;
    max-width: ${(props: ErrorDivStyle) => props.maxWidth}px;
`

interface ErrorContainerProps {
    isError: boolean;
    errorText: string;
    maxWidth: number
}

const ErrorContainer = (errorContainerProps: ErrorContainerProps) => {
    return (
        <ErrorDiv maxWidth={errorContainerProps.maxWidth}>
            {errorContainerProps.isError ? errorContainerProps.errorText : null}
        </ErrorDiv>
    )
}

export default ErrorContainer;