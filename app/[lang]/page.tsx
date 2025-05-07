/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react"
import { useParams, useRouter } from 'next/navigation'
import Image from "next/image"
import { useHookstate as UseHookstate } from '@hookstate/core'
import globalState from '@/stores/state'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useQuery } from "@tanstack/react-query"

// i18n
import { defaultNS } from '@/i18n/settings'

interface User {
  id: number
  name: string
  tel: number
  email: string
}

const FetchUsers = () => {
  const state = UseHookstate(globalState)
  const { apiBaseUrl } = state

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // const { data } = isTest.get() ? await axios.get(`${baseUrl.get()}dummyjson/getServices.json`) : await axios.get(`${apiBaseUrl.get()}/v1/getServices`)
      const { data } = await axios.get(`${apiBaseUrl.get()}/users`)
      return data as User[]
    },
  })
}

const Home = () => {
  const state = UseHookstate(globalState)
  const { baseUrl } = state
  const router = useRouter()
  const params = useParams()
  const { lang } = params as any
  const { t } = useTranslation([...defaultNS, 'home'], { lng: lang })
  const { data } = FetchUsers()
  console.log(data)

  const toggleLanguage = () => {
    // i18n.changeLanguage(i18n.language === 'en' ? 'tc' : 'en');
    router.push(`/${lang === 'en' ? 'tc' : 'en'}`)
  };

  useEffect(() => {
  }, [])

  return (
    <>
      <main className="flex flex-col items-center justify-center p-24">
        <p className="text-4xl font-bold mb-2">{lang}</p>
        <p className="text-4xl font-bold mb-2">{t('welcome')}</p>
        <p className="text-4xl font-bold mb-2">{t('title', { ns: 'home' })}</p>
        <p className="text-4xl font-bold mb-2">{t('greeting', { name: 'User' })}</p>
        <button
          onClick={toggleLanguage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          switch
        </button>
        <br/>
        {
          data && data?.map((e: any, i: any) => {
            return (
              <div key={i}>
                <p>{e.name}</p>
              </div>
            )
          })
        }
      </main>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src={`${baseUrl.get()}/images/next.svg`}
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                app/page.tsx
              </code>
              .
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="dark:invert"
                src={`${baseUrl.get()}/images/vercel.svg`}
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Deploy now
            </a>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src={`${baseUrl.get()}/images/file.svg`}
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src={`${baseUrl.get()}/images/window.svg`}
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src={`${baseUrl.get()}/images/globe.svg`}
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </>
  );
}

export default Home