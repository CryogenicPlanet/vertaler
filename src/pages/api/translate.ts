/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "~/env.mjs";

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { word, lang } = req.body;

//   if (!word || !lang) {
//     res.status(400).json({ message: "Word and language are both required" });
//     return;
//   }

//   try {
//     const response = await axios.get(
//       `https://translation.googleapis.com/language/translate/v2`,
//       {
//         params: {
//           q: word,
//           target: lang.code,
//           key: env.GT_KEY,
//         },
//       }
//     );

//     const translatedText = response.data.data.translations[0].translatedText;

//     res.status(200).json({ language: lang, translation: translatedText });
//   } catch (error) {
//     console.error(error);

//     //   @ts-expect-error
//     res.status(500).json({ statusCode: 500, message: error.message });
//   }
// };

import { type NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
  regions: ["iad1"],
};

export default async (request: NextRequest) => {
  const { word, lang } = await request.json();

  if (!word || !lang) {
    return NextResponse.json({
      message: "Word and language are both required",
    });
  }

  try {
    const response = await fetch(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `https://translation.googleapis.com/language/translate/v2?q=${word}&target=${lang.code}&key=${env.GT_KEY}`
    );

    const data = await response.json();

    return NextResponse.json({
      language: lang,
      translation: data?.data?.translations?.[0]?.translatedText || "Not found",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      statusCode: 500,
      //   @ts-expect-error
      message: error.message,
    });
  }
};
