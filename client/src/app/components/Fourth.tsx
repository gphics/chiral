import React from "react";

function Fourth() {
  const arr: { title: string; body: string }[] = [
    {
      title: "Unique",
      body: "We design unique and suitable brand visual identities that would make you standout amidst the crowd of competitors.",
    },
    {
      title: "Fast",
      body: "We develop softwares with cutting-edge tech stacks that makes development, deployment and usage faster, leading to an enjoyable and memorable user experience.",
    },
    {
      title: "Secure",
      body: "We develop softwares paying so much attention to the security of your customers data so as to preserve and increase your brand integrity and reputation.",
    },
    {
      title: "Maintainable",
      body: "We develop softwares using software design patterns that are battle tested and trusted so as to make the codebase clean, reliable and maintainable.",
    },
  ];
  return (
    <div className="fourth-component">
      <h2> Why Choose Us ? </h2>
      <section>
        {arr.map(({ title, body }, index) => (
          <article key={index}>
            <h4>{title} </h4>
            <p> {body} </p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Fourth;
