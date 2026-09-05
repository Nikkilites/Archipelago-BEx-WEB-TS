import { Title } from '../components/Title'
import { Button } from '../components/Buttons'
//import { useSession } from '../context/SessionContext'

export function TrashExchange() {
//  const { trashAquired, playerOptions } = useSession()

//  <h5>Trash required: {trashAquired} all trash/{playerOptions.HintShopCost} without needed calc</h5>

  return ( 
    <div className="flex flex-col gap-4">
        <Title>Trash Exchange</Title>
        <h5>This page is currently not functional</h5>
        <Button className='self-start' disabled={true}>Purchase Hint</Button>
    </div>
  )
}
