import { PICSEE_LOGO } from "@/lib/images";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white w-full px-4 py-2 flex items-center justify-between container mx-auto ">
      <Link to="/" className="flex items-center">
        <img src={PICSEE_LOGO} alt="PicSee Logo" className="h-25 w-auto" />
      </Link>
    </nav>
  );
}
