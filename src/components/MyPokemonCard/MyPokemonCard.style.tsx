import { css } from '@emotion/react';
import { baseColor, baseYellow, mobileMaxWidth } from '@/variables';
import pokemonIconWhite from '@/assets/images/pokemon-icon-white.png';

export const myPokemonCard = css`
  border-radius: 0.75rem;
  position: relative;
  background: ${baseColor};
  display: flex;
  flex-flow: row wrap;
  align-items: start;
  
  .pokemon-image {
    background-image: url(${pokemonIconWhite});
    background-position: center;
    background-size: 100%;
    width: 120px;
    flex: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
  
  .pokemon-content {
    padding: 1rem;
    flex: 1;
    
    .pokemon-name {
      color: white;
      font-weight: bold;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      
      &:hover {
        color: ${baseYellow};
      }
    }
  }
  .pokemon-nicknames {
    color: white;
    width: 100%;
    padding: 0 1rem 1rem;
    margin-left: 120px;
    margin-top: -1rem;
    
    @media screen and (max-width: ${mobileMaxWidth}) {
      margin-left: 0;
      margin-top: 0;
    }
    
    .pokemon-nicknames-header {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.9rem;
      padding-bottom: 0.5rem;
      display: flex;
      align-items: center;
      cursor: pointer;

      .pokemon-nicknames-header-text {
        margin-right: 0.25rem;
      }
    }
    
    .pokemon-nicknames-wrapper {
      .pokemon-nickname-wrapper {
        padding: 0.5rem 0;
        color: white;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        font-size: 0.8rem;
        display: flex;
        align-items: center;

        .pokemon-nickname-button {
          button {
            background: white;
            border: none;
            border-radius: 4rem;
            line-height: 1rem;
            padding: 0.125rem 0.5rem;
            display: flex;
            align-items: center;
            transition: .3s all;
            cursor: pointer;

            span {
              margin-left: 0.25rem;
            }

            &:hover {
              background: black;
              color: white;
            }
          }
        }

        .pokemon-nickname {
          margin-left: 1rem;
        }
      }
    }
  }

`;
