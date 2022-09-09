import React from "react";
import { Route, Redirect } from "react-router-dom";


export const ProtectedRoute = ({ component: Component, loggedIn, ...props }) => {

    return (
        <Route>
            {
                () => loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
            }
        </Route>
    )
}