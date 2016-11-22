module.exports = function(Event) {
  Event.observe('before save', function(ctx, next) {
    if (ctx.isNewInstance) {
      ctx.instance.status = 'pending';
    }
    next();
  });

  Event.observe('access', function(ctx, next) {
    next();
  });
};
