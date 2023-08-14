export interface PhotoModel {
	id: number;
	title: string;
	description: string;
	path: string;
	created_at: string;
}


export interface StateContextType {
    user: User | null;
    token: string | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setToken: (string: string) => void;
}

export interface User {
    name: string;
    email: string;
    password: string;
}

export interface ContextProviderProps {
    children: React.ReactNode;
}

export interface uploadModalData {
    isOpen: boolean;
    onClose: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    title: string;
    onTitleChange: (title: string) => void;
    description: string;
    onDescriptionChange: (description: string) => void;
    onUpload: (e: React.FormEvent<HTMLFormElement>) => void;
}