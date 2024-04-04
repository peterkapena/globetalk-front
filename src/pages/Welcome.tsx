import { useTranslation } from 'react-i18next';

function Welcome() {
  const { t } = useTranslation();
  return (
    <div>
      {t("welcome.welcome")}
    </div>
  );
}

export default Welcome;
