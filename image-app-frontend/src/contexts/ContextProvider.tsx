import { createContext, useContext, useState } from "react";
import { StateContextType, User, ContextProviderProps} from '../interfaces/project';

const initialState: StateContextType = {
    user: null,
    token: null,
    setUser: () => {}, 
    setToken: () => {}
}


const StateContext = createContext<StateContextType>(initialState)

export const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, _setToken] = useState<string | null>(localStorage.getItem('ACCESS_TOKEN'));

	const setToken = (token: string) => {
		_setToken(token);
		if (token) {
			localStorage.setItem('ACCESS_TOKEN', token);
			console.log('token');
		} else {
			localStorage.removeItem('ACCESS_TOKEN');
			console.log('else is working')
		}
	}
	return (
		<StateContext.Provider value={{
			user,
			token,
			setUser,
			setToken
		}}>
			{children}
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext);