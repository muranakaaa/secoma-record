"use client";
import Link from "next/link";
import { useUserState } from "../../hooks/useGlobalState";
import { Button } from "../ui/button";

const Header = () => {
  const [user] = useUserState();

  return (
    <header className="bg-zinc-300 py-4 px-6">
      <div className="flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold">Logo</span>
        </Link>
        {user.isFetched && (
          <div>
            {!user.isSignedIn ? (
              <div className="flex space-x-4">
                <Link href="/sign_in">
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">Sign In</Button>
                </Link>
                <Link href="/sign_up">
                  <Button className="bg-gray-500 text-white hover:bg-gray-600">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <div className="text-lg font-medium">Welcome, {user.name}</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
