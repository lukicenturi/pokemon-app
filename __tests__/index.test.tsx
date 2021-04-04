import { Router } from 'react-router-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from '../src/App';
import { GET_POKEMONS } from '../src/queries';
import wait from 'waait'
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { GET_POKEMON } from '../src/queries/detail';
import { CommonUtil } from '../src/utils/common.util';
import toTitleCase = CommonUtil.toTitleCase;
import PokemonService from '../src/services/pokemon.service';

const mockedName = 'imaginary';
const mockedType = 'water';
const mockedMove = 'walk';

const mocks = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        limit: 100,
        offset: 0,
      }
    },
    result: {
      data: {
        pokemons: {
          results: [
            {
              id: '1',
              name: `${mockedName}`,
              image: `${mockedName}.png`,
            }
          ]
        }
      }
    }
  },
  {
    request: {
      query: GET_POKEMON,
      variables: {
        name: `${mockedName}`,
      }
    },
    result: {
      data: {
        pokemon: {
          id: '1',
          name: `${mockedName}`,
          moves: [
            {
              move: {
                name: `${mockedMove}`,
              }
            },
          ],
          types: [
            {
              type: {
                name: `${mockedType}`
              },
            }
          ]
        }
      }
    }
  }
];

test('home page', async () => {
  const history = createMemoryHistory();

  expect(history.location.pathname).toBe('/');

  let root;
  act(() => {
    root = render(
      <Router history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <App/>
        </MockedProvider>
      </Router>
    );
  });

  const headerTitle = await waitFor(() => root.getByTestId('header-title').innerHTML);

  expect(headerTitle).toBe('Pokelist');

  await act(async () => {
    await wait(0);

    const pokemonOwned = root.getByTestId('pokemon-owned').innerHTML;
    expect(pokemonOwned).toBe("0");

    const cardTitle = root.getByText(mockedName);
    fireEvent.click(cardTitle);
  });

  expect(history.location.pathname).toBe(`/${mockedName}`);
});

test('detail page', async() => {
  const history = createMemoryHistory( { initialEntries: [`/${mockedName}`] } );

  expect(history.location.pathname).toBe(`/${mockedName}`);

  let root;
  act(() => {
    root = render(
      <Router history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <App/>
        </MockedProvider>
      </Router>
    );
  });

  await waitFor(() => {
    const pokemonName = root.getByTestId('pokemon-name').innerHTML;
    expect(pokemonName).toBe(mockedName);

    const pokemonType = root.getByTestId('pokemon-type').innerHTML;
    expect(pokemonType).toBe(mockedType);

    const pokemonMove = root.getByTestId('pokemon-move').innerHTML;
    expect(pokemonMove).toBe(toTitleCase(mockedMove));

    const pokemonOwned = root.getByTestId('pokemon-owned').innerHTML;
    expect(pokemonOwned).toBe("0");
  });

  await wait(0);

  let status = '';

  do {
    await wait(0);

    act(() => {
      const catchButton = root.getByText('Catch Pokemon');
      fireEvent.click(catchButton);
    });

    status = root.getByTestId('catch-status').value;

    if (status === 'failed') {
      act(() => {
        const closeButton = root.getByTestId('failed-close-button');
        fireEvent.click(closeButton);
      })
    } else {
      act(() => {
        const nameInput = root.getByTestId('name-input');
        fireEvent.input(nameInput, { target: { value: mockedName }})
      })

      const nameSubmitButton = root.getByTestId('name-submit-button');
      expect(nameSubmitButton.disabled).toBe(false);

      act(() => {
        fireEvent.click(nameSubmitButton);
        const closeButton = root.getByTestId('success-close-button');
        fireEvent.click(closeButton);
      })

      await wait(0);

      const pokemonOwned = root.getByTestId('pokemon-owned').innerHTML;
      expect(pokemonOwned).toBe("1");
    }
  } while(status !== 'success');

  do {
    await wait(0);

    act(() => {
      const catchButton = root.getByText('Catch Pokemon');
      fireEvent.click(catchButton);
    });

    status = root.getByTestId('catch-status').value;

    if (status === 'failed') {
      act(() => {
        const closeButton = root.getByTestId('failed-close-button');
        fireEvent.click(closeButton);
      })
    } else {
      act(() => {
        const nameInput = root.getByTestId('name-input');
        fireEvent.input(nameInput, { target: { value: mockedName }})
      })

      const nameSubmitButton = root.getByTestId('name-submit-button');
      expect(nameSubmitButton.disabled).toBe(true);

      act(() => {
        const nameInput = root.getByTestId('name-input');
        fireEvent.input(nameInput, { target: { value: 'test' }})
      })

      expect(nameSubmitButton.disabled).toBe(false);

      act(() => {
        fireEvent.click(nameSubmitButton);
        const closeButton = root.getByTestId('success-close-button');
        fireEvent.click(closeButton);
      })

      const pokemonOwned = root.getByTestId('pokemon-owned').innerHTML;
      expect(pokemonOwned).toBe("2");
    }
  } while (status !== 'success');
});
