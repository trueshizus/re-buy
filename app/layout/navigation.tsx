import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signOutAction } from "../actions";
import { getProfile } from "../data";

export default async function Navigation() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isSignedIn = !!user;

  const profile = await getProfile();

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 h-10 flex justify-between py-2">
      ReBuy
      {isSignedIn && (
        <div className="flex gap-2">
          <span>
            Total credits: {Array.isArray(profile) ? 0 : profile?.credits}
          </span>
          <Link href="/profile">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4  me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Profile
            </button>
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4  me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
      {!isSignedIn && (
        <Link href="/sign-in">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4  me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Sign in
          </button>
        </Link>
      )}
    </nav>
  );
}
