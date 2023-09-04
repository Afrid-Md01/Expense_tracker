import React, { lazy, Suspense} from "react";
import { Route, Redirect } from "react-router-dom";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector} from "react-redux";
import "./App.css";

const SignInPage = lazy(() => import("./Components/SignInPage/SignIn-Page"));
const SignUpPage = lazy(() => import("./Components/SignUpPage/SignUp-Page"));
const HomePage = lazy(() => import("./Components/HomePage/HomePage"));
const ProfilePage = lazy(() => import("./Components/ProfilePage/ProfilePage"));

function App() {
  const userIsLoggedin = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signin-page" />
        </Route>

        {!userIsLoggedin && (
          <Route path="/signin-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <SignInPage />
            </Suspense>
          </Route>
        )}

        {!userIsLoggedin && (
          <Route path="/signup-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <SignUpPage />
            </Suspense>
          </Route>
        )}

        {userIsLoggedin && (
          <Route path="/homepage" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <HomePage />
            </Suspense>
          </Route>
        )}

        {userIsLoggedin && (
          <Route path="/profile-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <ProfilePage />
            </Suspense>
          </Route>
        )}

        {userIsLoggedin && (
          <Route path="*">
            <Redirect to="/homepage" />
          </Route>
        )}

        {!userIsLoggedin && (
          <Route path="*">
            <Redirect to="/" />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
