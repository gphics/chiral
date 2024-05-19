"use client";
import briefStore from "@/briefStore";
import { useEffect } from "react";

function ServicesPage() {
  async function addBrief() {
    const api = "/brief/components";
    const mappedPromise = briefStore.map(async (elem) => {
      const first = await fetch("/mgt/passcode/components", { method: "POST" });
      const second = await first.json();

      if (second) {
        const { key } = second.data;
        const body = JSON.stringify({ key, ...elem });
        const third = await fetch(api, { method: "POST", body });
        const fourth = await third.json();
        return fourth;
      }
    });
    const promiser = await Promise.allSettled(mappedPromise);
    console.log(promiser);
  }
  // useEffect(() => {
  //   addBrief();
  // }, []);

  const arr: { title: string; body: string }[] = [
    {
      title: "Design",
      body: "We design corporate designs which include modern iconic logo, suitable and meaningful color palette, and advert flyers for both digitals and prints. Our designs are delivered in various formats which include PDF, JPEG, PNG and SVG formats.",
    },
    {
      title: "Development",
      body: "We develop fast, secure, maintainable and saclable softwares using cutting-edge tech stacks. Our frontend application is built using single page app framworks like Reat.js and Next.js while our backend web server is built on top of either Express.js or Nest.js. Our software development tech stacks originate from javaScript which is the primary web development language",
    },
    {
      title: "Management",
      body: "We help companies and brands manage their large scale and small scale softwares fixing bugs and deploying updates.",
    },
  ];
  return (
    <main className="services-page">
      <h2> Our Services </h2>
      {arr.map(({ title, body }, index: number) => (
        <article key={index}>
          <h3> {title} </h3>
          <p> {body} </p>
        </article>
      ))}
    </main>
  );
}

export default ServicesPage;
