import { DndProvider } from "react-dnd";
// import { TouchBackend } from 'react-dnd-touch-backend' // use for mobile
import { HTML5Backend } from "react-dnd-html5-backend";

import Card from "../ui/card";

// https://react-dnd.github.io/react-dnd/docs/tutorial
export default function Board() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="aspect-square h-full grow border">
        <Card text="Card 1">
          <Card text="Card 2">
            <Card text="Card 3">
              <Card text="Card 4" />
            </Card>
          </Card>
        </Card>
      </div>
    </DndProvider>
  );
}
