import { css } from '@emotion/react';
import { mobileMaxWidth } from '@/variables';

export const pokemonGrid = css`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  
  @media screen and (max-width: ${mobileMaxWidth}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
