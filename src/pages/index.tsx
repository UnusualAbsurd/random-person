import Image from "next/image";
import Container from "../components/ui/Container";
import { User } from "../types";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { withSession } from "../util/session";
import { developerRoute } from "../util/redirects";
import { useRouter } from "next/router";
import Head from 'next/head'

interface Props {
  user?: User;
}

const fetchData = () => {
  return axios
    .get("https://random-data-api.com/api/users/random_user")
    .then((res) => {
      const name = `${res.data.first_name} ${res.data.last_name}`;
      const job = `${res.data.employment.title}`
      return {
        name,
        avatar: `${res.data.avatar}`,
        job
      };
    });
};

export default function HomePage({ user }: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [job, setJob] = useState("")
  const [clipboardText, setClipboardText] = useState(`Copy to clipboard`);
  const [mobile, setMobile] = useState(false);

  const handleResize = () => {
    setMobile(document.documentElement.clientWidth < 900);
  };

  useEffect(() => {
    if (router.query.r) {
      location.replace("/");
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchData().then((apiUser) => {
      setName(apiUser.name);
      setAvatar(decodeURI(apiUser.avatar));
      setJob(apiUser.job)
    });
  }, []);

  return (
    <>
      
      <Container title="Home" user={user}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md items-center space-x-1 backdrop-blur">
            <div className="flex-shrink-0 flex justify-center items-center">
              <Image
                src={
                  `${avatar}` ||
                  decodeURI(
                    "https://robohash.org/eumautmaxime.png?size=300x300\u0026set=set1"
                  )
                }
                height={56}
                width={56}
                alt="avatar"
              ></Image>
            </div>
            <h1 className="px-5 py-1 text-3xl flex justify-center items-center text-black-500  border-indigo-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-5555dd-200 focus:ring-offset-2">
              {name}
            </h1>
            <p className="px-1 py-3 text-sm flex justify-center items-center text-black-500 border-indigo-500 hover:border-transparent focus:outline-none focus:ring-2 foucs:ring-5555dd-200 focus:ring-offset-2">{job}</p>
            <button
              className="px-6 py-2 text-sm justify-start items-start text-indigo-500 font-semibold rounded-full border border-indigo-500 hover:bg-indigo-500 hover:text-gray-50 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-5555dd-200 focus:ring-offset-2"
              onClick={() => {
                fetchData().then((apiUser) => {
                  setName(apiUser.name);
                  setAvatar(apiUser.avatar);
                  setJob(apiUser.job)
                });
              }}
            >
              Random Person
            </button>
            <button
              className="px-6 py-2 text-sm justify-end items-end text-orange-500 font-semibold rounded-full border border-orange-500 hover:bg-orange-500 hover:text-gray-50 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-5555dd-200 focus:ring-offset-2"
              onClick={() => {
                navigator.clipboard.writeText(`${name} as a ${job}`);
                setClipboardText("Copied the info!");

                setTimeout(() => {
                  setClipboardText("Copy to clipboard");
                }, 2000);
              }}
            >
              {clipboardText}
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  withSession(developerRoute);
