"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useKindeBrowserClient();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger menu button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 ease-in-out overflow-hidden absolute top-16 left-0 right-0 bg-background border-b border-border",
          isMenuOpen ? "max-h-64 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-4 space-y-4">
            {/* Mobile navigation */}
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-4 rounded-md hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2 px-4 rounded-md hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile buttons */}
            <div className="flex flex-col space-y-3 pt-3 border-t border-border">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="px-4 py-2">
                    <span className="text-sm text-muted-foreground">
                      Welcome, {user?.given_name || user?.email}
                    </span>
                  </div>
                  <LogoutLink>
                    <Button
                      variant="ghost"
                      className="justify-start w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Logout
                    </Button>
                  </LogoutLink>
                </div>
              ) : (
                <>
                  <LoginLink>
                    <Button
                      variant="ghost"
                      className="justify-start w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button
                      className="justify-start w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </RegisterLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
