import { Button } from "@/components/ui/button"
import Board from "@/components/game/board"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
      <Board />
    </div>
  )
}

export default App