import {useState} from 'react';
import {DesEncriptar, Encriptar} from '../../Encryptar/Crypto'

export const useSessionStorage = (keyName, defaultValue) =>{
    const [storedValue, setStoredValue] = usesState(()=>{
        try {
            const value = DesEncriptar(window.sessionStorage.getItem(keyName));
            if(value){
                return JSON.parse(value);
            } else{
                window.sessionStorage.setItem(keyName, Encriptar(defaultValue));
                return defaultValue;
            }
        } catch (err){
            return defaultValue;
        }
    });

    const setValue = (newValue)=>{
        try {
            window.sessionStorage.setItem(keyName, Encriptar(nevValue));
        } catch (err){}
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};
