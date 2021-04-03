import { css } from '@emotion/react';
import FeatherIcon from 'feather-icons-react';
import logo from '@/assets/images/logo.png';
import pokemonIcon from '@/assets/images/pokemon-icon.png';
import {
  Switch,
  Route,
  NavLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import { baseColor, mobileMaxWidth } from '@/variables';
import loadable from '@loadable/component';

const Home = loadable(() => import('@/components/Home/Home'));
const Detail = loadable(() => import('@/components/Detail/Detail'));
const MyPokemon = loadable(() => import('@/components/MyPokemon/MyPokemon'));

const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
  },
  {
    path: '/my-pokemon',
    name: 'MyPokemon',
    component: MyPokemon,
  },
  {
    path: '/:name',
    name: 'Detail',
    component: Detail,
  },
];

const RouteWithSubRoutes = (route: any) => {
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

const boxWrapper = (isDetailPage: boolean) => css`
  border-radius: 0.75rem;
  background: ${isDetailPage ? baseColor : 'white'};
  padding: 1.5rem;
  margin: 0 auto;
  width: 600px;
  overflow: hidden;
  position: relative;

  @media screen and (max-width: ${mobileMaxWidth}) {
    border-radius: 0;
  }
  
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    margin: 0 -0.5rem;
    max-width: none;

    .header-link {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        color: ${baseColor};
      }

      [aria-current] {
        display: none;
      }
      
      &.home-link {
        .home-link-icon {
          color: ${isDetailPage ? 'white' : ''};
        }
      }

      &.pokemon-link {
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }

    .headerLogo {
      img {
        height: 40px;
      }
    }
  }
`

const RouteSwitcher = () => {
  const location = useLocation();
  const currentRoute = routes.find(
    route => matchPath(location.pathname, route)
  );

  const isDetailPage = currentRoute!.name === 'Detail';

  return (
    <div css={boxWrapper(isDetailPage)}>
      <div className="header-wrapper">
        <div className="header-link home-link">
          <NavLink exact to="/">
            <FeatherIcon className="home-link-icon" icon="list"/>
          </NavLink>
        </div>
        <div className="headerLogo">
          <NavLink exact to="/">
            <img src={logo} alt="logo" height={40} width={108}/>
          </NavLink>
        </div>
        <div className="header-link pokemon-link">
          <NavLink to="/my-pokemon">
            <img src={pokemonIcon} alt="my-pokemon"/>
          </NavLink>
        </div>
      </div>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
};

export default RouteSwitcher;
