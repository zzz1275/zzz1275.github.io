Object.prototype.als = function(block) {
  if (typeof block !== 'function') {
    throw new Error('The argument to let must be a function.');
  }
  return block(this);
};

Object.prototype.also = function(block) {
  if (typeof block !== 'function') {
    throw new Error('The argument to also must be a function.');
  }
  block(this);
  return this;
};

Object.prototype.pnt = function(block){
    console.log(this)
}