import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from '../Button';
import { Container } from './styles';
import { ControlledInput } from '../ControlledInput';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
type FormData = {
  name: string;
  email: string;
  password: string;
  password_confirm: string

}

const schema = yup.object({
  name: yup.string().required("Informa o seu nome"),
  email: yup.string().email("Email inválido").required("Informe o e-mail"),
  password: yup.string().min(6, "A senha deve ter ao menos 6 dígitos").required("Informe a senha"),
  password_confirm: yup.string().oneOf([yup.ref('password')], 'A senha de confirmação não confere.')
})

//const VALID_EMAIL_EXPRESSION = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

export function Form() {

  const { control, handleSubmit, formState : {errors}} =  useForm({
    resolver: yupResolver(schema)
  })
  
  function handleUserRegister(data: FormData) {
    console.log(data);
    
  }

  

  return (
    <Container>
      <ControlledInput
        icon="user"
        placeholder="Nome"
        name="name"
        control={control}
        error={errors.name}
       
      />
      <ControlledInput
        control={control}
        name="email"
        icon="mail"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize='none'
        error={errors.email}
       
      />
      <ControlledInput
        control={control}
        name="password"
        icon="lock"
        placeholder="Senha"
        secureTextEntry
        error={errors.password}
      />
      <ControlledInput
        name="password_confirm"
        control={control}
        icon="lock"
        placeholder="Confirme a senha"
        secureTextEntry
        error={errors.password_confirm}
       
      />

      <Button
        title="Cadastrar"
        onPress={handleSubmit(handleUserRegister)}
      />
    </Container>
  )
}