import styled from "styled-components";
import {Container} from "../Shared";

const HistoryContainer = styled(Container)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
`;

const HistoryList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const HistoryItem = styled.li`
    padding: 8px;
    margin: 5px 0;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HistoryLabel = styled.span`
    font-weight: bold;
`;

const HistoryDescription = styled.span`
    color: #666;
`;

export {HistoryContainer, HistoryList, HistoryItem, HistoryLabel, HistoryDescription}