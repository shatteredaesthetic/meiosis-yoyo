import yo, { update } from 'yo-yo';
import { meiosisRender } from 'meiosis-render';

const intoElement = element => {
  let root = yo`<div></div>`;
  return function(model, rootComponent) {
    root = update(root, rootComponent(model));
    element.appendChild(root);
  };
};

const renderer = () => meiosisRender(intoElement);
renderer.yo = yo;

export { renderer };
