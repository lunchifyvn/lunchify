module.exports = function(Event) {
  Event.observe('before save', function(ctx, next) {
    console.log('isnewinstance', ctx.isNewInstance);
    if (ctx.isNewInstance) {
      ctx.instance.status = 'pending';
    }
    next();
  });
};
