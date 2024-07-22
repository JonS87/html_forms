export class Tooltip {
  constructor() {
    this._tooltips = [];
  }

  showTooltip(message, element) {
    const tooltipElement = document.createElement("DIV");
    tooltipElement.classList.add("form-error");

    const tooltipElementChildrenTitle = document.createElement("h3");
    tooltipElementChildrenTitle.classList.add("ChildrenTitle");
    tooltipElementChildrenTitle.textContent = "Validity Error";

    const tooltipElementChildrenMessage = document.createElement("DIV");
    tooltipElementChildrenMessage.classList.add("ChildrenMessage");
    tooltipElementChildrenMessage.textContent = message;

    const tooltipElementChildrenArrow = document.createElement("DIV");
    tooltipElementChildrenArrow.classList.add("Arrow");

    tooltipElement.appendChild(tooltipElementChildrenTitle);
    tooltipElement.appendChild(tooltipElementChildrenMessage);
    tooltipElement.appendChild(tooltipElementChildrenArrow);

    const id = performance.now();

    this._tooltips.push({
      id,
      element: tooltipElement,
    });
    //console.log(`Добавили в _tooltips id ${id}`);
    //console.dir(this._tooltips);

    document.body.appendChild(tooltipElement);

    const { left, top } = element.getBoundingClientRect();
    tooltipElement.style.left =
      left + tooltipElement.offsetLeft / 2 - element.offsetLeft / 2 + "px";
    tooltipElement.style.top = top - tooltipElement.offsetHeight - 5 + "px";

    return id;
  }

  removeTooltip(id) {
    //console.log(`удалить id - ${id}`);
    const tooltip = this._tooltips.find((t) => t.id === id);
    tooltip.element.remove();

    this._tooltips = this._tooltips.filter((t) => t.id !== id);
    //console.log("_tooltips после удаления");
    //console.dir(this._tooltips);
  }
}
