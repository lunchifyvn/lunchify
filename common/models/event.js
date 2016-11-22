module.exports = function(Event) {
  Event.validatesInclusionOf('status', {
    in: ['pending', 'accept', 'cancel', 'archive'],
    message: 'status is not allowed',
  });
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
