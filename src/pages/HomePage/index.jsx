import React, { useState } from 'react';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

import { LoadingSpinner } from '../../components';
import BaseApi from '../../api/base';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: 100vh;
    padding: 40px 0;
`;

const SearchWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    height: 45px;
    justify-content: space-between;
`;

const SearchInput = styled.input`
    flex: 1;
    border-radious: 4px;
    height: 42px;
    padding: 4px 12px;
`;

const SubmitBtn = styled.button`
    height: 42px;
    max-width: 160px;
    margin-left: 12px;
    border-radious: 4px;    
`;

const ResultsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16px;
    --bs-gutter-x: none;
`;

const ResultsList = styled.div`
`;


const ResultCard = styled.div`
    border-top: 2px solid #ccc;
    border-bottom 2px solid #ccc;
`;

const CardImage = styled.img`
    width: 300px;
    
`;


const CardBody = styled.div`

`;

const CardAuthor = styled.h5`
`;

const CardDescription = styled.p`
`;

const CardLinkBtn = styled.a`

`;

const HomePage = () => {

    const [searchVal, setSearchVal] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const labels = [
        "author",
        "url",
        "title",
        "selftext",
        "thumbnail",
        "source_url"
    ]
    
    const handleRequest = async () => {
        // Initialize Results and Loading Spinner
        setLoading(true);
        // Get Results From Reddit
        let res = await BaseApi.base({url: `/api/v1/search/${searchVal}`, method: "GET"});

        console.log(res.data);
        setResults(res.data);
        setLoading(false);
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            // If Enter is pressed inside input field, need to submit reddit search reqeust;
            handleRequest();
        }
    }

    return (
        <HomeContainer className="container">
            <SearchWrapper className="row">
                <SearchInput className="form-control" value={searchVal} onChange={e => setSearchVal(e.target.value)} onKeyDown={handleKeyDown} />
                <SubmitBtn className="form-control btn-primary" onClick={handleRequest}>
                    Submit
                </SubmitBtn>
            </SearchWrapper>

            <ResultsWrapper className="row">
                {
                    loading ?
                    <LoadingSpinner /> : 
                    <ResultsList>
                        {
                            results.map((res, ind) => {
                                let result = res.data;
                                return (
                                    <LazyLoad key={ind} placeholder={<LoadingSpinner/>}>
                                        <ResultCard key={ind} className="card">
                                            {
                                                result.thumbnail && result.thumbnail.includes('http')  ?
                                                <CardImage className="card-img-top" src={result.thumbnail} alt="Card image cap" /> : 
                                                <CardDescription> Self </CardDescription>
                                            }
                                            <CardBody className={"card-body"}>
                                                <CardAuthor data-toggle="tooltip" data-placement="top" title="Title & Author">{result.title} | {result.author}</CardAuthor>
                                                <CardDescription className="card-text">
                                                    <strong>Self Text: </strong> 
                                                    <br/>
                                                    {result.selftext}
                                                </CardDescription>
                                                <CardDescription>
                                                    <strong>Preview Img URL: </strong>
                                                    <br/>
                                                    {result.preview?result.preview.images[0].source.url:""}
                                                </CardDescription>
                                                <CardLinkBtn className="btn btn-primary" href={`${result.url}`} target="_blank">
                                                    Open in other page
                                                </CardLinkBtn>
                                            </CardBody>
                                        </ResultCard>
                                    </LazyLoad>
                                );
                            })
                        }
                    </ResultsList>
                }
            </ResultsWrapper>
        </HomeContainer>
    )
};

export default HomePage;