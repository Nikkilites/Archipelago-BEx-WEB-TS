import { Title } from '../components/Title'
import { Button } from '../components/Buttons'

export function TrashExchange() {
  return ( 
    <div className="flex flex-col gap-4">
        <Title>Trash Exchange</Title>
        <h5>Trash required: @CurrentSession.ItemHandler.TrashAvailable/@CurrentSession.HintHandler.GetHintCost()</h5>
        <Button className='self-start'>Purchase Hint</Button>
    </div>
  )
}
