import { Children, useContext, useEffect, useState } from "react";
import { createContext } from "react";

export const AuxtionContext = createContext()

export const AuxtionProvider = ({ children }) => {

    const [biding, setBiding] = useState(0);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');

    const handleclick = () => {
        setBiding(1);
    }

    const handleclickstart = ()=> {
        setBiding(0);
    }

    useEffect(() => {
        handleclickstart()
    } ,[])


    return (
        <AuxtionContext.Provider value={{ biding , handleclick , setTitle , setImage , title , image }}>{children}</AuxtionContext.Provider>
    )
}