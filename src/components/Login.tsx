import { useState, type SubmitEvent } from "react"

import { Button } from '../components/Buttons'
import { InputField } from '../components/InputField'

import { useLocalStorage } from "../hooks/useLocalStorage"
import { useSession } from "../context/SessionContext"

export function LoginForm() {
    const { connectAndProcess } = useSession()

    const [error, setError] = useState("")
    const [connecting, setConnecting] = useState(false)

    const [server, setServer] = useLocalStorage<string>("server", "")
    const [name, setName] = useLocalStorage<string>("name", "")
    const [pass, setPass] = useLocalStorage<string>("pass", "")

    async function submitLogin(e: SubmitEvent) {
        e.preventDefault()

        if (server.trim() === "" || name.trim() === "") return

        setConnecting(true)

        let result = await connectAndProcess(server, name, pass)

        if (!result) {
            setError("Connection failed. Please refresh the room, check your login info and the room data, then try again.")
        }

        setConnecting(false)
    }

    return (
        <div className='mt-4 w-85 flex flex-col mx-auto gap-3 viking:pt-4'>
            <div className='legacy:bg-legacy-blue-100 legacy:rounded-lg legacy:border legacy:border-legacy-blue-200 nordic:bg-nordic-red-500 nordic:border-4 nordic:border-nordic-red-400 viking:bg-viking-green-600'>
                <div className="viking:h-full viking:p-2 viking:border-viking-green-700">
                    <form 
                        className='p-5 flex flex-col gap-3 viking:p-3 viking:border viking:rounded-lg viking:border-viking-green-100 viking:text-viking-beige-300' 
                        onSubmit={submitLogin}>

                        <h2 className="text-3xl">Archipelago Login</h2>
                        <div className="flex flex-col gap-1">
                            <label>Host and Port</label>
                            <InputField 
                                value={server} 
                                onChange={e => setServer(e.target.value)} 
                                type="text" 
                                placeholder="Example: archipelago.gg:12345">
                            </InputField>
                            <label>Player Name</label>
                            <InputField 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                type="text" 
                                placeholder="Example: MyBExName">
                            </InputField>
                            <label>Password</label>
                            <InputField 
                                value={pass} 
                                onChange={e => setPass(e.target.value)} 
                                type="password" 
                                placeholder="Leave blank if no password">
                            </InputField>
                        </div>
                        <Button variant="login" className="inline-flex items-center justify-center" disabled={server.trim() === "" || name.trim() === "" || connecting}>
                            {connecting && <svg aria-hidden="true" className="w-5 h-5 text-neutral-tertiary animate-spin viking:fill-viking-beige-400 me-2" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>}
                            {connecting ? "Connecting..." : "Login & Connect"}
                        </Button>
                    </form>
                </div>
            </div>

            {error !== "" && 
                <div className='mb-3 legacy:bg-legacy-red-100 legacy:rounded-lg border legacy:border-legacy-red-200 viking:border-viking-red-200 viking:text-viking-red-100 viking:bg-viking-beige-200'>
                    <label className='p-5 flex text-center legacy:text-legacy-red-400'>{error}</label>
                </div>
            }
        </div>
    )
}
