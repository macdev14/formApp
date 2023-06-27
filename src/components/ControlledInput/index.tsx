import React from "react";
import { Control, Controller, FieldError } from 'react-hook-form';
import { Input, InputProps } from "../Input";
import { Feather } from '@expo/vector-icons';
import { Error } from "./styles";
import { Text } from "react-native";
type Props = InputProps &{
    control: Control<any>;
    name: string;
    error?: FieldError 
}

export function ControlledInput({ control, name, icon, error, ...rest }: Props) {
   return <>
     <Controller name={name}
        control={control}
        render={

            ({ field: { onChange, value } }) => (
                <Input icon={icon} {...rest} onChangeText={onChange} value={value} />
            )
        }
    />
    {
        error && <Error>{error.message}</Error>
    }
    </>
}