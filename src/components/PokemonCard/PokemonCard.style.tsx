import { css } from '@emotion/react'
import pokemonIconWhite from '@/assets/images/pokemon-icon-white.png';
import { baseColor } from '@/variables';

export const pokemonCard = css`
  cursor: pointer;
  padding: 1rem;
  border-radius: 0.75rem;
  position: relative;
  background: ${baseColor};
  
  .pokemon-name {
    color: white;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  .pokemon-owned {
    margin-left: -0.125rem;
    border-radius: 1rem;
    padding: 0.25rem 0.75rem;
    background: rgba(255, 255, 255, 0.2);
    color: white; 
    font-weight: bold;
    font-size: 0.75rem;
  }
  
  .pokemon-image {
    position: absolute;
    right: 0;
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${pokemonIconWhite});
    background-size: 100%;
    width: 120px;
    height: 120px;
    padding: 20px 0 0px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
`;
