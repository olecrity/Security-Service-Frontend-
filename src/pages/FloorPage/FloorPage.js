import AppNav from "../../components/AppNav/AppNav";
import { RoomsProvider } from "../../contexts/RoomsContext";
import Floor from "./Floor/Floor";

function FloorPage() {
  return (
    <div>
      <RoomsProvider>
        <AppNav />
        <Floor />
      </RoomsProvider>
    </div>
  );
}

export default FloorPage;
