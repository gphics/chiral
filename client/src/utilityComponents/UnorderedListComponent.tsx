export default function UnorderedListComponent({
  arr,
  title,
}: {
  arr: string[];
  title: string;
}) {
  return (
    <article>
      <h4> {title} </h4>
      <ul>
        {arr.map((elem: string, index: number) => (
          <li key={index}> {elem} </li>
        ))}
      </ul>
    </article>
  );
}
