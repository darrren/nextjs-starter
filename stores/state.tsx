import { hookstate } from "@hookstate/core"

interface State {
  env: string
}

const initialState: State = {
  env: process.env.NEXT_PUBLIC_ENV!
}

const globalState = hookstate(initialState)

export default globalState