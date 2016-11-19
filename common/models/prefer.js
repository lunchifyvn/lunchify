module.exports = function(Prefer) {
  Prefer.observe('before save', function(ctx, next) {
    console.log('before save');
    console.log(ctx.instance);
    // if (!ctx.instance && !ctx.instance.type && !ctx.instace.)
    next();
  });
};
