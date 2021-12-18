import Link from "next/link";
import Image from "next/image";
import { User } from "../types";
import Dropdown from "./ui/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  user?: User;
}

export default function Navbar({ user }: Props) {
  return (
    <>
      <div className="flex justify-center items-center text-lg">
        <nav className="max-2-7xl drop-shadow-xl dark:drop-shadow-none bg-white dark:bg-dark-200 rounded-md flex justify-between p-4 mt-0 lg:mt-5 w-full lg:w-11/12 z-[1]">
          <div className="flex items-center">
            <Link href="/" passHref>
              <Image
                className="w-8 rounded-full bg-transparent"
                src={"/img/profile.jpg"}
                alt="Bot Profile"
                width={42}
                height={42}
              ></Image>
            </Link>
            <ul className="ml-5 text-1xl space-x-4 lg:flex rounded-full border px-5 py-2 hover:bg-black hover:text-white">
              <li className="inline-block">
                <Link href="https://github.com/UnusualAbsurd/" passHref>
                  Author
                </Link>
              </li>
            </ul>
          </div>
          <div className="items-center relative hidden lg:flex">
            {!user && (
              <Link href="api/auth/login" passHref>
                <button className="ml-5 text-xl text-indigo-500 font-semibold border-indigo-500 space-x-4 hidden lg:flex rounded-full border px-2 py-1 hover:bg-indigo-500 hover:text-white">
                <FontAwesomeIcon icon={['fab', 'discord']} size="lg"></FontAwesomeIcon>{'\u200b'} Login with Discord
                </button>
              </Link>
            )}
            {user && (
              <div className="pl-4 h-full">
                <Dropdown
                  content={
                    <div className="flex items-center space-x-2">
                      <Image
                        className="w-8 rounded-full bg-light-200 dark:bg-dark-100"
                        src={user.avatar}
                        alt="Use Avatar"
                        width={42}
                        height={42}
                      />
                      <div className="text-gray-200 dark:text-white">
                        {user.username}#{user.discriminator}
                      </div>
                    </div>
                  }
                  variant="big"
                >
                  <ul className="rounded-md bg-gray-500 hover:bg-gray-700 mt-2 py-2 text-sm text-black">
                    <Link href="/api/auth/logout" passHref>
                      <li className="text-red-400 text-xl w-full hover:bg-gray-700 px-4 transition duration-75 ease-in-out">
                       <FontAwesomeIcon icon={['fas', 'sign-out-alt']}></FontAwesomeIcon> Logout
                      </li>
                    </Link>
                  </ul>
                </Dropdown>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}