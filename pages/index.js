import Head from "next/head";
export default function Home() {
  return (
    <div className="text-center mt-32 ">
      <Head>
        <title>Whatsapp 3.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"
        } />
      </Head>

      {/* 👇 Start Deleting Everything intil the <p> tag */}

      <img className={"h-96 w-96 mb-5 mx-auto animate-bounce"} src={
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"
      } />
      <h1 className="text-2xl font-bold">Whatsapp 3.0 Starter Template</h1>
      <p>Made by Pranav Rajesh</p>
    </div>
  );
}