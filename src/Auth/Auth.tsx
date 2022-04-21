import { createContext, useContext } from "react";
import { User } from "../Models/User";
import * as React from "react";
import { feathersAuthProvider } from "./FeathersAuth";

//https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src/App.tsx

interface AuthContextInterface {
  user: User;  
  signin: (email: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  autoSignin: (callback: VoidFunction) => void;
}

let AuthContext = createContext<AuthContextInterface>(null!);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    let [user, setUser] = React.useState<any>(null);
  
    let signin = (email: string, password: string, callback: VoidFunction) => {
      return feathersAuthProvider.signin({email: email, password: password}, (x) => {
        setUser(x);
        callback();
      });
    };
  
    let signout = (callback: VoidFunction) => {
      return feathersAuthProvider.signout(() => {
        setUser(null);
        callback();
      });
    };
  
    let autoSignin = (callback: VoidFunction) => {
      return feathersAuthProvider.autoSignin((x) => {
         setUser(x);
         callback();      
      })
      
    };

    let value = { user, signin, signout, autoSignin };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}