import { hookstate } from "@hookstate/core"

interface State {
  env: string
  lang: string
  isTest: boolean
  baseUrl: string
  apiBaseUrl: string

  // POPUP
  msgDialogVisible: boolean
  msgDialogMessage: string
}

const initialState: State = {
  env: process.env.NEXT_PUBLIC_ENV!,
  lang: process.env.NEXT_PUBLIC_LANG || 'en',
  isTest: false,
  baseUrl: process.env.NEXT_PUBLIC_BASE_PATH!,
  apiBaseUrl: process.env.NEXT_PUBLIC_ENV === 'development' ? process.env.NEXT_PUBLIC_API_BASE! : `${process.env.NEXT_PUBLIC_API_PATH}${process.env.NEXT_PUBLIC_API_BASE!}`,

  // POPUP
  msgDialogVisible: false,
  msgDialogMessage: '',
}

const globalState = hookstate(initialState)

export default globalState