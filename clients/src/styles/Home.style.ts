import styled from "@emotion/styled";

export const Header = styled.header`
  background-attachment: fixed;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow-x: hidden;
`;
export const ImageBackground = styled.header<{ image: string }>`
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.image}) no-repeat;
  background-size: cover;
  background-attachment: fixed;
  transform: scale(1.5) translateY(-10%);
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
`;
export const Section = styled.section<{ isColumn: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isColumn ? "column" : "row")};
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8));
  height: auto;
  padding-bottom: 5rem;
  padding-top: 5rem;
  padding-inline: 10rem;
  margin-bottom: 0.3rem;
  z-index: 100;
`;
export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  flex: 1;
  height: 100%;
  width: 50%;
`;
export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 50%;
  height: 100%;
`;
export const ImageTv = styled.img`
  position: absolute;
`;
export const Title1 = styled.h2`
  font-size: 3em;
  color: white;
`;
export const Title2 = styled.p`
  font-size: 1.5em;
  color: white;
  margin-top: -2rem;
`;
export const CardMini = styled.div`
  width: 400px;
  height: 120px;
  overflow: hidden;
  border-radius: 20px;
  border: 2px solid #6f6f6f;
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
export const CardMiniLeft = styled.div`
  display: flex;
  padding: 10px;
  img {
    width: 60px;
  }
  .mai-download-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1rem;
    .title {
      color: white;
    }
    .subtitle {
      color: #0055ff;
    }
  }
`;
export const CardMiniRight = styled.div`
  padding-right: 20px;
  img {
    width: 65px;
  }
`;
export const MaiUL = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  li {
    width: 100%;
    height: 40px;
    list-style: none;
    position: relative;
    display: flex;
    align-items: center;
    overflow-y: hidden;
    padding: 0.5rem 0.5rem 0.5rem 0;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    &:hover {
      padding-left: 0.2rem;
    }
    &:hover a {
      color: #f8162d;
    }
    a {
      text-decoration: none;
      color: #f6f6ffa2;
      transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
      &:hover {
        color: #f8162d;
      }
    }
  }
`;
export const MaiFooterCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  .mai-link {
    a {
      text-decoration: none;
      color: #f6f6ffa2;
      transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
      &:hover {
        color: #f8162d;
      }
    }
  }
`;

export const MaiNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  padding-inline: 15rem;
  .left {
    flex: 1;
    
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: end;
    button {
      justify-self: end;
    }
  }
`;

export const MaiStarted = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
  h1 {
    color: white;
    font-size: 3.5rem;
  }
  h2 {
    color: white;
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;
