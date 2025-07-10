"use client";
import { useState } from "react"
import { useEffect } from "react"

import HeaderPanel from "../components/header_panel"
import { RegisterUser } from "@/models/user"

export default function Register() {
  const [error, setError] = useState<string | null>(null)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  return (
    <>
      <HeaderPanel />
      <main className="min-h-screen bg-gray-800">
        <div className="bg-white dark:bg-gray-600 p-5 m-auto w-full lg:w-7xl lg:rounded-2xl">
          <div>
            <h2 className="text-2xl font-bold">Register</h2>
          </div>
          <form className="grid grid-cols-1 gap-5 lg:grid-cols-4 py-5">
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
              <label htmlFor="confirm_email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                Confirm Email
              </label>
              <input
                type="email"
                id="confirm_email"
                name="confirm_email"
                onChange={handleChange}
                placeholder="Confirm your email"
                value={user.confirm_email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="space-y-5" data-hs-toggle-password-group="">
            <div className="max-w-sm">
              <label htmlFor="hs-toggle-password-multi-toggle-np" className="block text-sm mb-2 dark:text-white">New password</label>
              <div className="relative">
                <input id="hs-toggle-password-multi-toggle-np" type="password" className="py-2.5 sm:py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter new password" />
                <button type="button" data-hs-toggle-password='{
                    "target": ["#hs-toggle-password-multi-toggle", "#hs-toggle-password-multi-toggle-np"]
                  }' className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
                  <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                    <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                    <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                    <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <div className="max-w-sm mb-5">
              <label htmlFor="hs-toggle-password-multi-toggle" className="block text-sm mb-2 dark:text-white">Current password</label>
              <div className="relative">
                <input id="hs-toggle-password-multi-toggle" type="password" className="py-2.5 sm:py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter current password" value="12345qwerty" />
                <button type="button" data-hs-toggle-password='{
                    "target": ["#hs-toggle-password-multi-toggle", "#hs-toggle-password-multi-toggle-np"]
                  }' className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-hidden focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500">
                  <svg className="shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path className="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path className="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                    <path className="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                    <line className="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"></line>
                    <path className="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle className="hidden hs-password-active:block" cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          </form>
        </div>
      </main>
    </>
  )
}