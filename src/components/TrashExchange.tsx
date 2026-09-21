import { Title } from '../components/Title'
import { SubTitle } from "./SubTitle"
import { Button } from '../components/Buttons'
import { useSession } from '../context/SessionContext'

export function TrashExchange() {
  const { trashAquired, trashSpent, trashCost, sendHint } = useSession()

  console.log("Trash Aquired: " + trashAquired + " | Trash Spent: " + trashSpent + " | Trash Available: " + (trashAquired - trashSpent) + " | Hintshop Cost: " + trashCost)

  const canPay = ((trashAquired - trashSpent) >= trashCost)

  return ( 
    <div className="flex flex-col gap-2">
        <div>
          <Title>Trash Exchange</Title>
          <SubTitle>
            <h5>Trash required: {trashAquired - trashSpent}/{trashCost}</h5>
          </SubTitle>
        </div>

        <Button className='self-start' onClick={sendHint} disabled={!canPay}>{canPay ? "Purchase Hint for " + trashCost : "Insufficient Trash"} </Button>
    </div>
  )
}
