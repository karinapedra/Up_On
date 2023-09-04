export default () => {
  const container = document.createElement("div");
  container.classList.add("formContent");

  const template = `
    <h2 class="formTitle">TIMELINE</h2>
    `;

  container.innerHTML = template;
  return container;
};
