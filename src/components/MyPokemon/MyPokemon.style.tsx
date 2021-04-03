import { css } from '@emotion/react';
import { baseDarkRed, baseSoftRed } from '@/variables';

export const myPokemonGrid = css`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
`;

export const noPokemonWrapper = css`
  text-align: center;
  padding-top: 2rem;

  button {
    border: none;
    border-radius: 5rem;
    font-size: 1rem;
    padding: 0.75rem 2rem;
    margin-top: 1rem;
    cursor: pointer;

    &.btn-soft-red {
      color: ${baseDarkRed};
      background: ${baseSoftRed};
    }
  }
`;
