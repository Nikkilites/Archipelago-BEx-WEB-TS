import { Button } from '../components/Buttons'
import { LoginForm } from '../components/Login'

export default function App() {
  return (
    <>
      <div className='flex flex-col gap-6'>
        <Header></Header>
        <LoginForm></LoginForm>
        <LoginForm></LoginForm>
      </div>
    </>
  )
}

function Header() {
  return (
    <div className="border-b border-b-zinc-200 pl-6 pr-6 p-3 flex flex-col bg-gray-100">
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-google-sans font-bold">Backlog Expedition</h1>
          <span className="text-zinc-800">Welcome __, you are connected to Archipelago!</span>
        </div>

        <div className="flex flex-col items-end">
          <Button text='Logout'>Logout</Button>
        </div>
      </header>
    </div>
  )
}
