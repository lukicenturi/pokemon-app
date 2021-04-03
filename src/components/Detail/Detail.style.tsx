import { css } from '@emotion/react';
import { baseColor, baseDarkRed, baseRed, baseSoftRed, mobileMaxWidth } from '@/variables';
import pokemonIconWhite from '@/assets/images/pokemon-icon-white.png';

export const detailWrapper = css`
  border-radius: 0.75rem;

  .pokemon-name {
    color: white;
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }
  
  .pokemon-image {
    width: 100%;
    padding-top: 3rem;
    height: 400px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      position: relative;
      z-index: 2;
    }
    
    &:after {
      content: '';
      position: absolute;
      width: 300px;
      height: 300px;
      background-image: url(${pokemonIconWhite});
      right: 0;
      bottom: -100px;
      background-size: 100%;
      z-index: 1;
    }
  }
  
  .pokemon-catch-wrapper {
    text-align: center;
    margin-top: 1rem;
    position: relative;
    z-index: 2;
    
    button {
      background: white;
      border: 4px solid ${baseDarkRed};
      color: ${baseDarkRed};
      font-size: 1rem;
      padding: 0.75rem 3rem;
      border-radius: 3rem;
      transition: .3s all;
      cursor: pointer;
      
      &:hover {
        background: ${baseDarkRed};
        color: white;
      }
    }
  }
  
  .pokemon-moves {
    position: relative;
    background: white;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
    padding: 2.5rem 1.5rem 1.5rem;
    margin: -1.5rem -1.5rem -1.5rem;
    max-width: none;
    
    .pokemon-moves-wrapper {
      padding-top: 1rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px;

      @media screen and (max-width: ${mobileMaxWidth}) {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .pokemon-move {
        border-radius: 0.75rem;
        color: white;
        padding: 1rem;
      }
    }
  }
  
  .pokemon-modal {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.7);
    z-index: 5;
    max-width: none;
    transition: .3s all ease-in-out;
    padding: 8rem 2rem 0;
    opacity: 0;
    visibility: hidden;
    
    &.show {
      opacity: 1;
      visibility: visible;
      
      .pokemon-modal-wrapper {
        transform: scale(1);
      }
    }
    
    .pokemon-modal-wrapper {
      background: white;
      padding: 1.5rem;
      border-radius: 0.75rem;
      text-align: center;
      max-width: 400px;
      margin: 0 auto;
      transform: scale(0);
      transition: .3s all ease-in-out;
      
      .pokemon-name {
        color: ${baseRed};
      }
      
      .pokemon-image {
        height: 100px;
        padding-top: 1rem;
        
        &:after {
          display: none;
        }
      }
      
      .pokemon-modal-action {
        padding-top: 2rem;
        input {
          font-size: 1rem;
          border: 2px solid #ddd;
          border-radius: 4rem;
          padding: 0.75rem 1.25rem;
          width: 100%;
          text-align: center;
        }
        button {
          width: 100%;
          border: none;
          border-radius: 5rem;
          font-size: 1rem;
          padding: 0.75rem 1.25rem;
          margin-top: 1rem;
          cursor: pointer;

          &:disabled {
            background: #ddd !important;
            color: #aaa !important;
          }
          
          &.btn-soft-red {
            color: ${baseDarkRed};
            background: ${baseSoftRed};
          }
          
          &.btn-red {
            background: ${baseRed};
            color: white;
          }
        }
      }
    }
  }
`
