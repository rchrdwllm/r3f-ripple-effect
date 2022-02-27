import styled from "styled-components";

const StyledHero = styled.section`
    padding: 10rem 3rem 0;
    @media screen and (min-width: 1024px) {
        padding: 5rem;
    }
    @media screen and (min-width: 1506px) {
        padding: 10rem;
    }
    h1 {
        font-size: 3rem;
        @media screen and (min-width: 1024px) {
            font-size: 5rem;
        }
        @media screen and (min-width: 1920px) {
            font-size: 10rem;
        }
    }
`;

const Hero = () => {
    return (
        <StyledHero>
            <h1>
                Selected <br />
                works
            </h1>
        </StyledHero>
    );
};

export default Hero;
