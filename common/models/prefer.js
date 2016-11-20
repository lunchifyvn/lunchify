module.exports = function(Prefer) {
  Prefer.observe('before save', function(ctx, next) {
    var type = ctx.instance.type;
    var ref = ctx.instance.ref;

    if (type !== 'topic' && type !== 'field') {
      console.log(`the type ${type} is not topic or field, ignore`);
      var error = new Error('topic should be either topic and field');
      error.status = 422;
      return next(error);
    }

    if (!ref) {
      console.log('should have ref id, ignore');
      var err = new Error('should have ref id');
      err.status = 422;
      return next(err);
    }

    var preferModel = Prefer.app.models[type];
    preferModel.findById(ref, (error, instance) => {
      if (error) {
        console.log(error);
        return next(error);
      }

      if (!instance) {
        console.log(`the ${type} with id ${ref} not existing, ignore`);
        var err = new Error(`the ${type} with id ${ref} not existing, ignore`);
        err.status = 422;
        return next(err);
      }

      next();
    });
  });
};
