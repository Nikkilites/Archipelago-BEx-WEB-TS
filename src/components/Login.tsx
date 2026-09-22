import { useState, type SubmitEvent } from "react"

import { Button } from '../components/Buttons'
import { InputField } from '../components/InputField'

import { useLocalStorage } from "../hooks/useLocalStorage"
import { useSession } from "../context/SessionContext"
import type { PlayerLogin } from "../archipelago/PlayerLogin"
import { twMerge } from "tailwind-merge"

export function LoginForm() {
    const { connectAndProcess } = useSession()

    const [error, setError] = useState("")
    const [connecting, setConnecting] = useState(false)

    const [collapsed, setcollapsed] = useLocalStorage<boolean>("collapsedPreviousConnections", true)

    const [server, setServer] = useLocalStorage<string>("server", "")
    const [name, setName] = useLocalStorage<string>("name", "")
    const [pass, setPass] = useLocalStorage<string>("pass", "")

    const [logins, setLogins] = useLocalStorage<PlayerLogin[]>("playerLogins", [])
    
    async function submitLogin(e: SubmitEvent) {
        e.preventDefault()

        if (server.trim() === "" || name.trim() === "") return

        setConnecting(true)

        const login: PlayerLogin = {server: server, name: name, pass: pass, id: (name + "@" + server)}
        removeLogin(login.id)
        setLogins(curr => [...curr, login])

        let result = await connectAndProcess(login)

        if (!result) {
            setError("Connection failed. Please refresh the room, check your login info and the room data, then try again.")
            removeLogin(login.id)
        }

        setConnecting(false)
    }

    function fillLogin(login: PlayerLogin) {
        setServer(login.server)
        setName(login.name)
        setPass(login.pass)
    }

    function removeLogin(id: string) {
        console.log("Removing login: " + id)
        setLogins(curr => curr.filter(login => login.id !== id))
    }

    return (
        <div className='mt-4 min-w-85 flex flex-col mx-auto gap-3 viking:pt-4'>
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
                        <div className="legacy:text-zinc-500 viking:text-viking-green-100">
                            <button type="button" onClick={() => setcollapsed(curr => !curr)} className="flex-1 w-full hover:cursor-pointer">
                                <div className="flex w-full justify-between">
                                    <p className="text-sm text-left">Previous Connections</p>
                                    <svg className={twMerge("w-5 h-5", collapsed ? "" : "rotate-180")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
                                </div>
                                <div className="border-t legacy:border-t-zinc-500 viking:border-t-viking-green-100"></div>
                            </button>
                            <div className="flex flex-col gap-1 mt-1">
                                {!collapsed && !connecting && [...logins].reverse().map(login => (
                                    <div key={login.id} className="p-1 flex w-full justify-between gap-5 text-sm legacy:pl-3 legacy:rounded-2xl legacy:hover:bg-legacy-blue-200 legacy:bg-legacy-blue-150 viking:rounded-sm viking:pl-2 viking:hover:bg-viking-green-700 viking:hover:ring viking:hover:ring-viking-red-300">                           
                                        <button type="button" onClick={() => fillLogin(login)} className="flex-1 hover:cursor-pointer">
                                            <p className="text-sm text-left">{login.id}</p>
                                        </button>
                                        <button type="button" onClick={() => removeLogin(login.id)} className="hover:cursor-pointer">
                                            <svg className="legacy:w-6 legacy:h-6 border-l pl-1 legacy:pr-1 legacy:border-zinc-400 viking:w-5 viking:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {error !== "" && 
                <div className='legacy:bg-legacy-red-100 legacy:rounded-lg border legacy:border-legacy-red-200 viking:border-viking-red-200 viking:text-viking-red-100 viking:bg-viking-beige-200'>
                    <label className='p-5 flex text-center legacy:text-legacy-red-400'>{error}</label>
                </div>
            }
            <div className='mb-5'></div>
        </div>
    )
}
