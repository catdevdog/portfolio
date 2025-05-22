import styled from 'styled-components';

export const HomeContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    height: 100vh;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    justify-content: center;
`

export const AccentText = styled.h1`
    color: ${({ theme }) => theme.colors.primary};
`

export const SubText = styled.p`
    color: ${({ theme }) => theme.colors.secondary};
`

export const HeroSection = styled.div`
    width: 100%;
    height: calc(100vh - 180px);
    text-align: center;
`

export const ControlBox = styled.div`
    width: 340px;
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 8px;
`

export const HeroCommandInput = styled.input`
    font-family: 'DungGeunMo';
    padding: 12px 0;
    
    background-color: transparent;
    color: white;
    border: none;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    border-bottom: 2px solid ${({ theme }) => theme.colors.text};
    z-index: 10;

`

export const HeroCommandButton = styled.button`
    font-family: 'DungGeunMo';
    flex: 0 0 48px;
    height: 48px;
    font-size: 24px;
    text-align: center;
    background-color: transparent;
    color: white;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.text};
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`
