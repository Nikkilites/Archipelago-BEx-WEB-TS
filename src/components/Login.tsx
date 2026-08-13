import type { ReactNode } from "react"
import { Button } from '../components/Buttons'

type FormProps = {
  children: ReactNode
  placeholder: string
  type: string
}

export function LoginForm() {
  return (
    <div className='flex flex-col w-4/16 mx-auto gap-3'>
        <div className='bg-legacy-blue-100 rounded-lg border border-legacy-blue-200'>
            <div className='p-5 flex flex-col gap-3'>
                <h2 className="text-3xl">Archipelago Login</h2>
                <InputForm type="text" placeholder="Example: archipelago.gg:12345">Host and Port</InputForm>
                <InputForm type="text" placeholder="Example: MyBExName">Player Name</InputForm>
                <InputForm type="password" placeholder="Leave blank if no password">Password</InputForm>
                <Button text='Login & Connect'>Login & Connect</Button>
            </div>
        </div>

        <div className='bg-legacy-red-100 rounded-lg border border-legacy-red-200'>
            <label className='p-5 flex text-center text-legacy-red-400'>
                Connection failed. Please refresh the room, check your login info and the room data, then try again.
            </label>  
        </div>    
    </div>
  )
}

function InputForm(props: FormProps) {
  return (
    <div className="flex flex-col">
      <label>{props.children}</label>
      <input 
        className="rounded-lg bg-white px-4 py-2 outline-1 outline-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-legacy-blue-350" 
        placeholder={props.placeholder}
      />
    </div>
  )
}
