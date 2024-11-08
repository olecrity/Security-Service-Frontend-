import { RoomsProvider } from "../../contexts/RoomsContext";
import Floor from "./Floor/Floor";

function FloorPage() {
  return (
    <div>
      <RoomsProvider>
        <Floor />
      </RoomsProvider>
    </div>
  );
}

export default FloorPage;
