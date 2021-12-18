import { ReactNode } from "react";
import { User } from "../../types";
import { NextSeo } from "next-seo";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar";
import Head from 'next/head'

interface Props {
  children: ReactNode;
  title: string;
  user?: User;
}

export default function Container({ children, title, user }: Props) {
  return (
    <>
      {title && <NextSeo title={`${title} - Random Person`}/>}
      <ToastContainer />
      <div className="flex flex-col h-screen justify-between">
        <Navbar user={user}></Navbar>
          <div className="max-w-7xl relative w-full">{children}</div>
      </div>
    </>
  );
}
