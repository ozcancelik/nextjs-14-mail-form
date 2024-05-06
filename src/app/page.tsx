import Form from "@/components/form";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js Mail Form Sender Example with Server Actions</title>
      </Head>
      <div className="md:w-1/2 w-5/6 p-5 border mx-auto my-5 bg-slate-200 rounded-lg">
        <h1 className="text-xl font-bold">Next.js Mail Form Sender Example</h1>
        <p className="mb-12">
          This is an example of a mail form sender with server actions.
          <br />
          It uses Nodemailer, Zod, React Hook Form, Handlebars, ReCAPTCHA and
          TailwindCSS. Shadcn/UI is used for Toast messages.
          <br />
          <br />
          You can find the code for this example{" "}
          <Link
            className="font-bold underline"
            href="https://github.com/ozcancelik/nextjs-14-mail-form"
            target={"_blank"}
          >
            here
          </Link>
        </p>
        <Form />
      </div>
    </div>
  );
}
