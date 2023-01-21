import React, { useReducer } from "react";
import "../styles/App.css";
import { signUpFormValidation } from "../utils/validation";

const initialFormState = {
  input: {
    name: "",
    email: "",
    password: "",
    consent: false,
  },
  errors: {
    name: "",
    email: "",
    password: "",
  },
};

const signUpFormReducer = (state, action) => {
  switch (action.type) {
    case "input":
      return {
        ...state,
        input: {
          ...state.input,
          [action.payload.field]: action.payload.value,
        },
      };
    case "error":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.value,
        },
      };
    case "resetErrors":
      return {
        ...state,
        errors: initialFormState.errors,
      };
    default:
      return state;
  }
};

const App = () => {
  const [formState, dispatch] = useReducer(signUpFormReducer, initialFormState);

  const onInput = (event) => {
    let value;

    if (event.target.type === "checkbox") {
      value = event.target.checked;
    } else {
      value = event.target.value;
    }

    dispatch({
      type: "input",
      payload: { field: event.target.id, value },
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: "resetErrors" });

    const errors = signUpFormValidation(formState.input);

    if (errors !== null) {
      for (const error in errors) {
        dispatch({ type: "error", payload: { field: error, value: errors[error] } });
      }
    }
  };

  return (
    <form id="reducer-form" onSubmit={onFormSubmit}>
      <label htmlFor="name">Name </label>
      <input
        type="text"
        id="name"
        value={formState.input.name}
        onChange={onInput}
      />
      {formState.errors.name}
      <br />
      <br />
      <label htmlFor="password">Password </label>
      <input
        type="text"
        id="password"
        value={formState.input.password}
        onChange={onInput}
      />
      {formState.errors.password}
      <br />
      <br />
      <label htmlFor="email">Email </label>
      <input
        type="text"
        id="email"
        value={formState.input.email}
        onChange={onInput}
      />
      {formState.errors.email}
      <br />
      <br />
      <label htmlFor="consent">Send marketing emails? </label>
      <input
        type="checkbox"
        id="consent"
        checked={formState.input.consent}
        onChange={onInput}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default App;
