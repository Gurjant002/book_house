"use client";
import { useState } from "react"
import { useEffect } from "react"

import HeaderPanel from "../components/header_panel"
import { RegisterUser } from "@/models/user"

import { registerUser } from "@/api/user"
import { useRouter } from "next/navigation"

export default function Register() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [confirmPass, setConfirmPass] = useState<boolean>()
  const [confirmEmail, setConfirmEmail] = useState<boolean>()
  
  const [user, setUser] = useState<RegisterUser>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    is_active: true,
    is_superuser: false,
    is_verified: false,
    date_joined: new Date().toISOString(),
    confirm_email: "",
    confirm_password: "",
    birth_date: "",
  })

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value !== user.password) {
      setErrorMsg("Passwords do not match")
      setConfirmPass(false)
    } else {
      setErrorMsg(null)
      setConfirmPass(true)
    }
    setUser({
      ...user,
      confirm_password: value,
    })
  }

  const handleRegister = async () => {
    if (confirmPass === false || confirmEmail === false) {
      return
    }
    try {
      const response = await registerUser(user)
      if (response.status === 200) {
        router.push("/login"); // Redirect to login page after successful registration
        
        // Redirect to login or home page
      } else {
        setErrorMsg("Registration failed. Please try again. <br />" + await response.json().then((data: { detail: string }) => data.detail))
      }
    } catch (error) {
      setErrorMsg("Registration failed. Please try again.")
    }
  }

  return (
    <>
      {/* <HeaderPanel /> */}
      <header className="font-mono p-5 cus-dark-bg text-white">
        <div className="m-auto w-full lg:w-7xl flex justify-center">
          <a href="/" className="font-bold text-4xl text-center cus-purple-text">G-BOOK</a>
        </div>
      </header>
      <main className="min-h-screen cus-dark-bg py-32">
        <div className="bg-white dark:bg-gray-600 p-5 m-auto w-full lg:w-7xl lg:rounded-2xl">
          <div>
            <h2 className="text-3xl font-bold cus-purple-text">Register</h2>
          </div>
          {errorMsg && <p className="text-red-500 text-sm font-bold" dangerouslySetInnerHTML={{ __html: errorMsg }}></p>}
          <p className="text-gray-500 text-sm">Please fill in the form below to create an account.</p>
          <br />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 py-5"  >
            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={handleChange}
                placeholder="Enter your first name"
                value={user.first_name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={handleChange}
                placeholder="Enter your last name"
                value={user.last_name}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="birth_date" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Birth Date
              </label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                onChange={handleChange}
                value={user.birth_date}
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                placeholder="Enter your username"
                value={user.username}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                value={user.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="confirm_email" className={"block mb-2 text-sm font-semibold " + (confirmEmail === false ? "text-red-500" : "text-gray-900") + " dark:text-white"}>
                Confirm Email
              </label>
              <input
                type="email"
                id="confirm_email"
                name="confirm_email"
                onChange={(e) => {
                  handleChange(e)
                  setConfirmEmail(e.target.value === user.email)
                }}
                placeholder="Confirm your email"
                value={user.confirm_email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
              <div>{confirmEmail === false && <p className="text-red-500 text-sm">Emails do not match</p>}</div>
            </div>
            <div className="col-span-2">
              <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                value={user.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="confirm_password" className={"block mb-2 text-sm font-semibold " + (confirmPass === false ? "text-red-500" : "text-gray-900") + " dark:text-white"}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                /* onChange={() => {
                  handleChange
                  handleConfirmPassword
                }} */
                onChange={(e) => {
                  handleChange(e)
                  handleConfirmPassword(e)
                }}
                placeholder="Confirm your password"
                value={user.confirm_password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
              <div>{confirmPass === false && <p className="text-red-500 text-sm">Passwords do not match</p>}</div>
            </div>
            <div>
              <button type="button" disabled={confirmPass === false} className="cus-purple-bg text-white font-semibold py-2 px-4 rounded-lg shadow-md cursor-pointer" onClick={handleRegister}>
                Register
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}