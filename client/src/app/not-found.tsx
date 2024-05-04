import LinkComponent from "@/utilityComponents/LinkComponent";

function NotFound() {
  return (
    <main className="not-found-page">
      <h2>Page Not Found</h2>
      <LinkComponent url="/" title="Go Back" />
    </main>
  );
}

export default NotFound;
