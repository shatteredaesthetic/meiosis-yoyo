import test from "ava";
import yo from 'yo-yo';
import { renderer } from "../src/meiosis-yoyo";
import { createComponent, run } from "meiosis";

const id = "test";

test.beforeEach(function() {
  if (!document.getElementById(id)) {
    document.write(`<div id="${id}"></div>`);
  }
});

test("implements a render function for yo-yo", t => {
  const html = renderer.yo;
  const render = renderer().intoId(document, id);

  let propose = null;

  const INCREASE = { increment: 1 };
  const initialModel = () => ({ counter: 1, description: "test" });

  const Main = createComponent({
    initialModel,
    view: (model, propose_) => {
      propose = propose_;
      return html`<span>${model.description} ${model.counter}</span>`;
    },
    receive: (model, proposal) => {
      if (proposal.increment) {
        model.counter = model.counter + proposal.increment;
        return model;
      }
      return model;
    }
  });

  run({ renderer: render, rootComponent: Main });

  let elem = document.querySelector('#test span');
  t.is(elem.innerHTML, "test 1");

  propose(INCREASE);
  t.is(elem.innerHTML, "test 2");
});
