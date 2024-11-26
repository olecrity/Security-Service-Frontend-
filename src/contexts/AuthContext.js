import { createContext, useContext, useReducer } from "react";
import { useBuilding } from "./BuidingContext";

const DB_BASE_URL = "http://localhost:8080";

const AuthContext = createContext();

const initialState = {
  login: null,
  sessionId: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        login: action.payload.data.name,
        sessionId: action.payload.data.id,
        isAuthenticated: true,
      };
    case "logout":
      return { ...initialState };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ login, sessionId, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function signUp(login) {
    const res = await fetch(`${DB_BASE_URL}/api/session/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: login }),
    });
    const data = await res.json();
    console.log(data);
    dispatch({ type: "login", payload: { data } });
  }

  async function logIn(login) {
    const res = await fetch(`${DB_BASE_URL}/api/session/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: login }),
    });
    if (!res.ok) {
      throw new Error("Bad Request💥💥💥💥");
    }
    const data = await res.json();
    console.log(data);
    dispatch({ type: "login", payload: { data } });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ login, sessionId, isAuthenticated, signUp, logIn, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
