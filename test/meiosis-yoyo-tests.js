import test from 'ava';
import yo from 'yo-yo';
import { renderer } from '../src/meiosis-yoyo';
import { createComponent, run } from 'meiosis';

const id = 'test';

test.beforeEach(function() {
  if (!document.getElementById(id)) {
    document.write(`<div id="${id}"></div>`);
  }
});

test.afterEach(function() {
  document.querySelector(`#${id}`).innerHTML = '';
});

test('implements a render function for yo-yo', t => {
  const html = renderer.yo;
  const render = renderer().intoId(document, id);

  let propose = null;

  const INCREASE = { increment: 1 };
  const initialModel = () => ({ counter: 1, description: 'test' });

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
  t.is(elem.innerHTML, 'test 1');

  propose(INCREASE);
  t.is(elem.innerHTML, 'test 2');
});

test('further tests the rendering function', t => {
  const html = renderer.yo;
  const render = renderer().intoId(document, id);

  let propose = null;

  const EXCLAIM = { increase: 1 };
  const initialModel = () => ({ count: 0, description: 'passed' });

  const Main = createComponent({
    initialModel,
    view: (model, propose_) => {
      propose = propose_;
      return html`<span id="test-id">${model.description}${'!'.repeat(model.count)}</span>`;
    },
    receive: (model, proposal) => {
      if (proposal.increase) {
        model.count = model.count + proposal.increase;
        return model;
      }
      return model;
    }
  });

  run({ renderer: render, rootComponent: Main });

  let elem = document.querySelector('#test span');
  t.is(elem.innerHTML, 'passed');

  propose(EXCLAIM);
  propose(EXCLAIM);
  propose(EXCLAIM);
  t.is(elem.innerHTML, 'passed!!!');
  t.is(elem.id, 'test-id');
});
