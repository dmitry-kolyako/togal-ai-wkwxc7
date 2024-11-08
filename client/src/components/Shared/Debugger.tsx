import styled from "styled-components";

const DebuggerContainer = styled.div`
    display: block;
    text-align: left;
`

export const Debugger = ({...props}) => {
    return <DebuggerContainer>
        {
            Object.entries(props).map(([key, value]) => (<div key={key}>
                <div>{JSON.stringify({[key]: value})}</div>
            </div>))
        }
    </DebuggerContainer>

}