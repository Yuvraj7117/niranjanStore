import React from "react";
import styled from "styled-components";

const MyImage = ({imgs}) => {
  
  return (
     
    <Wrapper>

      <div className="main-screen">
        <img src={imgs} alt={imgs} />
      </div>


    </Wrapper>
  );
};

const Wrapper = styled.section`


  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default MyImage;
