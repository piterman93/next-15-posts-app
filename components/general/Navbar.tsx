import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function Navbar() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = await isAuthenticated();

  return (
    <nav className="w-full border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo sekcja (lewa strona) */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
                YourLogo
              </div>
            </Link>
          </div>

          {/* Nawigacja środkowa (ukryta na mobile) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Dashboard
            </Link>
          </div>

          {/* Buttony (prawa strona - ukryte na mobile) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.given_name || user?.email}
                </span>
                <LogoutLink>
                  <Button variant="ghost">Logout</Button>
                </LogoutLink>
              </div>
            ) : (
              <>
                <LoginLink>
                  <Button variant="ghost">Login</Button>
                </LoginLink>
                <RegisterLink>
                  <Button>Sign Up</Button>
                </RegisterLink>
              </>
            )}
          </div>

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
