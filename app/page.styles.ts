import styled from 'styled-components';

export const HomeContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    height: 100vh;
    color: ${({ theme }) => theme.colors.text};
`

export const AccentText = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
`

export const SubText = styled.p`
    color: ${({ theme }) => theme.colors.secondary};
`

export const HeroSection = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    div {
        width: 100%;    
        height: 100%;
    }
`