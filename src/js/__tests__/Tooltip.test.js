import { Tooltip } from "../tooltip";

test("showTooltip должен создавать новый элемент tooltip и добавлять его в DOM", () => {
  document.body.innerHTML = `<form class="form" novalidate>
  <div class="form-control">
    <input name="login" id="login" class="input login" type="text" placeholder="login" required>
  </div>
  <div class="form-control">
    <input name="email" type="email" class="input email" placeholder="email" required>
  </div>
  <div>
    <button type="submit" class="btn">Click to toggle popover</button>
  </div>
</form>`;

  const tooltip = new Tooltip();
  const message = "Ошибка валидации";
  const element = document.querySelector(".login");

  const id = tooltip.showTooltip(message, element);

  expect(tooltip._tooltips.length).toBe(1);
  expect(tooltip._tooltips[0].id).toBe(id);
  expect(tooltip._tooltips[0].element).toBeInstanceOf(HTMLDivElement);
  expect(document.body.children.length).toBe(1);
  expect(document.body.firstChild).toEqual(tooltip._tooltips[0].element);
});

test("removeTooltip должен удалять существующий tooltip из DOM и из массива _tooltips", () => {
  document.body.innerHTML = `<form class="form" novalidate>
  <div class="form-control">
    <input name="login" id="login" class="input login" type="text" placeholder="login" required>
  </div>
  <div class="form-control">
    <input name="email" type="email" class="input email" placeholder="email" required>
  </div>
  <div>
    <button type="submit" class="btn">Click to toggle popover</button>
  </div>
</form>`;

  const tooltip = new Tooltip();
  const message = "Ошибка валидации";
  const element = document.createElement("div");

  const id = tooltip.showTooltip(message, element);
  expect(tooltip._tooltips.length).toBe(1);

  tooltip.removeTooltip(id);
  expect(tooltip._tooltips.length).toBe(0);
  expect(document.body.children.length).toBe(0);
});
