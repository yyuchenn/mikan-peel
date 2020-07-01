import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

export default function PrivateRoute({ children, ...rest }) {
    const privilege = useSelector(state => state.user.privilege);
    const logging = useSelector(state => state.user.logging);

    return (!logging ? (
        <Route
            {...rest}
            render={({ location }) =>
                privilege > 0 ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    ) : (<div/>));
}