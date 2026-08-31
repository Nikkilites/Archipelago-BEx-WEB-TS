import { Title } from '../components/Title'
import { Button } from '../components/Buttons'
import { useSession } from '../context/SessionContext'

export function TrashExchange() {
  const { trashAquired, playerOptions } = useSession()

  return ( 
    <div className="flex flex-col gap-4">
        <Title>Trash Exchange</Title>
        <h5>Trash required: {trashAquired} all trash/{playerOptions.HintShopCost} without needed calc</h5>
        <Button className='self-start'>Purchase Hint</Button>
    </div>
  )
}
