import { RoomsProvider } from "../../contexts/RoomsContext";
import Floor from "../../components/Floor/Floor";

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
