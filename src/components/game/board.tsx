import { DndProvider } from "react-dnd";
// import { TouchBackend } from 'react-dnd-touch-backend' // use for mobile
import { HTML5Backend } from "react-dnd-html5-backend";

import Pile from "./pile";

// https://react-dnd.github.io/react-dnd/docs/tutorial
export default function Board() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="aspect-square h-full grow overflow-hidden border flex">
        <Pile />
        <Pile />
      </div>
    </DndProvider>
  );
}
