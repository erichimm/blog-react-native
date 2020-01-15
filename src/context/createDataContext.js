import React, { useReducer } from 'react';

/** 
 * @description Helper function for creating contexts
 * @param reducer The reducer function that manages this context's state
 * @param actions An object containing the actions used to modify this context's state
 * @param initialState The initial state of this context
 */
export default (reducer, actions, initialState) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        // actions === { addBlogPost: (distpatch) => { return () => { //do something } }}
        const boundActions = {};
        for(let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return <Context.Provider value={{ state, ...boundActions }}>
            {children}
        </Context.Provider>
    };

    return { Context, Provider };
};