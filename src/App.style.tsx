import { css, Global } from '@emotion/react'
import { mobileMaxWidth } from './variables';

export const globalStyles = (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css?family=Poppins:300,400,700,900&display=swap');
      
      * {
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
        max-width: 100%;
        outline: none;
      }
      
      html, body {
        margin: 0;
        min-height: 100%;
        background: #f4f4f4;
        color: #081421;
      }
      
      body {
        padding: 4rem 0;
        
        @media screen and (max-width: ${mobileMaxWidth}) {
          padding: 0;
        }
      }
      
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
      }

      .text-link {
        text-decoration: none;
      }
      
      .title-case {
        &:first-letter {
          text-transform: uppercase;
        }
      }

      .badge-wrapper {
        display: flex;
        flex-flow: row wrap;
        margin-top: -0.5rem;
        margin-left: -0.5rem;

        .badge {
          margin-top: 0.5rem;
          margin-left: 0.5rem;
          border-radius: 1rem;
          padding: 0.25rem 0.75rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-weight: bold;
          font-size: 0.75rem;
        }
      }
    `}
  />
);
