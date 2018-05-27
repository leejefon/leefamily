/**
 * validateUserData hook
 *
 * @author: Jeff Lee
 * @createdAt: 2018/05/26
 */

module.exports = function () {
  return (context) => {
    const { id, email, birthday } = context.data.email;
    if (!id) delete context.data.id;
    if (!email) delete context.data.email;
    if (!birthday) delete context.data.birthday;

    // Need to do move validations... like check email exists

    return context;
  };
};
