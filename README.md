# Meiosis-YoYo

Meiosis-YoYo is a [Meiosis](http://meiosis.js.org) renderer for [yo-yo](https://github.com/maxogden/yo-yo).

You can install it with `npm`:

```
npm i --save meiosis-yoyo
```

Then use it along with Meiosis:

```javascript
import { createComponent, run } from "meiosis";
import { renderer } from "meiosis-yoyo";

const Main = createComponent({...});
run({ renderer: renderer().intoId(document, "app"), rootComponent: Main });
```

You can also download the JavaScript file from the [Meiosis builds](http://meiosis.js.org/builds) and add it to your page with a plain `<script>` tag. In that case it will be available as the `meiosisYoyo` global variable.

--

_Meiosis is developed by [shatteredaesthetic](https://github.com/shatteredaesthetic)
([@digitalsthtcs](http://twitter.com/digitalsthtcs)) and is released under the MIT license._
