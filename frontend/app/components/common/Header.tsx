import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div>
      <header className="bg-zinc-300">Header
      <Link href="/sign_in">
        <Button>Sign In</Button>
      </Link>
      </header>
    </div>
  );
};

export default Header;
