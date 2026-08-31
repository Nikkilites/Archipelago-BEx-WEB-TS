import { useState, type SubmitEvent } from "react"

import { Button } from '../components/Buttons'
import { InputField } from '../components/InputField'

import { useLocalStorage } from "../hooks/useLocalStorage"
import { useSession } from "../context/SessionContext"

export function LoginForm() {
    const { connectAndProcess } = useSession()

    const [error, setError] = useState("")

    const [server, setServer] = useLocalStorage<string>("server", "")
    const [name, setName] = useLocalStorage<string>("name", "")
    const [pass, setPass] = useLocalStorage<string>("pass", "")

    async function submitLogin(e: SubmitEvent) {
        e.preventDefault()

        if (server.trim() === "" || name.trim() === "") return

        await connectAndProcess(server, name, pass)

        setError("Connection failed. Please refresh the room, check your login info and the room data, then try again.")
    }

    return (
        <div className='w-75 flex flex-col mx-auto gap-3 viking:pt-4'>
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
                        <Button variant="login" disabled={server.trim() === "" || name.trim() === ""}>Login & Connect</Button>
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
