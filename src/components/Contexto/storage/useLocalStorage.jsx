import {useState} from 'react';

export const useLocalStorage = (keyName, defaultValue) =>{
    const [storedValue, setStoredValue]=useState(()=>{
        try{
            const value = window.localStorage.getItem(keyname);

            if (value){
                return JSON.parse(value);
            }else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err){
            return defaultValue;
        }
    });
    const setValue = (newValue)=>{
        try{
            window.localStorage.setItem(keyName, JSON.stringify(newVakye));
        }catch (err){}
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
}