import { ItemTypes } from '@/lib/constants'
import { useDrag } from 'react-dnd'
import type { ReactNode } from 'react'

interface CardProps {
  children?: ReactNode
  text?: string
}

function Card({ children, text = 'Karte' }: CardProps) {
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: 'move',
      }}
    >
      <span>{text}</span>
      {children}
    </div>
  )
}

export default Card
