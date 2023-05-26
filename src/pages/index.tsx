/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import LoadingIcon from "~/utils/Loading";

const translateWord = async ({
  word,
  lang,
}: {
  word: string;
  lang: { code: string; name: string };
}) => {
  const response = await axios.post("/api/translate", { word, lang });

  return {
    language: response.data.language as { code: string; name: string },
    translation: response.data.translation as string,
  };
};

const languages = [
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "eu", name: "Basque" },
  { code: "ca", name: "Catalan" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "fr", name: "French" },
  { code: "gl", name: "Galician" },
  { code: "de", name: "German" },
  { code: "ht", name: "Haitian Creole" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "it", name: "Italian" },
  { code: "la", name: "Latin" },
  { code: "lb", name: "Luxembourgish" },
  { code: "no", name: "Norwegian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "ro", name: "Romanian" },
  { code: "sc", name: "Sardinian" },
  { code: "sr", name: "Serbian" },
  { code: "es", name: "Spanish" },
  { code: "sv", name: "Swedish" },
  { code: "tl", name: "Tagalog" },
  { code: "tr", name: "Turkish" },
  { code: "vo", name: "Volapük" },
  { code: "cy", name: "Welsh" },
  { code: "zu", name: "Zulu" },
];

function Translate() {
  const [text, setText] = useState("");

  const translationQueries = useQueries({
    queries: languages.map((lang) => ({
      queryFn: () => translateWord({ word: text, lang }),
      enabled: true,
      queryKey: ["translation", { word: text, lang }],
    })),
  });

  const isLoading = translationQueries.every((query) => query.isLoading);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start  bg-gradient-to-tr from-[#d162c5] to-[#ffbfcc]">
      <div className="flex items-center justify-center py-16">
        <img src="/logo.png" alt="logo" className="h-64 w-64"></img>
        <div className="flex flex-col items-center justify-center space-y-4 text-gray-100">
          <p className="text-6xl capitalize text-gray-50">vertaler</p>
          <p>Find names faster</p>
        </div>
      </div>
      <div className="flex items-center justify-center rounded p-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="rounded-2xl  bg-black/20 p-4 text-gray-50 placeholder-slate-300 filter backdrop-blur-2xl focus:border-indigo-500 focus:outline-none focus:ring"
          placeholder={"Type a word to translate"}
        />
      </div>

      <div className="mt-20 grid h-full w-full grid-cols-6 bg-black/20 px-20 py-4 text-gray-50 filter backdrop-blur-2xl">
        {isLoading && (
          <div className="col-span-6 flex h-full w-full items-center justify-center">
            <LoadingIcon className="h-16 w-16 animate-spin text-gray-50"></LoadingIcon>
          </div>
        )}
        {translationQueries?.map((item, index) => (
          <div key={index} className="mt-4">
            <h2 className="font-bold">{item.data?.language?.name}</h2>
            <p>{item.data?.translation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Translate;
