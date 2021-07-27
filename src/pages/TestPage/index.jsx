import React from 'react';
import styled from 'styled-components';

const TestContainer = styled.div`
    display: flex;
    flex: 1;
    maxHeight: 100vh;
`;

const TestPage = (props) => {
    return (
        <TestContainer>
            <div>Test Page</div>
        </TestContainer>    
    );
};

export default TestPage;