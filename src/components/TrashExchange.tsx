import { Title } from '../components/Title'
import { SubTitle } from "./SubTitle"
import { Button } from '../components/Buttons'
//import { useSession } from '../context/SessionContext'

export function TrashExchange() {
//  const { trashAquired, playerOptions } = useSession()

//  <h5>Trash required: {trashAquired} all trash/{playerOptions.HintShopCost} without needed calc</h5>

  return ( 
    <div className="flex flex-col gap-2">
        <div>
          <Title>Trash Exchange</Title>
          <SubTitle>
            <h5>Trash required: {trashAquired - trashSpent}/{trashCost}</h5>
          </SubTitle>
        </div>
    </div>
  )
}
