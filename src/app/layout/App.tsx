import Navbar from "./nav/Navbar";
import AnimatedOutlet from "../router/AnimatedOutlet";
import AuthModal from "../../feature/account/AuthModal";

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-10 mt-24">
        <AnimatedOutlet />
      </div>
      <AuthModal />
    </div>
  );
}
