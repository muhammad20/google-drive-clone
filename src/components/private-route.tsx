import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { RootState } from "../redux/store";

interface Props extends RouteProps {
  component: any;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  ...rest
}) => {
  const authenticated = useSelector((state: RootState) => state.auth.authenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <RouteComponent {...props} />
        ) : (
          <Redirect to="/sign-in" />
        )
      }
    />
  );
};
