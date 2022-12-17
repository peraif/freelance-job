import { React } from 'react';
import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';
import imageNotFound from '../../../assets/404-page.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <Image alt="Страница не найдена" className="img-fluid h-25" src={imageNotFound} />
      <h1 className="h4 text-muted">{t('notFound.message')}</h1>
      <p className="text-muted">
        {t('notFound.youCan')}
        <a href="/frontend/src/routes">{t('notFound.mainPage')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
