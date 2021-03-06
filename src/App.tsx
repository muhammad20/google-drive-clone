import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import firebase from "firebase";
import "./App.css";
import "firebase/firestore";
import "firebase/auth";
import { HomePage } from "./components/pages/home";
import { LoginPage } from "./components/pages/login";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setLoading } from "./redux/actions/auth/auth.actions";
import { PrivateRoute } from "./components/routing/private-route";
import { PublicRoute } from "./components/routing/public-route";
import { RootState } from "./redux/store";
import { Loader } from "./components/loader";
import "bootstrap/dist/css/bootstrap.min.css";

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(setUser(user));
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const { loading } = useSelector((state: RootState) => state.auth);
  if (loading) {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <Loader width={60} height={60} borderWidth={6} />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/space" />
        </Route>
        <PrivateRoute exact path="/space" component={HomePage} />
        <PublicRoute exact path="/sign-in" component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;
