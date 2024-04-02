import { useAppDispatch } from "../redux/hooks";
import { signOut } from "../redux/user-slice";
import { useTranslation } from 'react-i18next';

function Welcome() {
  const { t } = useTranslation();
 
  function logout() {
    dispatch(signOut());
  }
  const dispatch = useAppDispatch();
  return (
    <div>
      {t("home.signup")}
      Welcome
      <button type="button" onClick={() => logout()}>dsssdsdsd</button>
    </div>
  );
}

export default Welcome;
