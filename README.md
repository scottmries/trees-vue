# trees

Generates a landscape.

> Nuxt.js project

## To do

- Create a 'water surface' on `setup()`: a (width by height/2) array with x/y displacement values for every pixel of the generated landscape, per frame. On `draw()`, update the displacement according to an appropriate algorithm, apply the displacements to the generated pixels, and output them flipped over the horizon line.

- Create a `depth` variable that determines how much pixels are affected by their vertical placement in the plane and the given water surface displacement values.

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
