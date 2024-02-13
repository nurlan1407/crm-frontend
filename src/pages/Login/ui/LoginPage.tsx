import * as React from 'react';
import { FC, useState } from 'react';
import Input from 'shared/ui/input';
import logo from 'public/logo.png'
import Button from 'shared/ui/button';
import cls from './loginPage.module.scss'
import Link from 'shared/ui/link';
import Copyright from 'shared/ui/copyright';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { setUserFormData } from 'entities/user/userSlice';
import { RootState } from 'store/store';
import { ThunkAction, unwrapResult } from '@reduxjs/toolkit';
import { login } from 'entities/user/api';
import { useAlert } from 'hooks/useAlert';
import { useAlertContext } from 'hooks/AlertProvider';

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const {showAlert} = useAlertContext()
  const userFormData = useAppSelector((state: RootState) => state.user.userFormData)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRemeberMe] = useState(false)

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setUserFormData({ ...userFormData, [e.target.name]: e.target.value }))
  };
  const onSubmitForm = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = await dispatch(login(userFormData)).unwrap()
      navigate('/dashboard')
    } catch (err) {
      showAlert('error', err)
    }
  }

  return (
    <div className={cls.page}>
      <div className={cls.container}>
        <div className={cls['form-header']}>

          <div className={cls['logo-container']}>
            <div className={cls['logo-container-img']}>
              <img src={logo} width={100} height={100}></img>
            </div>
            <h2 className={cls['header-logo']}>LoyalBro</h2>
          </div>
          <h2 className={cls['header-title']}>Sign In</h2>
        </div>

        <form className={cls.form} onSubmit={onSubmitForm}>
          <Input
            name='email'
            placeholder='Email'
            type='text'
            value={userFormData.email}
            onChange={handleChange}
          ></Input>
          <Input
            name='password'
            type='password'
            placeholder='Password'
            value={userFormData.password}
            onChange={handleChange}
          ></Input>
          <div className={cls.checkboxContainer}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => {
                setRemeberMe(true)
              }}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Button type='submit' className='' onClick={() => { }}>
            Sign in
          </Button>
          <div className={cls.forgotPasswordBlock}>
            <Link to='/forgot' text='Forgot password?' className=''></Link>
            <Link to='/forgot' text='Dont have an account?' className=''></Link>
          </div>
        </form>
        <Copyright className={cls.copyright}></Copyright>
      </div>
    </div>

  );
}
