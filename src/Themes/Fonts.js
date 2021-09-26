const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic'
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 16,
  medium: 14,
  small: 12,
  tiny: 8.5
};

const style = {
  h1: {
    fontFamily: type.bold,
    fontSize: size.h1
  },
  h2: {
    fontFamily: type.bold,
    fontSize: size.h2,
    fonntWeight: 'bold',
  },
  h3: {
    fontFamily: type.base,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.base,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  medium: {
    fontFamily: type.bold,
    fontSize: size.regular
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small
  },
  tiny: {
    fontFamily: type.base,
    fontSize: size.tiny
  },
  description:{
    fontFamily: type.base,
    fontSize: size.input,
    height: 24
  }
};

export default {
  type,
  size,
  style
};
