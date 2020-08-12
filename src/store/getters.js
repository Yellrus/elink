const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  wmid: state => state.profile.wmid,
  permission_routes: state => state.permission.routes,
};
export default getters;
