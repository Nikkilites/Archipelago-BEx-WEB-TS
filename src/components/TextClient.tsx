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
            <label className='w-full p-2 flex flex-col min-h-100 max-h-100 scrollbar-thin scrollbar-gutter-auto viking:scrollbar-thumb-viking-beige-400 viking:scrollbar-track-viking-beige-100 overflow-auto viking:bg-viking-beige-300 viking:border viking:border-viking-beige-500 viking:text-viking-red-400'>
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

/*
        <div className="Stuff here about the look of the client itself">
            {foreach (var line in TextLines)}
            {
                <div className="Stuff here about the look of the individual line. maybe extract this?">{line}</div>
            }
        </div>


.text-console {
    height: 300px;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.85);
    padding: 8px 10px;
    font-family: Consolas, monospace;
    font-size: 14px;
    line-height: 1.3;
    color: #e6e6e6;
    box-sizing: border-box;
}
    .text-console::-webkit-scrollbar {
        width: 8px;
    }

    .text-console::-webkit-scrollbar-track {
        background: transparent;
    }

    .text-console::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
    }

.console-line {
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
    padding: 0;
}
  */