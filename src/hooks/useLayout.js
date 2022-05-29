import { useMediaQuery } from '@material-ui/core';
import { MIN_WIDTH_MOBILE, MIN_WIDTH_TABLET } from '../constants/default';

export default function useLayout() {
  const isTablet = useMediaQuery(`@media (max-width: ${MIN_WIDTH_TABLET}px)`);
  const isMobile = useMediaQuery(`@media (max-width: ${MIN_WIDTH_MOBILE}px)`);
  return isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
}
