import { Button } from '../components/Buttons'
import { ThemeSwitch } from '../components/ThemeSwitch'

import { useSession } from '../context/SessionContext'

import { LoginForm } from '../components/Login'
import { SideNav } from '../components/Sidenav'
import { Home } from '../components/Home'
import { TextClient } from '../components/TextClient'
import { TrashExchange } from '../components/TrashExchange'
import { Island } from '../components/Island'

import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'


export default function App() {
  const { isActive } = useSession()

  const [activePage, setActivePage] = useState("Home")
  const [theme, setTheme] = useLocalStorage<string>("theme", "viking")

  function onThemeChange(theme: string) {
    setTheme(theme)
  }

  function onPageChange(page: string) {
    setActivePage(page)
  }

  return (
    <>
      <div className={theme + " scrollbar-none overflow-auto"}>
        <div className="flex flex-col gap-4 h-screen justify-between nordic:font-pt nordic:bg-nordic-brown-700 viking:text-viking-green-700 viking:font-pt viking:bg-viking-beige-100 viking:gap-0">
          <Header theme={theme} />
          <div className='mb-auto h-full'>
            {!isActive ? <LoginForm /> : <ConnectedPage onPageChange={onPageChange} page={activePage} />}
          </div>
          <Footer onThemeChange={onThemeChange}/>
        </div>
      </div>
    </>
  )
}


type PageProps = {
  onPageChange: (page:string) => void
  page: string
}

function ConnectedPage({ page, onPageChange }: PageProps) {

  return (
    <div className='flex flex-row h-full w-full gap-4 pl-4 viking:pl-0'>
      <SideNav onPageChange={onPageChange}>{page}</SideNav>
      <div className='viking:p-4 h-full w-full'>
        {
          {
            'Home': <Home/>,
            'TextClient': <TextClient/>,
            'TrashExchange': <TrashExchange/>
          }[page] || <Island>page</Island>
        }
      </div>
    </div>
  )
}

type HeaderProps = {
  theme: string

}

function Header({ theme }: HeaderProps) {
  const { playerName, isActive } = useSession()

  return (
    <div className='viking:flex viking:flex-col'>
      <div className="legacy:border-b legacy:border-b-zinc-300 pl-6 pr-6 p-3 flex flex-col legacy:bg-gray-100 nordic:border-b-4 nordic:border-be-nordic-grey-800 nordic:bg-nordic-grey-700 viking:border-b-2 viking:bg-viking-beige-200 viking:border-b-viking-beige-500">
        <header className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="legacy:text-2xl legacy:font-semibold nordic:text-4xl nordic:font-norse nordic:font-bold nordic:text-nordic-parchment-100 viking:text-viking-red-300 viking:text-3xl viking:font-extrabold">Backlog Expedition</h1>
            {isActive && <span className="legacy:text-zinc-700 nordic:text-nordic-parchment-200 viking:text-viking-red-300">Welcome {playerName}, you are connected to Archipelago!</span>}
          </div>

          {isActive && <div className="flex items-end"><Button>Logout</Button></div>}
        </header>
      </div>
      <div className="viking:border-b-2 viking:bg-viking-beige-200 viking:border-b-viking-beige-500 flex">
        {theme === "viking" && <span className=" viking:text-viking-beige-500 viking:font-norse viking:text-xs">LogmundrhasnoideahowlonghehasbeensailingHehasweatheredstormswavesseamonsterswhirpoolsThelastnightwasaviolentthunderstormwithflashesoflightningshowingshadowsoflandallaroundhimButthewindsjustwouldnotallowhimtopullintothesafetyofanyharborNowwiththedawningofthemorningsunourintrepidVikinghasnowwasheduponaforeignshoreGoldensandsscrapingthekeelofhisdragonboatandthewaternowgentlylappingathisfeetashehopsoutDespitethehardshipshehasenduredthereisonlyonethingonhismindCollectasmuchtreasureashecancramintothebottomofhisboatandraidthisentireplace</span>}
      </div>
    </div>
  )
}

type FooterProps = {
  onThemeChange: (theme:string) => void
}

function Footer({ onThemeChange }: FooterProps) {
  return (
    <div className="pl-6 pr-6 p-3 flex flex-col legacy:bg-gray-100 legacy:border-t legacy:border-t-zinc-300 nordic:bg-nordic-grey-700 viking:bg-viking-red-300">
      <footer className="grid grid-cols-3 viking:text-viking-beige-300">
        <ThemeSwitch onThemeChange={onThemeChange}/>
        <span className='mx-auto'>BEx Version 4.0</span>
        <a className='flex justify-end underline' href="https://github.com/Nikkilites/Archipelago-BacklogExpedition-APWorld/blob/main/docs/en_Backlog%20Expedition.md" >BEx GitHub</a>
      </footer>
    </div>
  )
}