import { useEffect } from 'react';
import { updateSEO, SEOProps } from '../utils/seo';

export function useSEO(props: SEOProps) {
  useEffect(() => {
    updateSEO(props);
  }, [
    props.title, 
    props.description, 
    props.image, 
    props.type, 
    props.url, 
    props.canonicalUrl,
    props.article?.id
  ]);
}
