import { useState, type SubmitEvent } from "react"

import { useSession } from "../context/SessionContext"

import { InputField } from '../components/InputField'
import { Button } from '../components/Buttons'
import { Title } from '../components/Title'

export function TextClient() {
    const { textClient, sendMessage } = useSession()
    const [msg, setMsg] = useState("")

    function submitMessage(e: SubmitEvent) {
        e.preventDefault()

        if (msg.trim() === "") return

        sendMessage(msg)

        setMsg("")
    }

    return ( 
        <div className="flex flex-1 flex-col h-full pr-3 gap-4">
            <Title>Text Client</Title>
            <label className='w-full p-2 flex flex-col min-h-100 max-h-100 scrollbar-thin scrollbar-gutter-auto overflow-auto border legacy:rounded-lg legacy:border-zinc-300 legacy:bg-zinc-100 legacy:text-zinc-700 viking:scrollbar-thumb-viking-beige-400 viking:scrollbar-track-viking-beige-100 viking:bg-viking-beige-300 viking:border-viking-beige-500 viking:text-viking-red-400'>
                {textClient.map(line => (
                    <p key={crypto.randomUUID()}>{line}</p>
                ))}
            </label>
            <form className="flex flex-row gap-2 justify-items-stretch" onSubmit={submitMessage}>
                <InputField 
                    placeholder="Type message..."
                    type="text" 
                    value={msg}
                    onChange={e => setMsg(e.target.value)}>
                </InputField>
                <Button className="mb-1" disabled={msg.trim() === ""}>Send</Button>
            </form>
        </div>
    )
}
