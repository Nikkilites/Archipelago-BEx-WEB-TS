import { Button } from '../components/Buttons'
import { ThemeSwitch } from '../components/ThemeSwitch'

import { useSession } from '../context/SessionContext'

import { LoginForm } from '../components/Login'
import { SideNav } from '../components/Sidenav'
import { Home } from '../components/Home'
import { TextClient } from '../components/TextClient'
import { TrashExchange } from '../components/TrashExchange'
import { Island } from '../components/Island'
import { Locations } from '../components/Locations'

import { useLocalStorage } from '../hooks/useLocalStorage'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'


export default function App() {
  const { isActive, activePage, setActivePage } = useSession()

  const [theme, setTheme] = useLocalStorage<string>("theme", "viking")

  useEffect(() => {
    document.documentElement.classList.remove(
      "legacy",
      "nordic",
      "viking"
    );

    document.documentElement.classList.add(theme);
  }, [theme]);

  function onThemeChange(theme: string) {
    setTheme(theme)
  }

  function onPageChange(page: string) {
    setActivePage(page)
  }

  return (
    <>
      <div className={theme + " scrollbar-none overflow-auto"}>
        <div className="flex flex-col gap-4 min-h-svh justify-between nordic:font-pt nordic:bg-nordic-brown-700 viking:text-viking-green-700 viking:font-pt viking:bg-viking-beige-100 viking:gap-0">
          <Header theme={theme} />
          <div className='flex flex-1'>
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

  const [navDrawerActive, setNavDrawerActive] = useState(true)

    function onPageChangeWNavDrawer(page: string) {
      onPageChange(page)
      setNavDrawerActive(false)
    }

  return (
    <div className='flex flex-1 w-full gap-4 viking:pl-0'>
      <div className='flex'>
        <SideNav navActive={navDrawerActive} onPageChange={onPageChangeWNavDrawer}>{page}</SideNav>
        <div>
          <button type="button" onClick={() => setNavDrawerActive(curr => !curr)} className='absolute block md:hidden legacy:border-r legacy:border-t legacy:border-b legacy:bg-legacy-blue-100 legacy:rounded-r-lg legacy:border-legacy-blue-200 nordic:bg-nordic-red-500 nordic:border-4 nordic:border-nordic-red-400 viking:bg-viking-green-600 viking:text-viking-beige-400 viking:rounded-r-lg'>
            <svg className={twMerge("w-7 h-7", navDrawerActive ? "rotate-90" : "rotate-270")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
          </button>
        </div>
      </div>
      <div className={twMerge("viking:p-2 md:viking:p-4 flex-1 flex grow", navDrawerActive ? "hidden md:flex" : "")}>
        {
          {
            'Home': <Home/>,
            'TextClient': <TextClient/>,
            'TrashExchange': <TrashExchange/>,
            'Locations': <Locations/>
          }[page] || <Island>{page}</Island>
        }
      </div>
    </div>
  )
}

type HeaderProps = {
  theme: string

}

function Header({ theme }: HeaderProps) {
  const { playerName, isActive, disconnect } = useSession()

  return (
    <div className='viking:flex viking:flex-col'>
      <div className="legacy:border-b legacy:border-b-zinc-300 pl-6 pr-6 p-3 flex flex-col legacy:bg-gray-100 nordic:border-b-4 nordic:border-be-nordic-grey-800 nordic:bg-nordic-grey-700 viking:border-b-2 viking:bg-viking-beige-200 viking:border-b-viking-beige-500">
        <header className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="legacy:text-2xl legacy:font-semibold nordic:text-4xl nordic:font-norse nordic:font-bold nordic:text-nordic-parchment-100 viking:text-viking-red-300 viking:text-3xl viking:font-extrabold">Backlog Expedition</h1>
            <span className="legacy:text-zinc-700 nordic:text-nordic-parchment-200 viking:text-viking-red-300">Please be aware that this is an unfinished WIP</span>
            {isActive && <span className="legacy:text-zinc-700 nordic:text-nordic-parchment-200 viking:text-viking-red-300">Welcome {playerName}, you are connected to Archipelago!</span>}
          </div>

          {isActive && <div className="flex items-end"><Button onClick={disconnect}>Logout</Button></div>}
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
    <div className="flex flex-col text-sm text-center p-2 md:text-base md:pl-6 md:pr-6 md:p-3  legacy:bg-gray-100 legacy:border-t legacy:border-t-zinc-300 nordic:bg-nordic-grey-700 viking:bg-viking-red-300">
      <footer className="grid grid-cols-3 viking:text-viking-beige-300">
        <ThemeSwitch onThemeChange={onThemeChange}/>
        <span className='mx-auto'>BEx Version 4.0</span>
        <a className='flex justify-end underline' href="https://github.com/Nikkilites/Archipelago-BacklogExpedition-APWorld/blob/main/docs/en_Backlog%20Expedition.md" >BEx GitHub</a>
      </footer>
    </div>
  )
}