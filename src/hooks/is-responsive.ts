import { useEffect, useState } from 'react';

type DeviceBreakpoints = {
    isMobile: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isDesktop: boolean;
    isWide: boolean;
};

const deviceQueries = {
    isMobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1023px)',
    laptop: '(min-width: 1024px) and (max-width: 1279px)',
    desktop: '(min-width: 1280px) and (max-width: 1535px)',
    wide: '(min-width: 1536px)',
};

export function useResponsive(): DeviceBreakpoints {
    const [breakpoints, setBreakpoints] = useState<DeviceBreakpoints>({
        isMobile: false,
        isTablet: false,
        isLaptop: false,
        isDesktop: false,
        isWide: false,
    });

    useEffect(() => {
        const getMatches = (): DeviceBreakpoints => ({
            isMobile: window.matchMedia(deviceQueries.isMobile).matches,
            isTablet: window.matchMedia(deviceQueries.tablet).matches,
            isLaptop: window.matchMedia(deviceQueries.laptop).matches,
            isDesktop: window.matchMedia(deviceQueries.desktop).matches,
            isWide: window.matchMedia(deviceQueries.wide).matches,
        });

        const handleResize = () => {
            setBreakpoints(getMatches());
        };

        // Set initial values
        handleResize();

        const mqls = Object.values(deviceQueries).map((q) => window.matchMedia(q));
        mqls.forEach((mql) => mql.addEventListener('change', handleResize));

        return () => {
            mqls.forEach((mql) => mql.removeEventListener('change', handleResize));
        };
    }, []);

    return breakpoints;
}
