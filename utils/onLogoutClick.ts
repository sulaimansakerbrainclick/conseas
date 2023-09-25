import authService from "../services/authService";

const onLogoutClick = (e: any, router: any) => {
  e.preventDefault();

  authService.logout().then(() => {
    router.push("/");
  });
};

export default onLogoutClick;
