import UnorderedListComponent from "@/utilityComponents/UnorderedListComponent";

function Second() {
  const servicesObj = {
    Design: ["corporate design", "Rebranding"],
    Development: [
      "Backend Development",
      "Frontend Development",
      "Database Design",
    ],
    Management: ["Web Applications", "Database"],
  };

  return (
    <div className="second-component">
      <h2>Our Services</h2>
      <section>
        <UnorderedListComponent arr={servicesObj.Design} title="Design" />
        <UnorderedListComponent
          arr={servicesObj.Development}
          title="Development"
        />
        <UnorderedListComponent
          arr={servicesObj.Management}
          title="Management"
        />
      </section>
    </div>
  );
}

export default Second;
