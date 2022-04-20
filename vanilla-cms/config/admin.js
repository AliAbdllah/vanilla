module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '8e7f2bbef5737997e30f1c3598160247'),
  },
});
